export interface DashboardStat {
  id: string;
  title: string;
  value: number;
  change: number;
  trend: "up" | "down";
  type: "number" | "currency";
}

export interface SalesData {
  month: string;
  leads: number;
  deals: number;
}

export interface DealStatusData {
  name: string;
  value: number;
}

export interface PipelineStageData {
  stage: string;
  count: number;
  value: number;
}

export interface DashboardActivity {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "lead" | "deal" | "task" | "contact";
}

export interface FollowUp {
  id: string;
  title: string;
  contactName: string;
  time: string;
  priority: "low" | "medium" | "high";
}