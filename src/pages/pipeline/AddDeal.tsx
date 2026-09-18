import {
  ArrowLeft,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router";

import toast from "react-hot-toast";

import DealForm from "../../pages/pipeline/DealForm";

import {
  PIPELINE_STAGES,
} from "../../constants/pipeline";

import {
  dealService,
} from "../../services/dealService";

import type {
  DealFormData,
  DealStage,
} from "../../types/dealTypes";

const AddDeal = () => {
  const navigate =
    useNavigate();

  const [
    searchParams,
  ] = useSearchParams();

  const stageParam =
    searchParams.get(
      "stage"
    );

  const validStage =
    PIPELINE_STAGES.some(
      (stage) =>
        stage.id === stageParam
    );

  const initialStage:
    DealStage =
    validStage
      ? (stageParam as DealStage)
      : "new";

  const [
    loading,
    setLoading,
  ] = useState(false);

  const initialValues:
    DealFormData = {
    title: "",

    company: "",

    value: "",

    stage:
      initialStage,

    priority:
      "medium",

    assignedUserId: "",

    leadId: "",

    expectedCloseDate: "",

    description: "",
  };

  const handleSubmit =
    async (
      data: DealFormData
    ) => {
      try {
        setLoading(true);

        const deal =
          await dealService.create(
            data
          );

        toast.success(
          "Deal created successfully"
        );

        navigate(
          `/pipeline/${deal.id}`
        );
      } catch {
        toast.error(
          "Failed to create deal"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <button
        type="button"
        onClick={() =>
          navigate(
            "/pipeline"
          )
        }
        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600"
      >
        <ArrowLeft
          size={17}
        />

        Back to Pipeline
      </button>

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Add Deal
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Create a new sales
          opportunity in your CRM
          pipeline.
        </p>
      </div>

      <DealForm
        initialValues={
          initialValues
        }
        loading={loading}
        submitLabel="Create Deal"
        onSubmit={
          handleSubmit
        }
        onCancel={() =>
          navigate(
            "/pipeline"
          )
        }
      />
    </div>
  );
};

export default AddDeal;