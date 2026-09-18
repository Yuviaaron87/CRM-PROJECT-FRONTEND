import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Link2,
  Pencil,
  Trash2,
  UserRound,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router";

import toast from "react-hot-toast";

import Button from "../../components/Button";
import ConfirmDialog from "../../components/ConformDialog";
import LoadingSpinner from "../../components/LoadingSpinner";

import {
  users,
} from "../../data/users";

import {
  contactService,
} from "../../services/contactService";

import {
  leadService,
} from "../../services/leadService";

import {
  taskService,
} from "../../services/taskService";

import type {
  Contact,
} from "../../types/contactTypes";

import type {
  Lead,
} from "../../types/leadTypes";

import type {
  Task,
} from "../../types/taskTypes";

const TaskDetails = () => {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [
    task,
    setTask,
  ] =
    useState<Task | null>(
      null
    );

  const [
    relatedLead,
    setRelatedLead,
  ] =
    useState<Lead | null>(
      null
    );

  const [
    relatedContact,
    setRelatedContact,
  ] =
    useState<Contact | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    deleteOpen,
    setDeleteOpen,
  ] = useState(false);

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  const [
    completing,
    setCompleting,
  ] = useState(false);

  useEffect(() => {
    const loadTask =
      async () => {
        if (!id) {
          return;
        }

        try {
          const data =
            await taskService.getById(
              id
            );

          if (!data) {
            toast.error(
              "Task not found"
            );

            navigate(
              "/tasks"
            );

            return;
          }

          setTask(data);

          if (data.leadId) {
            const lead =
              await leadService.getById(
                data.leadId
              );

            setRelatedLead(
              lead ?? null
            );
          }

          if (
            data.contactId
          ) {
            const contact =
              await contactService.getById(
                data.contactId
              );

            setRelatedContact(
              contact ?? null
            );
          }
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

  const handleComplete =
    async () => {
      if (!task) {
        return;
      }

      try {
        setCompleting(true);

        const updated =
          await taskService.updateStatus(
            task.id,
            "completed"
          );

        setTask(updated);

        toast.success(
          "Task completed successfully"
        );
      } catch {
        toast.error(
          "Failed to update task"
        );
      } finally {
        setCompleting(false);
      }
    };

  const handleDelete =
    async () => {
      if (!task) {
        return;
      }

      try {
        setDeleting(true);

        await taskService.delete(
          task.id
        );

        toast.success(
          "Task deleted successfully"
        );

        navigate("/tasks");
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
      <LoadingSpinner text="Loading task..." />
    );
  }

  if (!task) {
    return null;
  }

  const assignedUser =
    users.find(
      (user) =>
        user.id ===
        task.assignedUserId
    );

  return (
    <div className="space-y-6">
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

      {/* Header */}

      <div className="flex flex-col justify-between gap-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium capitalize text-blue-600">
              {task.type}
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-600">
              {task.status.replace(
                "-",
                " "
              )}
            </span>

            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium capitalize text-amber-600">
              {task.priority} Priority
            </span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            {task.title}
          </h1>
        </div>

        <div className="flex flex-wrap gap-3">
          {task.status !==
            "completed" && (
            <Button
              loading={
                completing
              }
              onClick={
                handleComplete
              }
            >
              <CheckCircle2
                size={16}
              />

              Complete
            </Button>
          )}

          <Button
            variant="secondary"
            onClick={() =>
              navigate(
                `/tasks/${task.id}/edit`
              )
            }
          >
            <Pencil
              size={16}
            />

            Edit
          </Button>

          <Button
            variant="danger"
            onClick={() =>
              setDeleteOpen(
                true
              )
            }
          >
            <Trash2
              size={16}
            />

            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <h2 className="font-semibold text-slate-900">
                Task Information
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 p-5 md:grid-cols-2">
              <Info
                icon={
                  CalendarDays
                }
                label="Due Date"
                value={
                  task.dueDate
                }
              />

              <Info
                icon={Clock3}
                label="Due Time"
                value={
                  task.dueTime ||
                  "No time"
                }
              />

              <Info
                icon={
                  UserRound
                }
                label="Assigned User"
                value={
                  assignedUser?.name ??
                  "Unassigned"
                }
              />

              <Info
                icon={
                  CheckCircle2
                }
                label="Status"
                value={task.status.replace(
                  "-",
                  " "
                )}
              />
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-slate-900">
              Description
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              {task.description ||
                "No description added."}
            </p>
          </div>
        </div>

        {/* Relationships */}

        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <h2 className="font-semibold text-slate-900">
                Related Lead
              </h2>
            </div>

            <div className="p-5">
              {relatedLead ? (
                <Link
                  to={`/leads/${relatedLead.id}`}
                  className="block rounded-lg border border-slate-200 p-4 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <div className="flex gap-3">
                    <Link2
                      size={18}
                      className="text-blue-600"
                    />

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {
                          relatedLead.name
                        }
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {
                          relatedLead.company
                        }
                      </p>

                      <p className="mt-2 text-xs font-medium text-blue-600">
                        View Lead →
                      </p>
                    </div>
                  </div>
                </Link>
              ) : (
                <p className="text-sm text-slate-500">
                  No related lead.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <h2 className="font-semibold text-slate-900">
                Related Contact
              </h2>
            </div>

            <div className="p-5">
              {relatedContact ? (
                <Link
                  to={`/contacts/${relatedContact.id}`}
                  className="block rounded-lg border border-slate-200 p-4 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <p className="text-sm font-semibold text-slate-800">
                    {
                      relatedContact.firstName
                    }{" "}
                    {
                      relatedContact.lastName
                    }
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {
                      relatedContact.company
                    }
                  </p>

                  <p className="mt-2 text-xs font-medium text-blue-600">
                    View Contact →
                  </p>
                </Link>
              ) : (
                <p className="text-sm text-slate-500">
                  No related
                  contact.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={deleteOpen}
        title="Delete Task?"
        description={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        loading={deleting}
        onCancel={() =>
          setDeleteOpen(false)
        }
        onConfirm={
          handleDelete
        }
      />
    </div>
  );
};

interface InfoProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

const Info = ({
  icon: Icon,
  label,
  value,
}: InfoProps) => (
  <div className="flex gap-3">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
      <Icon size={17} />
    </div>

    <div>
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium capitalize text-slate-700">
        {value}
      </p>
    </div>
  </div>
);

export default TaskDetails;