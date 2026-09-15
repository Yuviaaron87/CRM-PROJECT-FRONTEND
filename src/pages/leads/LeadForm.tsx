import {
  useState,
} from "react";

import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";

import {
  CRM_USERS,
  LEAD_PRIORITIES,
  LEAD_SOURCES,
  LEAD_STATUSES,
} from "../../constants/lead";

import type {
  LeadFormData,
} from "../../types/leadTypes";

interface LeadFormProps {
  initialValues?: LeadFormData;
  loading?: boolean;

  submitLabel?: string;

  onSubmit: (
    data: LeadFormData
  ) => Promise<void>;

  onCancel: () => void;
}

type FormErrors = Partial<
  Record<
    keyof LeadFormData,
    string
  >
>;

const defaultValues: LeadFormData = {
  name: "",
  company: "",
  email: "",
  phone: "",

  status: "new",
  priority: "medium",

  assignedTo: "",
  source: "",

  jobTitle: "",
  website: "",
  address: "",
  description: "",
};

const LeadForm = ({
  initialValues = defaultValues,
  loading = false,
  submitLabel = "Save Lead",
  onSubmit,
  onCancel,
}: LeadFormProps) => {
  const [form, setForm] =
    useState<LeadFormData>(
      initialValues
    );

  const [errors, setErrors] =
    useState<FormErrors>({});

  const updateField = (
    field: keyof LeadFormData,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((previous) => ({
        ...previous,
        [field]: undefined,
      }));
    }
  };

  const validate = () => {
    const newErrors: FormErrors =
      {};

    if (!form.name.trim()) {
      newErrors.name =
        "Lead name is required";
    }

    if (!form.company.trim()) {
      newErrors.company =
        "Company is required";
    }

    if (!form.email.trim()) {
      newErrors.email =
        "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email
      )
    ) {
      newErrors.email =
        "Enter a valid email";
    }

    if (!form.phone.trim()) {
      newErrors.phone =
        "Phone number is required";
    }

    if (!form.assignedTo) {
      newErrors.assignedTo =
        "Please assign the lead";
    }

    if (!form.source) {
      newErrors.source =
        "Please select a source";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  const handleSubmit = async (
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
            Lead Information
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Enter the basic information
            about this lead.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
          <Input
            id="name"
            label="Lead Name *"
            placeholder="Enter full name"
            value={form.name}
            error={errors.name}
            onChange={(event) =>
              updateField(
                "name",
                event.target.value
              )
            }
          />

          <Input
            id="company"
            label="Company *"
            placeholder="Company name"
            value={form.company}
            error={errors.company}
            onChange={(event) =>
              updateField(
                "company",
                event.target.value
              )
            }
          />

          <Input
            id="email"
            type="email"
            label="Email *"
            placeholder="name@company.com"
            value={form.email}
            error={errors.email}
            onChange={(event) =>
              updateField(
                "email",
                event.target.value
              )
            }
          />

          <Input
            id="phone"
            label="Phone *"
            placeholder="+91 98765 43210"
            value={form.phone}
            error={errors.phone}
            onChange={(event) =>
              updateField(
                "phone",
                event.target.value
              )
            }
          />

          <Input
            id="jobTitle"
            label="Job Title"
            placeholder="Sales Manager"
            value={form.jobTitle}
            onChange={(event) =>
              updateField(
                "jobTitle",
                event.target.value
              )
            }
          />

          <Input
            id="website"
            label="Website"
            placeholder="www.company.com"
            value={form.website}
            onChange={(event) =>
              updateField(
                "website",
                event.target.value
              )
            }
          />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="font-semibold text-slate-900">
            CRM Information
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Configure lead status,
            priority and ownership.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
          <Select
            id="status"
            label="Status"
            value={form.status}
            options={LEAD_STATUSES}
            onChange={(event) =>
              updateField(
                "status",
                event.target.value
              )
            }
          />

          <Select
            id="priority"
            label="Priority"
            value={form.priority}
            options={
              LEAD_PRIORITIES
            }
            onChange={(event) =>
              updateField(
                "priority",
                event.target.value
              )
            }
          />

          <Select
            id="assignedTo"
            label="Assigned To *"
            value={
              form.assignedTo
            }
            error={
              errors.assignedTo
            }
            options={[
              {
                label:
                  "Select user",
                value: "",
              },

              ...CRM_USERS.map(
                (user) => ({
                  label: user,
                  value: user,
                })
              ),
            ]}
            onChange={(event) =>
              updateField(
                "assignedTo",
                event.target.value
              )
            }
          />

          <Select
            id="source"
            label="Lead Source *"
            value={form.source}
            error={errors.source}
            options={[
              {
                label:
                  "Select source",
                value: "",
              },

              ...LEAD_SOURCES.map(
                (source) => ({
                  label: source,
                  value: source,
                })
              ),
            ]}
            onChange={(event) =>
              updateField(
                "source",
                event.target.value
              )
            }
          />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Address
        </label>

        <textarea
          value={form.address}
          onChange={(event) =>
            updateField(
              "address",
              event.target.value
            )
          }
          placeholder="Enter address"
          rows={3}
          className="w-full resize-none rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <label className="mb-1.5 mt-5 block text-sm font-medium text-slate-700">
          Description
        </label>

        <textarea
          value={
            form.description
          }
          onChange={(event) =>
            updateField(
              "description",
              event.target.value
            )
          }
          placeholder="Add additional information about this lead..."
          rows={5}
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

export default LeadForm;