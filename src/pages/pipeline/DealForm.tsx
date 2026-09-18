import {
  useEffect,
  useState,
} from "react";

import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "../../components/Select";

import {
  PIPELINE_STAGES,
  PRIORITY_OPTIONS,
} from "../../constants/pipeline";

import {
  users,
} from "../../data/users";

import {
  leadService,
} from "../../services/leadService";

import type {
  DealFormData,
} from "../../types/dealTypes";

import type {
  Lead,
} from "../../types/leadTypes";

interface DealFormProps {
  initialValues:
    DealFormData;

  loading?: boolean;

  submitLabel: string;

  onSubmit: (
    data: DealFormData
  ) => Promise<void>;

  onCancel: () => void;
}

type Errors =
  Partial<
    Record<
      keyof DealFormData,
      string
    >
  >;

const DealForm = ({
  initialValues,
  loading = false,
  submitLabel,
  onSubmit,
  onCancel,
}: DealFormProps) => {
  const [
    form,
    setForm,
  ] =
    useState<DealFormData>(
      initialValues
    );

  const [
    errors,
    setErrors,
  ] = useState<Errors>({});

  const [
    leads,
    setLeads,
  ] = useState<Lead[]>([]);

  useEffect(() => {
    const loadLeads =
      async () => {
        try {
          const data =
            await leadService.getAll();

          setLeads(data);
        } catch {
          setLeads([]);
        }
      };

    loadLeads();
  }, []);

  const updateField = (
    key: keyof DealFormData,
    value: string
  ) => {
    setForm(
      (previous) => ({
        ...previous,
        [key]: value,
      })
    );

    setErrors(
      (previous) => ({
        ...previous,
        [key]: undefined,
      })
    );
  };

  const validate = () => {
    const newErrors:
      Errors = {};

    if (!form.title.trim()) {
      newErrors.title =
        "Deal title is required";
    }

    if (
      !form.company.trim()
    ) {
      newErrors.company =
        "Company is required";
    }

    if (!form.value) {
      newErrors.value =
        "Deal value is required";
    } else if (
      Number(form.value) <= 0
    ) {
      newErrors.value =
        "Enter a valid deal value";
    }

    if (
      !form.assignedUserId
    ) {
      newErrors.assignedUserId =
        "Assigned user is required";
    }

    if (
      !form.expectedCloseDate
    ) {
      newErrors.expectedCloseDate =
        "Expected close date is required";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  const handleSubmit =
    async (
      event:
        React.FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      if (!validate()) {
        return;
      }

      await onSubmit(form);
    };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="font-semibold text-slate-900">
            Deal Information
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Enter the basic
            information for this
            sales opportunity.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
          <Input
            label="Deal Title *"
            value={form.title}
            error={errors.title}
            placeholder="CRM Implementation"
            onChange={(event) =>
              updateField(
                "title",
                event.target.value
              )
            }
          />

          <Input
            label="Company *"
            value={form.company}
            error={
              errors.company
            }
            placeholder="Company name"
            onChange={(event) =>
              updateField(
                "company",
                event.target.value
              )
            }
          />

          <Input
            label="Deal Value *"
            type="number"
            value={form.value}
            error={errors.value}
            placeholder="100000"
            onChange={(event) =>
              updateField(
                "value",
                event.target.value
              )
            }
          />

          <Input
            label="Expected Close Date *"
            type="date"
            value={
              form.expectedCloseDate
            }
            error={
              errors.expectedCloseDate
            }
            onChange={(event) =>
              updateField(
                "expectedCloseDate",
                event.target.value
              )
            }
          />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="font-semibold text-slate-900">
            Pipeline Information
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
          <Select
            label="Stage"
            value={form.stage}
            options={PIPELINE_STAGES.map(
              (stage) => ({
                label:
                  stage.label,
                value: stage.id,
              })
            )}
            onChange={(event) =>
              updateField(
                "stage",
                event.target.value
              )
            }
          />

          <Select
            label="Priority"
            value={
              form.priority
            }
            options={
              PRIORITY_OPTIONS
            }
            onChange={(event) =>
              updateField(
                "priority",
                event.target.value
              )
            }
          />

          <Select
            label="Assigned User *"
            value={
              form.assignedUserId
            }
            error={
              errors.assignedUserId
            }
            options={[
              {
                label:
                  "Select user",
                value: "",
              },

              ...users.map(
                (user) => ({
                  label:
                    user.name,
                  value:
                    user.id,
                })
              ),
            ]}
            onChange={(event) =>
              updateField(
                "assignedUserId",
                event.target.value
              )
            }
          />

          <Select
            label="Related Lead"
            value={
              form.leadId
            }
            options={[
              {
                label:
                  "No related lead",
                value: "",
              },

              ...leads.map(
                (lead) => ({
                  label: `${lead.name} — ${lead.company}`,
                  value:
                    lead.id,
                })
              ),
            ]}
            onChange={(event) =>
              updateField(
                "leadId",
                event.target.value
              )
            }
          />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Description
        </label>

        <textarea
          rows={6}
          value={
            form.description
          }
          onChange={(event) =>
            updateField(
              "description",
              event.target.value
            )
          }
          placeholder="Add deal description..."
          className="w-full resize-none rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          loading={loading}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default DealForm;