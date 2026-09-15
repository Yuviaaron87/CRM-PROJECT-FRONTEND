import {
  CheckSquare,
  Contact,
  Handshake,
  UserPlus,
} from "lucide-react";

import type { DashboardActivity } from "../../types/dashboardTypes";

interface RecentActivityProps {
  activities: DashboardActivity[];
}

const RecentActivity = ({
  activities,
}: RecentActivityProps) => {
  const getIcon = (
    type: DashboardActivity["type"]
  ) => {
    switch (type) {
      case "lead":
        return UserPlus;

      case "deal":
        return Handshake;

      case "task":
        return CheckSquare;

      case "contact":
        return Contact;
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-5">
        <h2 className="font-semibold text-slate-900">
          Recent Activity
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Latest CRM updates
        </p>
      </div>

      <div className="divide-y divide-slate-100">
        {activities.map((activity) => {
          const Icon = getIcon(activity.type);

          return (
            <div
              key={activity.id}
              className="flex gap-3 p-4"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <Icon size={17} />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-800">
                  {activity.title}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {activity.description}
                </p>

                <p className="mt-1.5 text-[11px] text-slate-400">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;