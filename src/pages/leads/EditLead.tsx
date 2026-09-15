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

import LeadForm from "../../pages/leads/LeadForm";
import LoadingSpinner from "../../components/LoadingSpinner";

import { ROUTES } from "../../constants/route";

import { leadService } from "../../services/leadService";

import type {
  LeadFormData,
} from "../../types/leadTypes";

const EditLead = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [
    initialValues,
    setInitialValues,
  ] =
    useState<LeadFormData | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    const loadLead = async () => {
      if (!id) {
        return;
      }

      try {
        const lead =
          await leadService.getById(
            id
          );

        if (!lead) {
          toast.error(
            "Lead not found"
          );

          navigate(
            ROUTES.LEADS
          );

          return;
        }

        setInitialValues({
          name: lead.name,
          company: lead.company,
          email: lead.email,
          phone: lead.phone,

          status: lead.status,
          priority:
            lead.priority,

          assignedTo:
            lead.assignedTo,

          source: lead.source,

          jobTitle:
            lead.jobTitle ?? "",

          website:
            lead.website ?? "",

          address:
            lead.address ?? "",

          description:
            lead.description ?? "",
        });
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

  const handleSubmit = async (
    data: LeadFormData
  ) => {
    if (!id) {
      return;
    }

    try {
      setSaving(true);

      await leadService.update(
        id,
        data
      );

      toast.success(
        "Lead updated successfully"
      );

      navigate(`/leads/${id}`);
    } catch {
      toast.error(
        "Failed to update lead"
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
      <LoadingSpinner text="Loading lead..." />
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <button
          type="button"
          onClick={() =>
            navigate(
              `/leads/${id}`
            )
          }
          className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600"
        >
          <ArrowLeft size={17} />

          Back to Lead
        </button>

        <h1 className="text-2xl font-bold text-slate-900">
          Edit Lead
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Update lead information
          and CRM details.
        </p>
      </div>

      <LeadForm
        initialValues={
          initialValues
        }
        loading={saving}
        submitLabel="Update Lead"
        onSubmit={handleSubmit}
        onCancel={() =>
          navigate(
            `/leads/${id}`
          )
        }
      />
    </div>
  );
};

export default EditLead;