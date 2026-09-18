import {
  RotateCcw,
  Search,
} from "lucide-react";

import type {
  DealPriority,
} from "../../types/dealTypes";

interface Props {
  search: string;

  priority:
    | DealPriority
    | "";

  assignedUser: string;

  users: {
    id: string;
    name: string;
  }[];

  onSearchChange: (
    value: string
  ) => void;

  onPriorityChange: (
    value:
      | DealPriority
      | ""
  ) => void;

  onUserChange: (
    value: string
  ) => void;

  onReset: () => void;
}

const PipelineFilters = ({
  search,
  priority,
  assignedUser,
  users,
  onSearchChange,
  onPriorityChange,
  onUserChange,
  onReset,
}: Props) => {
  const selectStyle =
    "rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
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
            placeholder="Search deals or companies..."
            className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <select
          value={priority}
          onChange={(event) =>
            onPriorityChange(
              event.target
                .value as
                | DealPriority
                | ""
            )
          }
          className={selectStyle}
        >
          <option value="">
            All Priorities
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

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          <RotateCcw
            size={16}
          />

          Reset
        </button>
      </div>
    </div>
  );
};

export default PipelineFilters;