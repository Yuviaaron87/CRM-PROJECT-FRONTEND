import type {
  Note,
} from "../types/noteTypes";

export const mockNotes: Note[] = [
  {
    id: "NOTE-001",

    content:
      "Client is interested in the CRM implementation and requested a detailed product demonstration.",

    entityType: "lead",

    entityId: "LEAD-001",

    createdBy: "USER-001",

    createdAt:
      "2026-09-13T10:30:00.000Z",
  },

  {
    id: "NOTE-002",

    content:
      "Follow-up call completed. Client requested pricing information for the enterprise package.",

    entityType: "lead",

    entityId: "LEAD-001",

    createdBy: "USER-001",

    createdAt:
      "2026-09-14T11:15:00.000Z",
  },

  {
    id: "NOTE-003",

    content:
      "Proposal document was shared with the client through email.",

    entityType: "lead",

    entityId: "LEAD-002",

    createdBy: "USER-002",

    createdAt:
      "2026-09-15T09:45:00.000Z",
  },

  {
    id: "NOTE-004",

    content:
      "Discussed CRM requirements and scheduled another meeting for next week.",

    entityType: "contact",

    entityId: "CONTACT-001",

    createdBy: "USER-001",

    createdAt:
      "2026-09-15T12:00:00.000Z",
  },

  {
    id: "NOTE-005",

    content:
      "Contact prefers communication through email during business hours.",

    entityType: "contact",

    entityId: "CONTACT-002",

    createdBy: "USER-002",

    createdAt:
      "2026-09-15T15:30:00.000Z",
  },
];