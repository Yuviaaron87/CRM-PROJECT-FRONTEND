import type {
  LeadStatus,
} from "../types/leadTypes";

interface StatusBadgeProps {
  status: LeadStatus;
}

const StatusBadge = ({
  status,
}: StatusBadgeProps) => {
  const styles: Record<
    LeadStatus,
    string
  > = {
    new: "bg-blue-50 text-blue-700",
    contacted: "bg-cyan-50 text-cyan-700",
    qualified:
      "bg-violet-50 text-violet-700",
    proposal:
      "bg-amber-50 text-amber-700",
    negotiation:
      "bg-orange-50 text-orange-700",
    won: "bg-emerald-50 text-emerald-700",
    lost: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;