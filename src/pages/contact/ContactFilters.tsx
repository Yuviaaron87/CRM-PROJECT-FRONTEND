import {
  RotateCcw,
} from "lucide-react";

import SearchInput from "../../components/SearchInput";

interface ContactFiltersProps {
  search: string;
  company: string;
  relation: string;
  sort: string;

  companies: string[];

  onSearchChange: (
    value: string
  ) => void;

  onCompanyChange: (
    value: string
  ) => void;

  onRelationChange: (
    value: string
  ) => void;

  onSortChange: (
    value: string
  ) => void;

  onReset: () => void;
}

const ContactFilters = ({
  search,
  company,
  relation,
  sort,
  companies,
  onSearchChange,
  onCompanyChange,
  onRelationChange,
  onSortChange,
  onReset,
}: ContactFiltersProps) => {
  const selectStyle =
    "rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 xl:flex-row">
        <div className="flex-1">
          <SearchInput
            value={search}
            onChange={
              onSearchChange
            }
            placeholder="Search contact, company, email..."
          />
        </div>

        <select
          value={company}
          onChange={(event) =>
            onCompanyChange(
              event.target.value
            )
          }
          className={selectStyle}
        >
          <option value="">
            All Companies
          </option>

          {companies.map(
            (item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            )
          )}
        </select>

        <select
          value={relation}
          onChange={(event) =>
            onRelationChange(
              event.target.value
            )
          }
          className={selectStyle}
        >
          <option value="">
            All Contacts
          </option>

          <option value="linked">
            Linked to Lead
          </option>

          <option value="unlinked">
            No Lead
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
          <RotateCcw
            size={16}
          />

          Reset
        </button>
      </div>
    </div>
  );
};

export default ContactFilters;