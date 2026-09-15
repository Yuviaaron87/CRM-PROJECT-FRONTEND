import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import type { DealStatusData } from "../../types/dashboardTypes";

interface DealStatusChartProps {
  data: DealStatusData[];
}

const COLORS = [
  "#10b981",
  "#2563eb",
  "#ef4444",
];

const DealStatusChart = ({
  data,
}: DealStatusChartProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="font-semibold text-slate-900">
        Deal Status
      </h2>

      <p className="mt-1 text-xs text-slate-500">
        Current deal distribution
      </p>

      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((item, index) => (
                <Cell
                  key={item.name}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor:
                    COLORS[index % COLORS.length],
                }}
              />

              <span className="text-sm text-slate-600">
                {item.name}
              </span>
            </div>

            <span className="text-sm font-semibold text-slate-800">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealStatusChart;