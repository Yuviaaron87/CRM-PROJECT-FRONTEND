import type {
  TaskPriority,
  TaskStatus,
  TaskType,
} from "../types/taskTypes";

export const TASK_STATUS_OPTIONS: {
  label: string;
  value: TaskStatus;
}[] = [
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "In Progress",
    value: "in-progress",
  },
  {
    label: "Completed",
    value: "completed",
  },
];

export const TASK_PRIORITY_OPTIONS: {
  label: string;
  value: TaskPriority;
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

export const TASK_TYPE_OPTIONS: {
  label: string;
  value: TaskType;
}[] = [
  {
    label: "Call",
    value: "call",
  },
  {
    label: "Email",
    value: "email",
  },
  {
    label: "Meeting",
    value: "meeting",
  },
  {
    label: "Follow-up",
    value: "follow-up",
  },
  {
    label: "Other",
    value: "other",
  },
];