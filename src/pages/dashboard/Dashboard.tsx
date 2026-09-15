import { useCallback, useEffect, useState } from "react";
import {
  ContactRound,
  Handshake,
  ListTodo,
  Plus,
  Users,
} from "lucide-react";
import { Link } from "react-router";

import StatCard from "../../pages/dashboard/StatCard";
import SalesChart from "../../pages/dashboard/SalesChart";
import DealStatusChart from "../../pages/dashboard/DealStatusChart";
import PipelineSummary from "../../pages/dashboard/PipelineSummary";
import RecentLeads from "../../pages/dashboard/RecentLeads";
import UpcomingFollowUps from "../../pages/dashboard/UpcomingFollowUps";
import RecentActivity from "../../pages/dashboard/RecentActivity";

import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorState from "../../components/ErrorState";

import { ROUTES } from "../../constants/route";
import { mockLeads } from "../../data/leads";
import { dashboardService } from "../../services/dashboardService";

import type {
  DashboardActivity,
  DashboardStat,
  DealStatusData,
  FollowUp,
  PipelineStageData,
  SalesData,
} from "../../types/dashboardTypes";

interface DashboardData {
  stats: DashboardStat[];
  sales: SalesData[];
  dealStatus: DealStatusData[];
  pipeline: PipelineStageData[];
  activities: DashboardActivity[];
  followUps: FollowUp[];
}

const Dashboard = () => {
  const [data, setData] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] =
    useState<boolean>(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response =
        await dashboardService.getDashboardData();

      setData(response);
    } catch {
      setError(
        "We couldn't load your CRM dashboard. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  if (loading) {
    return (
      <LoadingSpinner text="Loading CRM dashboard..." />
    );
  }

  if (error || !data) {
    return (
      <ErrorState
        message={error ?? "Dashboard data unavailable."}
        onRetry={loadDashboard}
      />
    );
  }

  const icons = [
    Users,
    ContactRound,
    Handshake,
    ListTodo,
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Here's what's happening with your CRM today.
          </p>
        </div>

        <Link
          to={ROUTES.ADD_LEAD}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={17} />
          Add Lead
        </Link>
      </div>

      {/* KPI Cards */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.stats.map((stat, index) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            icon={icons[index]}
          />
        ))}
      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <SalesChart data={data.sales} />
        </div>

        <DealStatusChart
          data={data.dealStatus}
        />
      </div>

      {/* Pipeline */}

      <PipelineSummary
        data={data.pipeline}
      />

      {/* Leads + Follow Ups */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentLeads
            leads={mockLeads.slice(0, 5)}
          />
        </div>

        <UpcomingFollowUps
          followUps={data.followUps}
        />
      </div>

      {/* Activity */}

      <RecentActivity
        activities={data.activities}
      />
    </div>
  );
};

export default Dashboard;