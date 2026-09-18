import {
  ArrowLeft,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router";

import toast from "react-hot-toast";

import TaskForm from "../../pages/tasks/TaskForm";
import LoadingSpinner from "../../components/LoadingSpinner";

import {
  taskService,
} from "../../services/taskService";

import type {
  TaskFormData,
} from "../../types/taskTypes";

const EditTask = () => {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [
    initialValues,
    setInitialValues,
  ] =
    useState<TaskFormData | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  useEffect(() => {
    const loadTask =
      async () => {
        if (!id) {
          return;
        }

        try {
          const task =
            await taskService.getById(
              id
            );

          if (!task) {
            toast.error(
              "Task not found"
            );

            navigate(
              "/tasks"
            );

            return;
          }

          setInitialValues({
            title:
              task.title,

            description:
              task.description,

            type:
              task.type,

            status:
              task.status,

            priority:
              task.priority,

            dueDate:
              task.dueDate,

            dueTime:
              task.dueTime,

            assignedUserId:
              task.assignedUserId,

            leadId:
              task.leadId ??
              "",

            contactId:
              task.contactId ??
              "",
          });
        } catch {
          toast.error(
            "Failed to load task"
          );
        } finally {
          setLoading(false);
        }
      };

    loadTask();
  }, [id, navigate]);

  const handleSubmit =
    async (
      data: TaskFormData
    ) => {
      if (!id) {
        return;
      }

      try {
        setSaving(true);

        await taskService.update(
          id,
          data
        );

        toast.success(
          "Task updated successfully"
        );

        navigate(
          `/tasks/${id}`
        );
      } catch {
        toast.error(
          "Failed to update task"
        );
      } finally {
        setSaving(false);
      }
    };

  if (
    loading ||
    !initialValues
  ) {
    return (
      <LoadingSpinner text="Loading task..." />
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <button
        type="button"
        onClick={() =>
          navigate(
            `/tasks/${id}`
          )
        }
        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600"
      >
        <ArrowLeft
          size={17}
        />

        Back to Task
      </button>

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Edit Task
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Update task details,
          schedule, priority and
          assignment.
        </p>
      </div>

      <TaskForm
        initialValues={
          initialValues
        }
        loading={saving}
        submitLabel="Update Task"
        onSubmit={
          handleSubmit
        }
        onCancel={() =>
          navigate(
            `/tasks/${id}`
          )
        }
      />
    </div>
  );
};

export default EditTask;