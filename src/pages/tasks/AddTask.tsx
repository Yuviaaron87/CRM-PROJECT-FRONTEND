import {
  ArrowLeft,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router";

import toast from "react-hot-toast";

import TaskForm from "../../pages/tasks/TaskForm";

import {
  taskService,
} from "../../services/taskService";

import type {
  TaskFormData,
} from "../../types/taskTypes";

const AddTask = () => {
  const navigate =
    useNavigate();

  const [
    searchParams,
  ] = useSearchParams();

  const [
    loading,
    setLoading,
  ] = useState(false);

  const initialValues:
    TaskFormData = {
    title: "",

    description: "",

    type: "follow-up",

    status: "pending",

    priority: "medium",

    dueDate: "",

    dueTime: "",

    assignedUserId: "",

    leadId:
      searchParams.get(
        "leadId"
      ) ?? "",

    contactId:
      searchParams.get(
        "contactId"
      ) ?? "",
  };

  const handleSubmit =
    async (
      data: TaskFormData
    ) => {
      try {
        setLoading(true);

        const task =
          await taskService.create(
            data
          );

        toast.success(
          "Task created successfully"
        );

        navigate(
          `/tasks/${task.id}`
        );
      } catch {
        toast.error(
          "Failed to create task"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <button
        type="button"
        onClick={() =>
          navigate("/tasks")
        }
        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600"
      >
        <ArrowLeft
          size={17}
        />

        Back to Tasks
      </button>

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Add Task
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Create a task,
          follow-up, call, email
          or meeting.
        </p>
      </div>

      <TaskForm
        initialValues={
          initialValues
        }
        loading={loading}
        submitLabel="Create Task"
        onSubmit={
          handleSubmit
        }
        onCancel={() =>
          navigate("/tasks")
        }
      />
    </div>
  );
};

export default AddTask;