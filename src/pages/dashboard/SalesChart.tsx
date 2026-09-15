import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { SalesData } from "../../types/dashboardTypes";

interface SalesChartProps {
  data: SalesData[];
}

const SalesChart = ({ data }: SalesChartProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h2 className="font-semibold text-slate-900">
          Sales Overview
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Leads and deals performance
        </p>
      </div>

      <div className="mt-6 h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="leads"
              stroke="#2563eb"
              strokeWidth={3}
              dot={false}
              name="Leads"
            />

            <Line
              type="monotone"
              dataKey="deals"
              stroke="#10b981"
              strokeWidth={3}
              dot={false}
              name="Deals"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;