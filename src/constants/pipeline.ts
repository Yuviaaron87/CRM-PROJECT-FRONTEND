import type {
  DealPriority,
  DealStage,
} from "../types/dealTypes";

export interface PipelineStage {
  id: DealStage;
  label: string;
}

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "new",
    label: "New",
  },
  {
    id: "contacted",
    label: "Contacted",
  },
  {
    id: "qualified",
    label: "Qualified",
  },
  {
    id: "proposal",
    label: "Proposal",
  },
  {
    id: "negotiation",
    label: "Negotiation",
  },
  {
    id: "won",
    label: "Won",
  },
  {
    id: "lost",
    label: "Lost",
  },
];

export const PRIORITY_OPTIONS: {
  label: string;
  value: DealPriority;
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