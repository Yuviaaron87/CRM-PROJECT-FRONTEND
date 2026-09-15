import { CalendarClock } from "lucide-react";

import type { FollowUp } from "../../types/dashboardTypes";

interface UpcomingFollowUpsProps {
  followUps: FollowUp[];
}

const UpcomingFollowUps = ({
  followUps,
}: UpcomingFollowUpsProps) => {
  const priorityStyles: Record<
    FollowUp["priority"],
    string
  > = {
    high: "bg-red-50 text-red-600",
    medium: "bg-amber-50 text-amber-600",
    low: "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-5">
        <h2 className="font-semibold text-slate-900">
          Upcoming Follow-ups
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Tasks that need your attention
        </p>
      </div>

      <div className="divide-y divide-slate-100">
        {followUps.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 p-4"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <CalendarClock size={18} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="truncate text-sm font-medium text-slate-800">
                  {item.title}
                </p>

                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${
                    priorityStyles[item.priority]
                  }`}
                >
                  {item.priority}
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-500">
                {item.contactName}
              </p>

              <p className="mt-1 text-xs font-medium text-blue-600">
                {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingFollowUps;