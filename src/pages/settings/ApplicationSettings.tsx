import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  Building2,
  CalendarDays,
  Clock3,
  Coins,
  Rows3,
} from "lucide-react";

import {
  settingsService,
} from "../../services/settingsService";

import type {
  ApplicationSettingsData,
  Currency,
  DateFormat,
} from "../../types/settingTypes";

interface Props {
  data: ApplicationSettingsData;

  onUpdate: (
    data: ApplicationSettingsData
  ) => void;
}

const ApplicationSettings = ({
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

  const handleSave = async () => {
    if (!form.companyName.trim()) {
      toast.error(
        "Company name is required"
      );

      return;
    }

    try {
      setSaving(true);

      const updated =
        await settingsService.updateApplication(
          form
        );

      onUpdate(updated);

      toast.success(
        "Application settings updated"
      );
    } catch {
      toast.error(
        "Failed to update application settings"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="border-b border-slate-100 p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Application Settings
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Configure general CRM
          application preferences.
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Company */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Company Name
            </label>

            <div className="relative">
              <Building2
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={
                  form.companyName
                }
                onChange={(event) =>
                  setForm(
                    (previous) => ({
                      ...previous,
                      companyName:
                        event.target
                          .value,
                    })
                  )
                }
                className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Currency */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Currency
            </label>

            <div className="relative">
              <Coins
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={form.currency}
                onChange={(event) =>
                  setForm(
                    (previous) => ({
                      ...previous,
                      currency:
                        event.target
                          .value as Currency,
                    })
                  )
                }
                className="w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="INR">
                  INR - Indian Rupee
                </option>

                <option value="USD">
                  USD - US Dollar
                </option>

                <option value="EUR">
                  EUR - Euro
                </option>

                <option value="GBP">
                  GBP - British Pound
                </option>
              </select>
            </div>
          </div>

          {/* Date Format */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Date Format
            </label>

            <div className="relative">
              <CalendarDays
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={
                  form.dateFormat
                }
                onChange={(event) =>
                  setForm(
                    (previous) => ({
                      ...previous,
                      dateFormat:
                        event.target
                          .value as DateFormat,
                    })
                  )
                }
                className="w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="DD/MM/YYYY">
                  DD/MM/YYYY
                </option>

                <option value="MM/DD/YYYY">
                  MM/DD/YYYY
                </option>

                <option value="YYYY-MM-DD">
                  YYYY-MM-DD
                </option>
              </select>
            </div>
          </div>

          {/* Time Zone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Time Zone
            </label>

            <div className="relative">
              <Clock3
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={form.timeZone}
                onChange={(event) =>
                  setForm(
                    (previous) => ({
                      ...previous,
                      timeZone:
                        event.target
                          .value,
                    })
                  )
                }
                className="w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="Asia/Kolkata">
                  Asia/Kolkata (IST)
                </option>

                <option value="UTC">
                  UTC
                </option>

                <option value="America/New_York">
                  America/New_York
                </option>

                <option value="Europe/London">
                  Europe/London
                </option>

                <option value="Asia/Singapore">
                  Asia/Singapore
                </option>
              </select>
            </div>
          </div>

          {/* Page Size */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Default Page Size
            </label>

            <div className="relative">
              <Rows3
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={
                  form.defaultPageSize
                }
                onChange={(event) =>
                  setForm(
                    (previous) => ({
                      ...previous,
                      defaultPageSize:
                        Number(
                          event.target
                            .value
                        ),
                    })
                  )
                }
                className="w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value={5}>
                  5 records
                </option>

                <option value={10}>
                  10 records
                </option>

                <option value={20}>
                  20 records
                </option>

                <option value={50}>
                  50 records
                </option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-7 flex justify-end border-t border-slate-100 pt-5">
          <button
            type="button"
            disabled={saving}
            onClick={handleSave}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : "Save Settings"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSettings;