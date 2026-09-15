import {
  ArrowLeft,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router";

import toast from "react-hot-toast";

import LeadForm from "../../pages/leads/LeadForm";

import { ROUTES } from "../../constants/route";

import { leadService } from "../../services/leadService";

import type {
  LeadFormData,
} from "../../types/leadTypes";

const AddLead = () => {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    data: LeadFormData
  ) => {
    try {
      setLoading(true);

      const lead =
        await leadService.create(
          data
        );

      toast.success(
        "Lead created successfully"
      );

      navigate(
        `/leads/${lead.id}`
      );
    } catch {
      toast.error(
        "Failed to create lead"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <button
          type="button"
          onClick={() =>
            navigate(ROUTES.LEADS)
          }
          className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
        >
          <ArrowLeft size={17} />

          Back to Leads
        </button>

        <h1 className="text-2xl font-bold text-slate-900">
          Add Lead
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Create a new sales lead
          and assign it to your
          team.
        </p>
      </div>

      <LeadForm
        loading={loading}
        submitLabel="Create Lead"
        onSubmit={handleSubmit}
        onCancel={() =>
          navigate(ROUTES.LEADS)
        }
      />
    </div>
  );
};

export default AddLead;