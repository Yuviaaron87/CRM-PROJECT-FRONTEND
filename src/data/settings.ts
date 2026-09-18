import type {
  CRMSettings,
} from "../types/settingTypes";

export const defaultSettings: CRMSettings = {
  profile: {
    fullName: "CRM Admin",
    email: "admin@crmflow.com",
    phone: "+91 98765 43210",
    jobTitle: "CRM Administrator",
    department: "Sales",
  },

  notifications: {
    emailNotifications: true,
    taskReminders: true,
    leadUpdates: true,
    dealUpdates: true,
    dailySummary: false,
  },

  application: {
    companyName: "CRMFlow",
    currency: "INR",
    dateFormat: "DD/MM/YYYY",
    timeZone: "Asia/Kolkata",
    defaultPageSize: 10,
  },
};