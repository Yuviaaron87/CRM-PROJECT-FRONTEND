import {
  CalendarCheck2,
  CheckCircle2,
  CircleAlert,
  Clock3,
  ListTodo,
  Plus,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router";

import toast from "react-hot-toast";

import TaskFilters from "../../pages/tasks/TaskFilters";
import TaskTable from "../../pages/tasks/TaskTable";

import ConfirmDialog from "../../components/ConformDialog";
import EmptyState from "../../components/EmptyState";
import LoadingSpinner from "../../components/LoadingSpinner";
import Pagination from "../../components/Pagination";

import {
  users,
} from "../../data/users";

import {
  taskService,
} from "../../services/taskService";

import type {
  Task,
  TaskPriority,
  TaskStatus,
  TaskType,
} from "../../types/taskTypes";

type ViewType =
  | "all"
  | "upcoming"
  | "completed"
  | "overdue";

const ITEMS_PER_PAGE = 5;

const Tasks = () => {
  const navigate =
    useNavigate();

  const [
    tasks,
    setTasks,
  ] = useState<Task[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    activeView,
    setActiveView,
  ] =
    useState<ViewType>("all");

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    status,
    setStatus,
  ] =
    useState<
      TaskStatus | ""
    >("");

  const [
    priority,
    setPriority,
  ] =
    useState<
      TaskPriority | ""
    >("");

  const [
    type,
    setType,
  ] =
    useState<
      TaskType | ""
    >("");

  const [
    assignedUser,
    setAssignedUser,
  ] = useState("");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const [
    selectedTask,
    setSelectedTask,
  ] =
    useState<Task | null>(
      null
    );

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  useEffect(() => {
    const loadTasks =
      async () => {
        try {
          setLoading(true);

          const data =
            await taskService.getAll();

          setTasks(data);
        } catch {
          toast.error(
            "Failed to load tasks"
          );
        } finally {
          setLoading(false);
        }
      };

    loadTasks();
  }, []);

  const today =
    new Date();

  today.setHours(
    0,
    0,
    0,
    0
  );

  const isOverdue = (
    task: Task
  ) => {
    if (
      task.status ===
      "completed"
    ) {
      return false;
    }

    const due =
      new Date(
        `${task.dueDate}T${
          task.dueTime ||
          "23:59"
        }`
      );

    return (
      due.getTime() <
      new Date().getTime()
    );
  };

  const isUpcoming = (
    task: Task
  ) => {
    if (
      task.status ===
      "completed"
    ) {
      return false;
    }

    const due =
      new Date(
        `${task.dueDate}T${
          task.dueTime ||
          "23:59"
        }`
      );

    return (
      due.getTime() >=
      new Date().getTime()
    );
  };

  const completedCount =
    tasks.filter(
      (task) =>
        task.status ===
        "completed"
    ).length;

  const upcomingCount =
    tasks.filter(
      isUpcoming
    ).length;

  const overdueCount =
    tasks.filter(
      isOverdue
    ).length;

  const pendingCount =
    tasks.filter(
      (task) =>
        task.status ===
          "pending" ||
        task.status ===
          "in-progress"
    ).length;

  const filteredTasks =
    useMemo(() => {
      let result = [
        ...tasks,
      ];

      if (
        activeView ===
        "upcoming"
      ) {
        result =
          result.filter(
            isUpcoming
          );
      }

      if (
        activeView ===
        "completed"
      ) {
        result =
          result.filter(
            (task) =>
              task.status ===
              "completed"
          );
      }

      if (
        activeView ===
        "overdue"
      ) {
        result =
          result.filter(
            isOverdue
          );
      }

      const query =
        search
          .trim()
          .toLowerCase();

      if (query) {
        result =
          result.filter(
            (task) =>
              task.title
                .toLowerCase()
                .includes(
                  query
                ) ||
              task.description
                .toLowerCase()
                .includes(
                  query
                )
          );
      }

      if (status) {
        result =
          result.filter(
            (task) =>
              task.status ===
              status
          );
      }

      if (priority) {
        result =
          result.filter(
            (task) =>
              task.priority ===
              priority
          );
      }

      if (type) {
        result =
          result.filter(
            (task) =>
              task.type ===
              type
          );
      }

      if (assignedUser) {
        result =
          result.filter(
            (task) =>
              task.assignedUserId ===
              assignedUser
          );
      }

      result.sort(
        (a, b) => {
          const dateA =
            new Date(
              `${a.dueDate}T${
                a.dueTime ||
                "23:59"
              }`
            ).getTime();

          const dateB =
            new Date(
              `${b.dueDate}T${
                b.dueTime ||
                "23:59"
              }`
            ).getTime();

          return (
            dateA -
            dateB
          );
        }
      );

      return result;
    }, [
      tasks,
      activeView,
      search,
      status,
      priority,
      type,
      assignedUser,
    ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    activeView,
    search,
    status,
    priority,
    type,
    assignedUser,
  ]);

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredTasks.length /
          ITEMS_PER_PAGE
      )
    );

  const paginatedTasks =
    filteredTasks.slice(
      (currentPage - 1) *
        ITEMS_PER_PAGE,

      currentPage *
        ITEMS_PER_PAGE
    );

  const handleComplete =
    async (task: Task) => {
      try {
        const updated =
          await taskService.updateStatus(
            task.id,
            "completed"
          );

        setTasks(
          (previous) =>
            previous.map(
              (item) =>
                item.id ===
                task.id
                  ? updated
                  : item
            )
        );

        toast.success(
          "Task completed successfully"
        );
      } catch {
        toast.error(
          "Failed to update task"
        );
      }
    };

  const handleDelete =
    async () => {
      if (!selectedTask) {
        return;
      }

      try {
        setDeleting(true);

        await taskService.delete(
          selectedTask.id
        );

        setTasks(
          (previous) =>
            previous.filter(
              (task) =>
                task.id !==
                selectedTask.id
            )
        );

        setSelectedTask(
          null
        );

        toast.success(
          "Task deleted successfully"
        );
      } catch {
        toast.error(
          "Failed to delete task"
        );
      } finally {
        setDeleting(false);
      }
    };

  if (loading) {
    return (
      <LoadingSpinner text="Loading tasks..." />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Tasks & Follow-ups
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage activities,
            follow-ups and customer
            interactions.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate(
              "/tasks/add"
            )
          }
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={17} />

          Add Task
        </button>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Open Tasks"
          value={pendingCount}
          icon={
            <ListTodo
              size={19}
            />
          }
        />

        <StatCard
          label="Upcoming"
          value={upcomingCount}
          icon={
            <Clock3
              size={19}
            />
          }
        />

        <StatCard
          label="Completed"
          value={completedCount}
          icon={
            <CheckCircle2
              size={19}
            />
          }
        />

        <StatCard
          label="Overdue"
          value={overdueCount}
          icon={
            <CircleAlert
              size={19}
            />
          }
        />
      </div>

      {/* Views */}

      <div className="flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
        <ViewButton
          active={
            activeView ===
            "all"
          }
          label="All Tasks"
          icon={
            <ListTodo
              size={15}
            />
          }
          onClick={() =>
            setActiveView(
              "all"
            )
          }
        />

        <ViewButton
          active={
            activeView ===
            "upcoming"
          }
          label="Upcoming"
          icon={
            <CalendarCheck2
              size={15}
            />
          }
          onClick={() =>
            setActiveView(
              "upcoming"
            )
          }
        />

        <ViewButton
          active={
            activeView ===
            "completed"
          }
          label="Completed"
          icon={
            <CheckCircle2
              size={15}
            />
          }
          onClick={() =>
            setActiveView(
              "completed"
            )
          }
        />

        <ViewButton
          active={
            activeView ===
            "overdue"
          }
          label="Overdue"
          icon={
            <CircleAlert
              size={15}
            />
          }
          onClick={() =>
            setActiveView(
              "overdue"
            )
          }
        />
      </div>

      <TaskFilters
        search={search}
        status={status}
        priority={priority}
        type={type}
        assignedUser={
          assignedUser
        }
        users={users}
        onSearchChange={
          setSearch
        }
        onStatusChange={
          setStatus
        }
        onPriorityChange={
          setPriority
        }
        onTypeChange={
          setType
        }
        onUserChange={
          setAssignedUser
        }
        onReset={() => {
          setSearch("");
          setStatus("");
          setPriority("");
          setType("");
          setAssignedUser("");
        }}
      />

      {paginatedTasks.length >
      0 ? (
        <>
          <TaskTable
            tasks={
              paginatedTasks
            }
            users={users}
            onDelete={
              setSelectedTask
            }
            onComplete={
              handleComplete
            }
          />

          <Pagination
            currentPage={
              currentPage
            }
            totalPages={
              totalPages
            }
            onPageChange={
              setCurrentPage
            }
          />
        </>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white">
          <EmptyState
            title="No tasks found"
            description="There are no tasks matching your current view and filters."
          />
        </div>
      )}

      <ConfirmDialog
        open={Boolean(
          selectedTask
        )}
        title="Delete Task?"
        description={`Are you sure you want to delete "${
          selectedTask?.title ??
          ""
        }"? This action cannot be undone.`}
        loading={deleting}
        onCancel={() =>
          setSelectedTask(
            null
          )
        }
        onConfirm={
          handleDelete
        }
      />
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}

const StatCard = ({
  label,
  value,
  icon,
}: StatCardProps) => (
  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-medium text-slate-500">
          {label}
        </p>

        <p className="mt-2 text-xl font-bold text-slate-900">
          {value}
        </p>
      </div>

      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        {icon}
      </div>
    </div>
  </div>
);

interface ViewButtonProps {
  active: boolean;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const ViewButton = ({
  active,
  label,
  icon,
  onClick,
}: ViewButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
      active
        ? "bg-blue-600 text-white"
        : "text-slate-500 hover:bg-slate-100"
    }`}
  >
    {icon}

    {label}
  </button>
);

export default Tasks;