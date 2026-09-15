import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  trend: "up" | "down";
  icon: LucideIcon;
}

const StatCard = ({
  title,
  value,
  change,
  trend,
  icon: Icon,
}: StatCardProps) => {
  const isUp = trend === "up";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </h3>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon size={21} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div
          className={`flex items-center gap-1 text-xs font-semibold ${
            isUp ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {isUp ? (
            <ArrowUpRight size={15} />
          ) : (
            <ArrowDownRight size={15} />
          )}

          {change}%
        </div>

        <span className="text-xs text-slate-400">
          vs last month
        </span>
      </div>
    </div>
  );
};

export default StatCard;