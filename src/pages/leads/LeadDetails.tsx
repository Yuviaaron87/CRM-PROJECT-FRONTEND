import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  Calendar,
  Globe,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Trash2,
  UserRound,
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

import Button from "../../components/Button";
import ConfirmDialog from "../../components/ConformDialog";
import LoadingSpinner from "../../components/LoadingSpinner";
import PriorityBadge from "../../components/PriorityBadge";
import StatusBadge from "../../components/StatusBadge";

import { ROUTES } from "../../constants/route";

import { leadService } from "../../services/leadService";

import type {
  Lead,
} from "../../types/leadTypes";

import {
  formatDate,
} from "../../utils/formatDate";

const LeadDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [lead, setLead] =
    useState<Lead | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [
    deleteOpen,
    setDeleteOpen,
  ] = useState(false);

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  useEffect(() => {
    const loadLead = async () => {
      if (!id) {
        return;
      }

      try {
        const data =
          await leadService.getById(
            id
          );

        if (!data) {
          toast.error(
            "Lead not found"
          );

          navigate(
            ROUTES.LEADS
          );

          return;
        }

        setLead(data);
      } catch {
        toast.error(
          "Failed to load lead"
        );
      } finally {
        setLoading(false);
      }
    };

    loadLead();
  }, [id, navigate]);

  const handleDelete =
    async () => {
      if (!lead) {
        return;
      }

      try {
        setDeleting(true);

        await leadService.delete(
          lead.id
        );

        toast.success(
          "Lead deleted successfully"
        );

        navigate(
          ROUTES.LEADS
        );
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
      <LoadingSpinner text="Loading lead..." />
    );
  }

  if (!lead) {
    return null;
  }

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() =>
          navigate(ROUTES.LEADS)
        }
        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600"
      >
        <ArrowLeft size={17} />

        Back to Leads
      </button>

      {/* Lead Header */}

      <div className="flex flex-col justify-between gap-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-xl font-bold text-blue-700">
            {lead.name
              .charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">
                {lead.name}
              </h1>

              <StatusBadge
                status={lead.status}
              />

              <PriorityBadge
                priority={
                  lead.priority
                }
              />
            </div>

            <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
              <Building2 size={15} />

              {lead.company}

              {lead.jobTitle &&
                ` • ${lead.jobTitle}`}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() =>
              navigate(
                `/leads/${lead.id}/edit`
              )
            }
          >
            <Pencil size={16} />

            Edit
          </Button>

          <Button
            variant="danger"
            onClick={() =>
              setDeleteOpen(true)
            }
          >
            <Trash2 size={16} />

            Delete
          </Button>
        </div>
      </div>

      {/* Details */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <h2 className="font-semibold text-slate-900">
                Contact Information
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 p-5 md:grid-cols-2">
              <Info
                icon={Mail}
                label="Email"
                value={lead.email}
              />

              <Info
                icon={Phone}
                label="Phone"
                value={lead.phone}
              />

              <Info
                icon={BriefcaseBusiness}
                label="Job Title"
                value={
                  lead.jobTitle ||
                  "Not provided"
                }
              />

              <Info
                icon={Globe}
                label="Website"
                value={
                  lead.website ||
                  "Not provided"
                }
              />

              <Info
                icon={MapPin}
                label="Address"
                value={
                  lead.address ||
                  "Not provided"
                }
              />
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-slate-900">
              Description
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              {lead.description ||
                "No description has been added for this lead."}
            </p>
          </div>

          {/* Phase 6 preparation */}

          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <div className="flex gap-6">
                <button className="border-b-2 border-blue-600 pb-3 text-sm font-medium text-blue-600">
                  Overview
                </button>

                <button className="pb-3 text-sm text-slate-500">
                  Notes
                </button>

                <button className="pb-3 text-sm text-slate-500">
                  Tasks
                </button>

                <button className="pb-3 text-sm text-slate-500">
                  Deals
                </button>
              </div>
            </div>

            <div className="p-5">
              <p className="text-sm text-slate-500">
                Related notes, tasks
                and deals will be
                connected here in
                upcoming phases.
              </p>
            </div>
          </div>
        </div>

        {/* CRM Details */}

        <div className="h-fit rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <h2 className="font-semibold text-slate-900">
              CRM Details
            </h2>
          </div>

          <div className="space-y-5 p-5">
            <Info
              icon={UserRound}
              label="Assigned To"
              value={
                lead.assignedTo
              }
            />

            <Info
              icon={Building2}
              label="Lead Source"
              value={lead.source}
            />

            <Info
              icon={Calendar}
              label="Created"
              value={formatDate(
                lead.createdAt
              )}
            />
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={deleteOpen}
        title="Delete Lead?"
        description={`Are you sure you want to delete ${lead.name}?`}
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
}: InfoProps) => {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
        <Icon size={17} />
      </div>

      <div>
        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-all text-sm font-medium text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
};

export default LeadDetails;