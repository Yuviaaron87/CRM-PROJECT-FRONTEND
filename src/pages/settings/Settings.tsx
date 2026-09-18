import {
  useEffect,
  useState,
} from "react";

import {
  RotateCcw,
  Settings as SettingsIcon,
} from "lucide-react";

import toast from "react-hot-toast";

import SettingsTabs, {
  type SettingsTab,
} from "../../pages/settings/SettingsTabs";

import ProfileSettings from "../../pages/settings/ProfileSettings";
import NotificationSettings from "../../pages/settings/NotificationSettings";
import ApplicationSettings from "../../pages/settings/ApplicationSettings";

import {
  settingsService,
} from "../../services/settingsService";

import type {
  CRMSettings,
} from "../../types/settingTypes";

const Settings = () => {
  const [activeTab, setActiveTab] =
    useState<SettingsTab>(
      "profile"
    );

  const [settings, setSettings] =
    useState<CRMSettings | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [resetting, setResetting] =
    useState(false);

  useEffect(() => {
    const loadSettings =
      async () => {
        try {
          setLoading(true);

          const data =
            await settingsService.getSettings();

          setSettings(data);
        } catch {
          toast.error(
            "Failed to load settings"
          );
        } finally {
          setLoading(false);
        }
      };

    loadSettings();
  }, []);

  const handleReset =
    async () => {
      const confirmed =
        window.confirm(
          "Reset all CRM settings to their default values?"
        );

      if (!confirmed) {
        return;
      }

      try {
        setResetting(true);

        const data =
          await settingsService.resetSettings();

        setSettings(data);

        toast.success(
          "Settings reset successfully"
        );
      } catch {
        toast.error(
          "Failed to reset settings"
        );
      } finally {
        setResetting(false);
      }
    };

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

          <p className="mt-3 text-sm text-slate-500">
            Loading settings...
          </p>
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="rounded-xl border border-red-100 bg-red-50 p-8 text-center">
        <p className="font-medium text-red-700">
          Unable to load settings.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <SettingsIcon
              size={24}
              className="text-slate-900"
            />

            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Settings
            </h1>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Manage your profile,
            notifications and CRM
            preferences.
          </p>
        </div>

        <button
          type="button"
          disabled={resetting}
          onClick={handleReset}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
        >
          <RotateCcw size={16} />

          {resetting
            ? "Resetting..."
            : "Reset Settings"}
        </button>
      </div>

      {/* Settings Container */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <SettingsTabs
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {activeTab ===
          "profile" && (
          <ProfileSettings
            data={
              settings.profile
            }
            onUpdate={(
              profile
            ) =>
              setSettings(
                (previous) =>
                  previous
                    ? {
                        ...previous,
                        profile,
                      }
                    : previous
              )
            }
          />
        )}

        {activeTab ===
          "notifications" && (
          <NotificationSettings
            data={
              settings.notifications
            }
            onUpdate={(
              notifications
            ) =>
              setSettings(
                (previous) =>
                  previous
                    ? {
                        ...previous,
                        notifications,
                      }
                    : previous
              )
            }
          />
        )}

        {activeTab ===
          "application" && (
          <ApplicationSettings
            data={
              settings.application
            }
            onUpdate={(
              application
            ) =>
              setSettings(
                (previous) =>
                  previous
                    ? {
                        ...previous,
                        application,
                      }
                    : previous
              )
            }
          />
        )}
      </div>
    </div>
  );
};

export default Settings;