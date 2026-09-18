import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  UserRound,
} from "lucide-react";

import {
  useNavigate,
} from "react-router";

import type {
  Task,
} from "../../types/taskTypes";

interface Props {
  task: Task;
  assignedUserName: string;

  onComplete: (
    task: Task
  ) => void;
}

const TaskCard = ({
  task,
  assignedUserName,
  onComplete,
}: Props) => {
  const navigate =
    useNavigate();

  const priorityStyle = {
    high:
      "bg-red-50 text-red-600",

    medium:
      "bg-amber-50 text-amber-600",

    low:
      "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <button
          type="button"
          onClick={() =>
            navigate(
              `/tasks/${task.id}`
            )
          }
          className="text-left"
        >
          <h3 className="text-sm font-semibold text-slate-800 hover:text-blue-600">
            {task.title}
          </h3>

          <p className="mt-1 text-xs capitalize text-slate-400">
            {task.type}
          </p>
        </button>

        <span
          className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase ${
            priorityStyle[
              task.priority
            ]
          }`}
        >
          {task.priority}
        </span>
      </div>

      <p className="mt-3 line-clamp-2 text-xs leading-5 text-slate-500">
        {task.description}
      </p>

      <div className="mt-4 space-y-2 border-t border-slate-100 pt-3">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <CalendarDays
            size={14}
          />

          {task.dueDate}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Clock3 size={14} />

          {task.dueTime ||
            "No time"}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <UserRound
            size={14}
          />

          {assignedUserName}
        </div>
      </div>

      {task.status !==
        "completed" && (
        <button
          type="button"
          onClick={() =>
            onComplete(task)
          }
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 py-2 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100"
        >
          <CheckCircle2
            size={15}
          />

          Mark Completed
        </button>
      )}
    </div>
  );
};

export default TaskCard;