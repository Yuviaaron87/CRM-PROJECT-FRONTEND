import {
  RotateCcw,
  Search,
} from "lucide-react";

import type {
  TaskPriority,
  TaskStatus,
  TaskType,
} from "../../types/taskTypes";

interface Props {
  search: string;

  status:
    | TaskStatus
    | "";

  priority:
    | TaskPriority
    | "";

  type:
    | TaskType
    | "";

  assignedUser: string;

  users: {
    id: string;
    name: string;
  }[];

  onSearchChange: (
    value: string
  ) => void;

  onStatusChange: (
    value:
      | TaskStatus
      | ""
  ) => void;

  onPriorityChange: (
    value:
      | TaskPriority
      | ""
  ) => void;

  onTypeChange: (
    value:
      | TaskType
      | ""
  ) => void;

  onUserChange: (
    value: string
  ) => void;

  onReset: () => void;
}

const TaskFilters = ({
  search,
  status,
  priority,
  type,
  assignedUser,
  users,

  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onTypeChange,
  onUserChange,
  onReset,
}: Props) => {
  const selectStyle =
    "rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-6">
        <div className="relative xl:col-span-2">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(event) =>
              onSearchChange(
                event.target.value
              )
            }
            placeholder="Search tasks..."
            className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <select
          value={status}
          onChange={(event) =>
            onStatusChange(
              event.target
                .value as
                | TaskStatus
                | ""
            )
          }
          className={selectStyle}
        >
          <option value="">
            All Status
          </option>

          <option value="pending">
            Pending
          </option>

          <option value="in-progress">
            In Progress
          </option>

          <option value="completed">
            Completed
          </option>
        </select>

        <select
          value={priority}
          onChange={(event) =>
            onPriorityChange(
              event.target
                .value as
                | TaskPriority
                | ""
            )
          }
          className={selectStyle}
        >
          <option value="">
            All Priority
          </option>

          <option value="high">
            High
          </option>

          <option value="medium">
            Medium
          </option>

          <option value="low">
            Low
          </option>
        </select>

        <select
          value={type}
          onChange={(event) =>
            onTypeChange(
              event.target
                .value as
                | TaskType
                | ""
            )
          }
          className={selectStyle}
        >
          <option value="">
            All Types
          </option>

          <option value="call">
            Call
          </option>

          <option value="email">
            Email
          </option>

          <option value="meeting">
            Meeting
          </option>

          <option value="follow-up">
            Follow-up
          </option>

          <option value="other">
            Other
          </option>
        </select>

        <select
          value={assignedUser}
          onChange={(event) =>
            onUserChange(
              event.target.value
            )
          }
          className={selectStyle}
        >
          <option value="">
            All Users
          </option>

          {users.map(
            (user) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            )
          )}
        </select>
      </div>

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
        >
          <RotateCcw
            size={14}
          />

          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default TaskFilters;