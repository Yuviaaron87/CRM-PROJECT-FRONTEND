import {
  useEffect,
  useState,
} from "react";

import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "../../components/Select";

import {
  leadService,
} from "../../services/leadService";

import type {
  ContactFormData,
} from "../../types/contactTypes";

import type {
  Lead,
} from "../../types/leadTypes";

interface ContactFormProps {
  initialValues?: ContactFormData;

  loading?: boolean;

  submitLabel?: string;

  onSubmit: (
    data: ContactFormData
  ) => Promise<void>;

  onCancel: () => void;
}

type FormErrors =
  Partial<
    Record<
      keyof ContactFormData,
      string
    >
  >;

const defaultValues: ContactFormData =
  {
    firstName: "",
    lastName: "",

    email: "",
    phone: "",

    company: "",
    jobTitle: "",

    leadId: "",

    address: "",
    city: "",

    notes: "",
  };

const ContactForm = ({
  initialValues =
    defaultValues,

  loading = false,

  submitLabel =
    "Save Contact",

  onSubmit,
  onCancel,
}: ContactFormProps) => {
  const [
    form,
    setForm,
  ] =
    useState<ContactFormData>(
      initialValues
    );

  const [
    errors,
    setErrors,
  ] =
    useState<FormErrors>({});

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
    field:
      keyof ContactFormData,
    value: string
  ) => {
    setForm(
      (previous) => ({
        ...previous,
        [field]: value,
      })
    );

    if (errors[field]) {
      setErrors(
        (previous) => ({
          ...previous,
          [field]:
            undefined,
        })
      );
    }
  };

  const validate = () => {
    const newErrors:
      FormErrors = {};

    if (
      !form.firstName.trim()
    ) {
      newErrors.firstName =
        "First name is required";
    }

    if (
      !form.lastName.trim()
    ) {
      newErrors.lastName =
        "Last name is required";
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

    if (
      !form.company.trim()
    ) {
      newErrors.company =
        "Company is required";
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
      {/* Personal */}

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="font-semibold text-slate-900">
            Contact Information
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Enter the personal
            information for this
            contact.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
          <Input
            label="First Name *"
            value={
              form.firstName
            }
            error={
              errors.firstName
            }
            placeholder="First name"
            onChange={(event) =>
              updateField(
                "firstName",
                event.target.value
              )
            }
          />

          <Input
            label="Last Name *"
            value={
              form.lastName
            }
            error={
              errors.lastName
            }
            placeholder="Last name"
            onChange={(event) =>
              updateField(
                "lastName",
                event.target.value
              )
            }
          />

          <Input
            type="email"
            label="Email *"
            value={form.email}
            error={errors.email}
            placeholder="name@company.com"
            onChange={(event) =>
              updateField(
                "email",
                event.target.value
              )
            }
          />

          <Input
            label="Phone *"
            value={form.phone}
            error={errors.phone}
            placeholder="+91 98765 43210"
            onChange={(event) =>
              updateField(
                "phone",
                event.target.value
              )
            }
          />
        </div>
      </div>

      {/* Company */}

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="font-semibold text-slate-900">
            Company Information
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
          <Input
            label="Company *"
            value={
              form.company
            }
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
            label="Job Title"
            value={
              form.jobTitle
            }
            placeholder="Sales Manager"
            onChange={(event) =>
              updateField(
                "jobTitle",
                event.target.value
              )
            }
          />
        </div>
      </div>

      {/* CRM */}

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="font-semibold text-slate-900">
            CRM Relationship
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Optionally connect this
            contact with an existing
            lead.
          </p>
        </div>

        <div className="p-5">
          <Select
            label="Related Lead"
            value={form.leadId}
            options={[
              {
                label:
                  "No related lead",
                value: "",
              },

              ...leads.map(
                (lead) => ({
                  label: `${lead.name} — ${lead.company}`,
                  value: lead.id,
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

      {/* Address */}

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Input
            label="City"
            value={form.city}
            placeholder="Chennai"
            onChange={(event) =>
              updateField(
                "city",
                event.target.value
              )
            }
          />

          <Input
            label="Address"
            value={
              form.address
            }
            placeholder="Enter address"
            onChange={(event) =>
              updateField(
                "address",
                event.target.value
              )
            }
          />
        </div>

        <label className="mb-1.5 mt-5 block text-sm font-medium text-slate-700">
          Notes
        </label>

        <textarea
          rows={5}
          value={form.notes}
          placeholder="Add information about this contact..."
          onChange={(event) =>
            updateField(
              "notes",
              event.target.value
            )
          }
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

export default ContactForm;