import type { Priority } from "./leadTypes";

export type TaskStatus =
  | "pending"
  | "in-progress"
  | "completed";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: string;
  assignedTo: string;
  leadId?: string;
  contactId?: string;
  createdAt: string;
}