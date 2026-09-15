import type {
  LeadStatus,
  Priority,
} from "../types/leadTypes";

export const LEAD_STATUSES: {
  label: string;
  value: LeadStatus;
}[] = [
  {
    label: "New",
    value: "new",
  },
  {
    label: "Contacted",
    value: "contacted",
  },
  {
    label: "Qualified",
    value: "qualified",
  },
  {
    label: "Proposal",
    value: "proposal",
  },
  {
    label: "Negotiation",
    value: "negotiation",
  },
  {
    label: "Won",
    value: "won",
  },
  {
    label: "Lost",
    value: "lost",
  },
];

export const LEAD_PRIORITIES: {
  label: string;
  value: Priority;
}[] = [
  {
    label: "Low",
    value: "low",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "High",
    value: "high",
  },
];

export const LEAD_SOURCES = [
  "Website",
  "Referral",
  "LinkedIn",
  "Email",
  "Cold Call",
  "Social Media",
  "Advertisement",
  "Other",
];

export const CRM_USERS = [
  "Yuvi Aaron",
  "Rahul",
  "Priya",
  "Karthik",
];