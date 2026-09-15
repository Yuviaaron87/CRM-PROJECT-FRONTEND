import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { ROUTES } from "../../constants/route";
import type { Lead } from "../../types/leadTypes";

interface RecentLeadsProps {
  leads: Lead[];
}

const RecentLeads = ({
  leads,
}: RecentLeadsProps) => {
  const statusStyles: Record<
    Lead["status"],
    string
  > = {
    new: "bg-blue-50 text-blue-700",
    contacted: "bg-cyan-50 text-cyan-700",
    qualified: "bg-violet-50 text-violet-700",
    proposal: "bg-amber-50 text-amber-700",
    negotiation: "bg-orange-50 text-orange-700",
    won: "bg-emerald-50 text-emerald-700",
    lost: "bg-red-50 text-red-700",
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <div>
          <h2 className="font-semibold text-slate-900">
            Recent Leads
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Latest leads added to CRM
          </p>
        </div>

        <Link
          to={ROUTES.LEADS}
          className="flex items-center gap-1 text-sm font-medium text-blue-600"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-5 py-3 text-left text-xs font-medium uppercase text-slate-500">
                Lead
              </th>

              <th className="px-5 py-3 text-left text-xs font-medium uppercase text-slate-500">
                Company
              </th>

              <th className="px-5 py-3 text-left text-xs font-medium uppercase text-slate-500">
                Status
              </th>

              <th className="px-5 py-3 text-left text-xs font-medium uppercase text-slate-500">
                Owner
              </th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
              >
                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-slate-800">
                    {lead.name}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {lead.email}
                  </p>
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {lead.company}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                      statusStyles[lead.status]
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {lead.assignedTo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentLeads;