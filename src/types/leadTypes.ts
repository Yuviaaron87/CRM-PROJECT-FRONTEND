export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "proposal"
  | "negotiation"
  | "won"
  | "lost";

export type Priority =
  | "low"
  | "medium"
  | "high";

export interface Lead {
  id: string;

  name: string;
  company: string;
  email: string;
  phone: string;

  status: LeadStatus;
  priority: Priority;

  assignedTo: string;
  source: string;

  jobTitle?: string;
  website?: string;
  address?: string;
  description?: string;

  createdAt: string;
  updatedAt?: string;
}

export interface LeadFormData {
  name: string;
  company: string;
  email: string;
  phone: string;

  status: LeadStatus;
  priority: Priority;

  assignedTo: string;
  source: string;

  jobTitle: string;
  website: string;
  address: string;
  description: string;
}