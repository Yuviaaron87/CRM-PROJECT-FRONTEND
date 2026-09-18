import {
  CalendarDays,
  CheckCircle2,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  useNavigate,
} from "react-router";

import type {
  Task,
} from "../../types/taskTypes";

interface Props {
  tasks: Task[];

  users: {
    id: string;
    name: string;
  }[];

  onDelete: (
    task: Task
  ) => void;

  onComplete: (
    task: Task
  ) => void;
}

const TaskTable = ({
  tasks,
  users,
  onDelete,
  onComplete,
}: Props) => {
  const navigate =
    useNavigate();

  const getUserName = (
    userId: string
  ) =>
    users.find(
      (user) =>
        user.id === userId
    )?.name ?? "Unassigned";

  const priorityStyle = {
    high:
      "bg-red-50 text-red-600",

    medium:
      "bg-amber-50 text-amber-600",

    low:
      "bg-emerald-50 text-emerald-600",
  };

  const statusStyle = {
    pending:
      "bg-slate-100 text-slate-600",

    "in-progress":
      "bg-blue-50 text-blue-600",

    completed:
      "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1050px]">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Task
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Type
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Due Date
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Priority
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Status
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Assigned
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {tasks.map(
              (task) => (
                <tr
                  key={task.id}
                  className="border-t border-slate-100 transition hover:bg-slate-50"
                >
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-slate-800">
                      {task.title}
                    </p>

                    <p className="mt-1 max-w-[280px] truncate text-xs text-slate-400">
                      {task.description}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-sm capitalize text-slate-600">
                      {task.type}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <CalendarDays
                        size={15}
                      />

                      {task.dueDate}

                      {task.dueTime && (
                        <span className="text-xs text-slate-400">
                          {task.dueTime}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                        priorityStyle[
                          task.priority
                        ]
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                        statusStyle[
                          task.status
                        ]
                      }`}
                    >
                      {task.status.replace(
                        "-",
                        " "
                      )}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {getUserName(
                      task.assignedUserId
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      {task.status !==
                        "completed" && (
                        <button
                          type="button"
                          title="Mark Completed"
                          onClick={() =>
                            onComplete(
                              task
                            )
                          }
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-600"
                        >
                          <CheckCircle2
                            size={17}
                          />
                        </button>
                      )}

                      <button
                        type="button"
                        title="View Task"
                        onClick={() =>
                          navigate(
                            `/tasks/${task.id}`
                          )
                        }
                        className="rounded-lg p-2 text-slate-400 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Eye
                          size={17}
                        />
                      </button>

                      <button
                        type="button"
                        title="Edit Task"
                        onClick={() =>
                          navigate(
                            `/tasks/${task.id}/edit`
                          )
                        }
                        className="rounded-lg p-2 text-slate-400 hover:bg-amber-50 hover:text-amber-600"
                      >
                        <Pencil
                          size={17}
                        />
                      </button>

                      <button
                        type="button"
                        title="Delete Task"
                        onClick={() =>
                          onDelete(
                            task
                          )
                        }
                        className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2
                          size={17}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;