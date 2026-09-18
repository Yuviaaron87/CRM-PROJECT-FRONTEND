import {
  defaultSettings,
} from "../data/settings";

import type {
  ApplicationSettingsData,
  CRMSettings,
  NotificationSettingsData,
  ProfileSettingsData,
} from "../types/settingTypes";

const STORAGE_KEY = "crm_settings";

const delay = (ms = 300) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

const getStoredSettings = (): CRMSettings => {
  const stored = localStorage.getItem(
    STORAGE_KEY
  );

  if (!stored) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultSettings)
    );

    return defaultSettings;
  }

  try {
    return JSON.parse(stored) as CRMSettings;
  } catch {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultSettings)
    );

    return defaultSettings;
  }
};

const saveSettings = (
  settings: CRMSettings
) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(settings)
  );
};

export const settingsService = {
  async getSettings(): Promise<CRMSettings> {
    await delay();

    return getStoredSettings();
  },

  async updateProfile(
    profile: ProfileSettingsData
  ): Promise<ProfileSettingsData> {
    await delay();

    const current =
      getStoredSettings();

    const updated: CRMSettings = {
      ...current,
      profile,
    };

    saveSettings(updated);

    return profile;
  },

  async updateNotifications(
    notifications: NotificationSettingsData
  ): Promise<NotificationSettingsData> {
    await delay();

    const current =
      getStoredSettings();

    const updated: CRMSettings = {
      ...current,
      notifications,
    };

    saveSettings(updated);

    return notifications;
  },

  async updateApplication(
    application: ApplicationSettingsData
  ): Promise<ApplicationSettingsData> {
    await delay();

    const current =
      getStoredSettings();

    const updated: CRMSettings = {
      ...current,
      application,
    };

    saveSettings(updated);

    return application;
  },

  async resetSettings(): Promise<CRMSettings> {
    await delay();

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultSettings)
    );

    return defaultSettings;
  },
};