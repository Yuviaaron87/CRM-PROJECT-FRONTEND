export type DealStage =
  | "new"
  | "contacted"
  | "qualified"
  | "proposal"
  | "negotiation"
  | "won"
  | "lost";

export type DealPriority =
  | "low"
  | "medium"
  | "high";

export interface Deal {
  id: string;
  title: string;

  company: string;

  value: number;

  stage: DealStage;
  priority: DealPriority;

  assignedUserId: string;

  leadId?: string;

  expectedCloseDate: string;

  description: string;

  createdAt: string;
  updatedAt?: string;
}

export interface DealFormData {
  title: string;

  company: string;

  value: string;

  stage: DealStage;
  priority: DealPriority;

  assignedUserId: string;

  leadId: string;

  expectedCloseDate: string;

  description: string;
}