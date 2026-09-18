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

import DealForm from "../../pages/pipeline/DealForm";
import LoadingSpinner from "../../components/LoadingSpinner";

import {
  dealService,
} from "../../services/dealService";

import type {
  DealFormData,
} from "../../types/dealTypes";

const EditDeal = () => {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [
    initialValues,
    setInitialValues,
  ] =
    useState<DealFormData | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  useEffect(() => {
    const loadDeal =
      async () => {
        if (!id) {
          return;
        }

        try {
          const deal =
            await dealService.getById(
              id
            );

          if (!deal) {
            toast.error(
              "Deal not found"
            );

            navigate(
              "/pipeline"
            );

            return;
          }

          setInitialValues({
            title:
              deal.title,

            company:
              deal.company,

            value:
              String(
                deal.value
              ),

            stage:
              deal.stage,

            priority:
              deal.priority,

            assignedUserId:
              deal.assignedUserId,

            leadId:
              deal.leadId ??
              "",

            expectedCloseDate:
              deal.expectedCloseDate,

            description:
              deal.description,
          });
        } catch {
          toast.error(
            "Failed to load deal"
          );
        } finally {
          setLoading(false);
        }
      };

    loadDeal();
  }, [id, navigate]);

  const handleSubmit =
    async (
      data: DealFormData
    ) => {
      if (!id) {
        return;
      }

      try {
        setSaving(true);

        await dealService.update(
          id,
          data
        );

        toast.success(
          "Deal updated successfully"
        );

        navigate(
          `/pipeline/${id}`
        );
      } catch {
        toast.error(
          "Failed to update deal"
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
      <LoadingSpinner text="Loading deal..." />
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <button
        type="button"
        onClick={() =>
          navigate(
            `/pipeline/${id}`
          )
        }
        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600"
      >
        <ArrowLeft
          size={17}
        />

        Back to Deal
      </button>

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Edit Deal
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Update deal details,
          stage, priority and
          ownership.
        </p>
      </div>

      <DealForm
        initialValues={
          initialValues
        }
        loading={saving}
        submitLabel="Update Deal"
        onSubmit={
          handleSubmit
        }
        onCancel={() =>
          navigate(
            `/pipeline/${id}`
          )
        }
      />
    </div>
  );
};

export default EditDeal;