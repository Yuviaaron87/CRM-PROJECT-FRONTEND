export type TaskStatus =
  | "pending"
  | "in-progress"
  | "completed";

export type TaskPriority =
  | "low"
  | "medium"
  | "high";

export type TaskType =
  | "call"
  | "email"
  | "meeting"
  | "follow-up"
  | "other";

export interface Task {
  id: string;

  title: string;
  description: string;

  type: TaskType;

  status: TaskStatus;
  priority: TaskPriority;

  dueDate: string;
  dueTime: string;

  assignedUserId: string;

  leadId?: string;
  contactId?: string;

  createdAt: string;
  updatedAt?: string;
  completedAt?: string;
}

export interface TaskFormData {
  title: string;
  description: string;

  type: TaskType;

  status: TaskStatus;
  priority: TaskPriority;

  dueDate: string;
  dueTime: string;

  assignedUserId: string;

  leadId: string;
  contactId: string;
}