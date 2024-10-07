import { axios } from "@app/helper/axios";
import { dashboardConstants } from "./dashboardConstants";

const dashboardApis = {};

dashboardApis.fetchDashboardStats = () => {
  return axios.get(dashboardConstants.DASHBOARD_STATS_API);
};

dashboardApis.fetchUserStats = () => {
  return axios.get(dashboardConstants.DASHBOARD_USERS_STATS_API,{ params: {year: new Date().getFullYear()}});
};

dashboardApis.fetchJobStats = () => {
  return axios.get(dashboardConstants.DASHBOARD_JOBS_STATS_API,{ params: {year: new Date().getFullYear()}});
};

export { dashboardApis };
