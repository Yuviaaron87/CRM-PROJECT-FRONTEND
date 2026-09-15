import {
  Plus,
  Users,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link } from "react-router";

import toast from "react-hot-toast";

import LeadFilters from "./LeadFilters";
import LeadTable from "./LeadTable";

import ConfirmDialog from "../../components/ConformDialog";
import EmptyState from "../../components/EmptyState";
import LoadingSpinner from "../../components/LoadingSpinner";
import Pagination from "../../components/Pagination";

import { ROUTES } from "../../constants/route";

import { leadService } from "../../services/leadService";

import type {
  Lead,
} from "../../types/leadTypes";

const ITEMS_PER_PAGE = 5;

const Leads = () => {
  const [leads, setLeads] =
    useState<Lead[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [priority, setPriority] =
    useState("");

  const [sort, setSort] =
    useState("newest");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [
    selectedLead,
    setSelectedLead,
  ] = useState<Lead | null>(null);

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  const loadLeads = async () => {
    try {
      setLoading(true);

      const data =
        await leadService.getAll();

      setLeads(data);
    } catch {
      toast.error(
        "Failed to load leads"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const filteredLeads = useMemo(() => {
    let result = [...leads];

    const query =
      search.trim().toLowerCase();

    if (query) {
      result = result.filter(
        (lead) =>
          lead.name
            .toLowerCase()
            .includes(query) ||
          lead.company
            .toLowerCase()
            .includes(query) ||
          lead.email
            .toLowerCase()
            .includes(query)
      );
    }

    if (status) {
      result = result.filter(
        (lead) =>
          lead.status === status
      );
    }

    if (priority) {
      result = result.filter(
        (lead) =>
          lead.priority === priority
      );
    }

    switch (sort) {
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(
              a.createdAt
            ).getTime() -
            new Date(
              b.createdAt
            ).getTime()
        );
        break;

      case "name-asc":
        result.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      case "name-desc":
        result.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        break;

      default:
        result.sort(
          (a, b) =>
            new Date(
              b.createdAt
            ).getTime() -
            new Date(
              a.createdAt
            ).getTime()
        );
    }

    return result;
  }, [
    leads,
    search,
    status,
    priority,
    sort,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredLeads.length /
        ITEMS_PER_PAGE
    )
  );

  const paginatedLeads =
    filteredLeads.slice(
      (currentPage - 1) *
        ITEMS_PER_PAGE,

      currentPage *
        ITEMS_PER_PAGE
    );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    status,
    priority,
    sort,
  ]);

  const resetFilters = () => {
    setSearch("");
    setStatus("");
    setPriority("");
    setSort("newest");
    setCurrentPage(1);
  };

  const handleDelete = async () => {
    if (!selectedLead) {
      return;
    }

    try {
      setDeleting(true);

      await leadService.delete(
        selectedLead.id
      );

      setLeads((previous) =>
        previous.filter(
          (lead) =>
            lead.id !==
            selectedLead.id
        )
      );

      toast.success(
        "Lead deleted successfully"
      );

      setSelectedLead(null);
    } catch {
      toast.error(
        "Failed to delete lead"
      );
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <LoadingSpinner text="Loading leads..." />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Leads
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage, track and convert
            your sales leads.
          </p>
        </div>

        <Link
          to={ROUTES.ADD_LEAD}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={17} />

          Add Lead
        </Link>
      </div>

      {/* Summary */}

      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Users size={19} />
        </div>

        <div>
          <p className="text-xs text-slate-500">
            Total Leads
          </p>

          <p className="text-lg font-bold text-slate-900">
            {leads.length}
          </p>
        </div>
      </div>

      {/* Filters */}

      <LeadFilters
        search={search}
        status={status}
        priority={priority}
        sort={sort}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onPriorityChange={
          setPriority
        }
        onSortChange={setSort}
        onReset={resetFilters}
      />

      {/* Table */}

      {paginatedLeads.length >
      0 ? (
        <>
          <LeadTable
            leads={paginatedLeads}
            onDelete={
              setSelectedLead
            }
          />

          <Pagination
            currentPage={
              currentPage
            }
            totalPages={totalPages}
            onPageChange={
              setCurrentPage
            }
          />
        </>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white">
          <EmptyState
            title="No leads found"
            description="Try changing your search or filters, or create a new lead."
          />
        </div>
      )}

      <ConfirmDialog
        open={Boolean(selectedLead)}
        title="Delete Lead?"
        description={`Are you sure you want to delete ${
          selectedLead?.name ?? ""
        }? This action cannot be undone.`}
        loading={deleting}
        onCancel={() =>
          setSelectedLead(null)
        }
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Leads;