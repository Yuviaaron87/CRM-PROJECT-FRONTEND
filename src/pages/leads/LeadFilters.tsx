import {
  RotateCcw,
} from "lucide-react";

import SearchInput from "../../components/SearchInput";

interface LeadFiltersProps {
  search: string;
  status: string;
  priority: string;
  sort: string;

  onSearchChange: (
    value: string
  ) => void;

  onStatusChange: (
    value: string
  ) => void;

  onPriorityChange: (
    value: string
  ) => void;

  onSortChange: (
    value: string
  ) => void;

  onReset: () => void;
}

const LeadFilters = ({
  search,
  status,
  priority,
  sort,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onSortChange,
  onReset,
}: LeadFiltersProps) => {
  const selectStyle =
    "rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 xl:flex-row">
        <div className="flex-1">
          <SearchInput
            value={search}
            onChange={onSearchChange}
            placeholder="Search name, company, email..."
          />
        </div>

        <select
          value={status}
          onChange={(event) =>
            onStatusChange(
              event.target.value
            )
          }
          className={selectStyle}
        >
          <option value="">
            All Status
          </option>

          <option value="new">
            New
          </option>

          <option value="contacted">
            Contacted
          </option>

          <option value="qualified">
            Qualified
          </option>

          <option value="proposal">
            Proposal
          </option>

          <option value="negotiation">
            Negotiation
          </option>

          <option value="won">
            Won
          </option>

          <option value="lost">
            Lost
          </option>
        </select>

        <select
          value={priority}
          onChange={(event) =>
            onPriorityChange(
              event.target.value
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
          value={sort}
          onChange={(event) =>
            onSortChange(
              event.target.value
            )
          }
          className={selectStyle}
        >
          <option value="newest">
            Newest
          </option>

          <option value="oldest">
            Oldest
          </option>

          <option value="name-asc">
            Name A-Z
          </option>

          <option value="name-desc">
            Name Z-A
          </option>
        </select>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50"
        >
          <RotateCcw size={16} />

          Reset
        </button>
      </div>
    </div>
  );
};

export default LeadFilters;