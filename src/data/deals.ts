import type {
  Deal,
} from "../types/dealTypes";

export const mockDeals: Deal[] = [
  {
    id: "DEAL-001",

    title: "CRM Implementation",

    company: "ABC Technologies",

    value: 125000,

    stage: "new",

    priority: "high",

    assignedUserId: "USER-001",

    leadId: "LEAD-001",

    expectedCloseDate:
      "2026-10-10",

    description:
      "CRM implementation opportunity for the sales and support teams.",

    createdAt:
      "2026-09-10T10:00:00.000Z",
  },

  {
    id: "DEAL-002",

    title: "Sales Automation",

    company: "Nexa Solutions",

    value: 85000,

    stage: "contacted",

    priority: "medium",

    assignedUserId: "USER-002",

    leadId: "LEAD-002",

    expectedCloseDate:
      "2026-10-15",

    description:
      "Sales automation and lead tracking requirement.",

    createdAt:
      "2026-09-11T10:00:00.000Z",
  },

  {
    id: "DEAL-003",

    title: "Enterprise CRM",

    company: "Vertex Systems",

    value: 250000,

    stage: "qualified",

    priority: "high",

    assignedUserId: "USER-001",

    leadId: "LEAD-003",

    expectedCloseDate:
      "2026-10-20",

    description:
      "Enterprise CRM implementation with multiple teams.",

    createdAt:
      "2026-09-12T10:00:00.000Z",
  },

  {
    id: "DEAL-004",

    title: "CRM Upgrade",

    company: "CloudEdge",

    value: 150000,

    stage: "proposal",

    priority: "medium",

    assignedUserId: "USER-003",

    leadId: "LEAD-004",

    expectedCloseDate:
      "2026-09-30",

    description:
      "Proposal submitted for CRM upgrade and migration.",

    createdAt:
      "2026-09-13T10:00:00.000Z",
  },

  {
    id: "DEAL-005",

    title: "Lead Management Platform",

    company: "Future Tech",

    value: 175000,

    stage: "negotiation",

    priority: "high",

    assignedUserId: "USER-002",

    expectedCloseDate:
      "2026-09-28",

    description:
      "Commercial discussion currently in progress.",

    createdAt:
      "2026-09-14T10:00:00.000Z",
  },

  {
    id: "DEAL-006",

    title: "CRM Annual Contract",

    company: "Bright Labs",

    value: 320000,

    stage: "won",

    priority: "high",

    assignedUserId: "USER-001",

    leadId: "LEAD-007",

    expectedCloseDate:
      "2026-09-15",

    description:
      "Annual CRM contract successfully completed.",

    createdAt:
      "2026-09-08T10:00:00.000Z",
  },

  {
    id: "DEAL-007",

    title: "Customer Portal",

    company: "Nova Systems",

    value: 95000,

    stage: "lost",

    priority: "low",

    assignedUserId: "USER-003",

    expectedCloseDate:
      "2026-09-10",

    description:
      "Opportunity closed and marked as lost.",

    createdAt:
      "2026-09-07T10:00:00.000Z",
  },
];