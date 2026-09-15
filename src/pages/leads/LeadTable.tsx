import {
  Eye,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import { useNavigate } from "react-router";

import PriorityBadge from "../../components/PriorityBadge";
import StatusBadge from "../../components/StatusBadge";

import type {
  Lead,
} from "../../types/leadTypes";

interface LeadTableProps {
  leads: Lead[];
  onDelete: (lead: Lead) => void;
}

const LeadTable = ({
  leads,
  onDelete,
}: LeadTableProps) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-200">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Lead
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Company
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Priority
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Assigned
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Source
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-slate-100 transition last:border-0 hover:bg-slate-50"
              >
                <td className="px-5 py-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {lead.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {lead.email}
                    </p>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <p className="text-sm text-slate-700">
                    {lead.company}
                  </p>

                  {lead.jobTitle && (
                    <p className="mt-1 text-xs text-slate-400">
                      {lead.jobTitle}
                    </p>
                  )}
                </td>

                <td className="px-5 py-4">
                  <StatusBadge
                    status={lead.status}
                  />
                </td>

                <td className="px-5 py-4">
                  <PriorityBadge
                    priority={
                      lead.priority
                    }
                  />
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {lead.assignedTo}
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {lead.source}
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      title="View Lead"
                      onClick={() =>
                        navigate(
                          `/leads/${lead.id}`
                        )
                      }
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Eye size={17} />
                    </button>

                    <button
                      type="button"
                      title="Edit Lead"
                      onClick={() =>
                        navigate(
                          `/leads/${lead.id}/edit`
                        )
                      }
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-amber-50 hover:text-amber-600"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      type="button"
                      title="Delete Lead"
                      onClick={() =>
                        onDelete(lead)
                      }
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={17} />
                    </button>

                    <button
                      type="button"
                      className="rounded-lg p-2 text-slate-400"
                    >
                      <MoreHorizontal
                        size={17}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadTable;