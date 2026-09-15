import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { ROUTES } from "../../constants/route";
import type { PipelineStageData } from "../../types/dashboardTypes";
import { formatCurrency } from "../../utils/formatCurrency";

interface PipelineSummaryProps {
  data: PipelineStageData[];
}

const PipelineSummary = ({
  data,
}: PipelineSummaryProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <div>
          <h2 className="font-semibold text-slate-900">
            Pipeline Overview
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Deals across sales stages
          </p>
        </div>

        <Link
          to={ROUTES.PIPELINE}
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View Pipeline
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-px bg-slate-100 sm:grid-cols-3 xl:grid-cols-6">
        {data.map((item) => (
          <div
            key={item.stage}
            className="bg-white p-4"
          >
            <p className="text-xs font-medium text-slate-500">
              {item.stage}
            </p>

            <p className="mt-2 text-xl font-bold text-slate-900">
              {item.count}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {formatCurrency(item.value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PipelineSummary;