import {
  dashboardStats,
  dealStatusData,
  pipelineData,
  recentActivities,
  salesData,
  upcomingFollowUps,
} from "../data/dashboard";

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export const dashboardService = {
  async getDashboardData() {
    await delay(600);

    return {
      stats: dashboardStats,
      sales: salesData,
      dealStatus: dealStatusData,
      pipeline: pipelineData,
      activities: recentActivities,
      followUps: upcomingFollowUps,
    };
  },
};