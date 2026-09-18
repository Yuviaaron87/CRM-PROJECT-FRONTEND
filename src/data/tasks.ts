import type {
  Task,
} from "../types/taskTypes";

export const mockTasks: Task[] = [
  {
    id: "TASK-001",

    title: "Follow up with ABC Technologies",

    description:
      "Call the client and discuss CRM implementation requirements.",

    type: "follow-up",

    status: "pending",

    priority: "high",

    dueDate: "2026-09-18",

    dueTime: "10:30",

    assignedUserId: "USER-001",

    leadId: "LEAD-001",

    contactId: "CONTACT-001",

    createdAt:
      "2026-09-15T09:00:00.000Z",
  },

  {
    id: "TASK-002",

    title: "Send proposal to Nexa Solutions",

    description:
      "Send the updated commercial proposal and implementation plan.",

    type: "email",

    status: "in-progress",

    priority: "high",

    dueDate: "2026-09-17",

    dueTime: "15:00",

    assignedUserId: "USER-002",

    leadId: "LEAD-002",

    contactId: "CONTACT-002",

    createdAt:
      "2026-09-14T10:00:00.000Z",
  },

  {
    id: "TASK-003",

    title: "Product demo meeting",

    description:
      "Demonstrate lead, contact and pipeline modules.",

    type: "meeting",

    status: "pending",

    priority: "medium",

    dueDate: "2026-09-20",

    dueTime: "11:00",

    assignedUserId: "USER-001",

    leadId: "LEAD-003",

    contactId: "CONTACT-003",

    createdAt:
      "2026-09-13T10:00:00.000Z",
  },

  {
    id: "TASK-004",

    title: "Call CloudEdge",

    description:
      "Discuss the proposal and negotiation timeline.",

    type: "call",

    status: "pending",

    priority: "medium",

    dueDate: "2026-09-16",

    dueTime: "16:30",

    assignedUserId: "USER-003",

    leadId: "LEAD-004",

    contactId: "CONTACT-004",

    createdAt:
      "2026-09-12T10:00:00.000Z",
  },

  {
    id: "TASK-005",

    title: "Update customer requirements",

    description:
      "Update CRM notes with the requirements discussed during the call.",

    type: "other",

    status: "completed",

    priority: "low",

    dueDate: "2026-09-14",

    dueTime: "12:00",

    assignedUserId: "USER-002",

    createdAt:
      "2026-09-10T10:00:00.000Z",

    completedAt:
      "2026-09-14T11:30:00.000Z",
  },

  {
    id: "TASK-006",

    title: "Follow up on enterprise CRM deal",

    description:
      "Check decision-maker feedback about the enterprise CRM proposal.",

    type: "follow-up",

    status: "pending",

    priority: "high",

    dueDate: "2026-09-22",

    dueTime: "09:30",

    assignedUserId: "USER-001",

    leadId: "LEAD-003",

    createdAt:
      "2026-09-15T10:00:00.000Z",
  },
];