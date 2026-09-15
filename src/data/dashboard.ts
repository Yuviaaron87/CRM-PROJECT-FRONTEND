import type {
  DashboardActivity,
  DashboardStat,
  DealStatusData,
  FollowUp,
  PipelineStageData,
  SalesData,
} from "../types/dashboardTypes";

export const dashboardStats: DashboardStat[] = [
  {
    id: "total-leads",
    title: "Total Leads",
    value: 248,
    change: 12.5,
    trend: "up",
    type: "number",
  },
  {
    id: "total-contacts",
    title: "Total Contacts",
    value: 184,
    change: 8.2,
    trend: "up",
    type: "number",
  },
  {
    id: "open-deals",
    title: "Open Deals",
    value: 42,
    change: 5.4,
    trend: "up",
    type: "number",
  },
  {
    id: "follow-ups",
    title: "Follow-ups",
    value: 18,
    change: 3.1,
    trend: "down",
    type: "number",
  },
];

export const salesData: SalesData[] = [
  { month: "Apr", leads: 32, deals: 18 },
  { month: "May", leads: 42, deals: 24 },
  { month: "Jun", leads: 38, deals: 20 },
  { month: "Jul", leads: 58, deals: 32 },
  { month: "Aug", leads: 52, deals: 29 },
  { month: "Sep", leads: 68, deals: 41 },
];

export const dealStatusData: DealStatusData[] = [
  {
    name: "Won",
    value: 38,
  },
  {
    name: "Open",
    value: 42,
  },
  {
    name: "Lost",
    value: 20,
  },
];

export const pipelineData: PipelineStageData[] = [
  {
    stage: "New",
    count: 24,
    value: 480000,
  },
  {
    stage: "Contacted",
    count: 18,
    value: 360000,
  },
  {
    stage: "Qualified",
    count: 15,
    value: 425000,
  },
  {
    stage: "Proposal",
    count: 11,
    value: 520000,
  },
  {
    stage: "Negotiation",
    count: 8,
    value: 390000,
  },
  {
    stage: "Won",
    count: 12,
    value: 680000,
  },
];

export const recentActivities: DashboardActivity[] = [
  {
    id: "ACT-001",
    title: "New lead created",
    description: "Arun Kumar from ABC Technologies",
    time: "10 minutes ago",
    type: "lead",
  },
  {
    id: "ACT-002",
    title: "Deal moved to Proposal",
    description: "Website Development - ₹1,50,000",
    time: "35 minutes ago",
    type: "deal",
  },
  {
    id: "ACT-003",
    title: "Follow-up completed",
    description: "Call with Priya Sharma",
    time: "1 hour ago",
    type: "task",
  },
  {
    id: "ACT-004",
    title: "New contact added",
    description: "Karthik Raj from Vertex Systems",
    time: "2 hours ago",
    type: "contact",
  },
];

export const upcomingFollowUps: FollowUp[] = [
  {
    id: "TASK-001",
    title: "Product demo call",
    contactName: "Arun Kumar",
    time: "Today, 2:30 PM",
    priority: "high",
  },
  {
    id: "TASK-002",
    title: "Send proposal",
    contactName: "Priya Sharma",
    time: "Today, 4:00 PM",
    priority: "medium",
  },
  {
    id: "TASK-003",
    title: "Follow-up call",
    contactName: "Karthik Raj",
    time: "Tomorrow, 10:30 AM",
    priority: "low",
  },
];