import {
  useEffect,
  useState,
} from "react";

import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "../../components/Select";

import {
  TASK_PRIORITY_OPTIONS,
  TASK_STATUS_OPTIONS,
  TASK_TYPE_OPTIONS,
} from "../../constants/task";

import {
  users,
} from "../../data/users";

import {
  contactService,
} from "../../services/contactService";

import {
  leadService,
} from "../../services/leadService";

import type {
  Contact,
} from "../../types/contactTypes";

import type {
  Lead,
} from "../../types/leadTypes";

import type {
  TaskFormData,
} from "../../types/taskTypes";

interface Props {
  initialValues: TaskFormData;

  loading?: boolean;

  submitLabel: string;

  onSubmit: (
    data: TaskFormData
  ) => Promise<void>;

  onCancel: () => void;
}

type Errors =
  Partial<
    Record<
      keyof TaskFormData,
      string
    >
  >;

const TaskForm = ({
  initialValues,
  loading = false,
  submitLabel,
  onSubmit,
  onCancel,
}: Props) => {
  const [
    form,
    setForm,
  ] =
    useState<TaskFormData>(
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

  const [
    contacts,
    setContacts,
  ] =
    useState<Contact[]>([]);

  useEffect(() => {
    const loadRelationships =
      async () => {
        try {
          const [
            leadData,
            contactData,
          ] =
            await Promise.all([
              leadService.getAll(),
              contactService.getAll(),
            ]);

          setLeads(leadData);

          setContacts(
            contactData
          );
        } catch {
          setLeads([]);
          setContacts([]);
        }
      };

    loadRelationships();
  }, []);

  const updateField = (
    key: keyof TaskFormData,
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
        "Task title is required";
    }

    if (!form.dueDate) {
      newErrors.dueDate =
        "Due date is required";
    }

    if (
      !form.assignedUserId
    ) {
      newErrors.assignedUserId =
        "Assigned user is required";
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
      {/* Basic Information */}

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="font-semibold text-slate-900">
            Task Information
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Enter the basic
            information about this
            task or follow-up.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
          <Input
            label="Task Title *"
            value={form.title}
            error={errors.title}
            placeholder="Follow up with client"
            onChange={(event) =>
              updateField(
                "title",
                event.target.value
              )
            }
          />

          <Select
            label="Task Type"
            value={form.type}
            options={
              TASK_TYPE_OPTIONS
            }
            onChange={(event) =>
              updateField(
                "type",
                event.target.value
              )
            }
          />

          <Select
            label="Status"
            value={form.status}
            options={
              TASK_STATUS_OPTIONS
            }
            onChange={(event) =>
              updateField(
                "status",
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
              TASK_PRIORITY_OPTIONS
            }
            onChange={(event) =>
              updateField(
                "priority",
                event.target.value
              )
            }
          />
        </div>
      </div>

      {/* Schedule */}

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="font-semibold text-slate-900">
            Schedule
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
          <Input
            type="date"
            label="Due Date *"
            value={form.dueDate}
            error={
              errors.dueDate
            }
            onChange={(event) =>
              updateField(
                "dueDate",
                event.target.value
              )
            }
          />

          <Input
            type="time"
            label="Due Time"
            value={form.dueTime}
            onChange={(event) =>
              updateField(
                "dueTime",
                event.target.value
              )
            }
          />
        </div>
      </div>

      {/* Assignment */}

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="font-semibold text-slate-900">
            Assignment
          </h2>
        </div>

        <div className="p-5">
          <Select
            label="Assigned User *"
            value={
              form.assignedUserId
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

          {errors.assignedUserId && (
            <p className="mt-1 text-xs text-red-500">
              {
                errors.assignedUserId
              }
            </p>
          )}
        </div>
      </div>

      {/* CRM Relationships */}

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="font-semibold text-slate-900">
            CRM Relationships
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Optionally link the
            task with a lead and
            contact.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
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

          <Select
            label="Related Contact"
            value={
              form.contactId
            }
            options={[
              {
                label:
                  "No related contact",
                value: "",
              },

              ...contacts.map(
                (contact) => ({
                  label: `${contact.firstName} ${contact.lastName} — ${contact.company}`,
                  value:
                    contact.id,
                })
              ),
            ]}
            onChange={(event) =>
              updateField(
                "contactId",
                event.target.value
              )
            }
          />
        </div>
      </div>

      {/* Description */}

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
          placeholder="Add task details..."
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

export default TaskForm;