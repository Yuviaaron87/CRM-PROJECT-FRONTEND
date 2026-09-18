import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  Bell,
  BriefcaseBusiness,
  Mail,
  Newspaper,
  PhoneCall,
} from "lucide-react";

import {
  settingsService,
} from "../../services/settingsService";

import type {
  NotificationSettingsData,
} from "../../types/settingTypes";

interface Props {
  data: NotificationSettingsData;

  onUpdate: (
    data: NotificationSettingsData
  ) => void;
}

const NotificationSettings = ({
  data,
  onUpdate,
}: Props) => {
  const [form, setForm] =
    useState(data);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    setForm(data);
  }, [data]);

  const toggle = (
    key: keyof NotificationSettingsData
  ) => {
    setForm((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const updated =
        await settingsService.updateNotifications(
          form
        );

      onUpdate(updated);

      toast.success(
        "Notification settings updated"
      );
    } catch {
      toast.error(
        "Failed to update notification settings"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="border-b border-slate-100 p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Notification Settings
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Choose which CRM activities
          you want to be notified about.
        </p>
      </div>

      <div className="p-6">
        <div className="divide-y divide-slate-100">
          <ToggleRow
            icon={<Mail size={18} />}
            title="Email Notifications"
            description="Receive CRM notifications through email."
            enabled={
              form.emailNotifications
            }
            onChange={() =>
              toggle(
                "emailNotifications"
              )
            }
          />

          <ToggleRow
            icon={
              <PhoneCall size={18} />
            }
            title="Task Reminders"
            description="Get reminders for upcoming tasks and follow-ups."
            enabled={
              form.taskReminders
            }
            onChange={() =>
              toggle(
                "taskReminders"
              )
            }
          />

          <ToggleRow
            icon={<Bell size={18} />}
            title="Lead Updates"
            description="Receive notifications when lead information or status changes."
            enabled={
              form.leadUpdates
            }
            onChange={() =>
              toggle("leadUpdates")
            }
          />

          <ToggleRow
            icon={
              <BriefcaseBusiness
                size={18}
              />
            }
            title="Deal Updates"
            description="Receive notifications about deal and pipeline activity."
            enabled={
              form.dealUpdates
            }
            onChange={() =>
              toggle("dealUpdates")
            }
          />

          <ToggleRow
            icon={
              <Newspaper size={18} />
            }
            title="Daily Summary"
            description="Receive a daily summary of important CRM activities."
            enabled={
              form.dailySummary
            }
            onChange={() =>
              toggle("dailySummary")
            }
          />
        </div>

        <div className="mt-6 flex justify-end border-t border-slate-100 pt-5">
          <button
            type="button"
            disabled={saving}
            onClick={handleSave}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : "Save Preferences"}
          </button>
        </div>
      </div>
    </div>
  );
};

interface ToggleRowProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}

const ToggleRow = ({
  icon,
  title,
  description,
  enabled,
  onChange,
}: ToggleRowProps) => {
  return (
    <div className="flex items-center justify-between gap-5 py-5 first:pt-0">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          {icon}
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-800">
            {title}
          </p>

          <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={onChange}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled
            ? "bg-blue-600"
            : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
            enabled
              ? "left-6"
              : "left-1"
          }`}
        />
      </button>
    </div>
  );
};

export default NotificationSettings;