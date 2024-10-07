import { dashboardConstants } from "./dashboardConstants";
const dashboardActions = {};

dashboardActions.fetchDashboardStats = () => ({
  type: dashboardConstants.DASHBOARD_STATS_SAGA,
});

dashboardActions.fetchUserStats = () => ({
  type: dashboardConstants.DASHBOARD_USERS_STATS_SAGA,
});

dashboardActions.fetchJobStats = () => ({
  type: dashboardConstants.DASHBOARD_JOBS_STATS_SAGA,
});

export { dashboardActions };
