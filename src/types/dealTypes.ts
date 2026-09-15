import type { Priority } from "./leadTypes";

export type DealStage =
  | "new"
  | "contacted"
  | "qualified"
  | "proposal"
  | "negotiation"
  | "won"
  | "lost";

export interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  stage: DealStage;
  priority: Priority;
  assignedTo: string;
  leadId?: string;
  expectedCloseDate?: string;
  createdAt: string;
}