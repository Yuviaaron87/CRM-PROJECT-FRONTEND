import type {
  Priority,
} from "../types/leadTypes";

interface PriorityBadgeProps {
  priority: Priority;
}

const PriorityBadge = ({
  priority,
}: PriorityBadgeProps) => {
  const styles: Record<
    Priority,
    string
  > = {
    low:
      "bg-slate-100 text-slate-600",

    medium:
      "bg-amber-50 text-amber-700",

    high:
      "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${styles[priority]}`}
    >
      {priority}
    </span>
  );
};

export default PriorityBadge;