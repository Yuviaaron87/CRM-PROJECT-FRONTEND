export interface ProfileSettingsData {
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  department: string;
}

export interface NotificationSettingsData {
  emailNotifications: boolean;
  taskReminders: boolean;
  leadUpdates: boolean;
  dealUpdates: boolean;
  dailySummary: boolean;
}

export type Currency =
  | "INR"
  | "USD"
  | "EUR"
  | "GBP";

export type DateFormat =
  | "DD/MM/YYYY"
  | "MM/DD/YYYY"
  | "YYYY-MM-DD";

export interface ApplicationSettingsData {
  companyName: string;
  currency: Currency;
  dateFormat: DateFormat;
  timeZone: string;
  defaultPageSize: number;
}

export interface CRMSettings {
  profile: ProfileSettingsData;
  notifications: NotificationSettingsData;
  application: ApplicationSettingsData;
}