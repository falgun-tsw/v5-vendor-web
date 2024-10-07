import _get from "lodash.get";

const dashboardParsers = {};

dashboardParsers.parseDashboardStats = (res) => {
  if (res.response) {
    res = res.response;
  }
  if (!res) {
    return {};
  }

  const data = {
    totalJobs: _get(res, "totalJobs", 0),
    totalUsers: _get(res, "totalUsers", 0),
    totalCompletedJobs: _get(res, "totalCompletedJobs", 0),
    totalJobsInprogress: _get(res, "totalJobsInprogress", 0),
    activeUsers: _get(res, "activeUsers", 0),
    inActiveUsers: _get(res, "inActiveUsers", 0),
  };

  return data;
};

dashboardParsers.parseChartStats = (res) => {
  if (res && res.response) {
    res = res.response;
  }

  if (!res) {
    return [];
  }

  return res.map((item, i) => {
    return {
      count: _get(item, "count", null),
      month: _get(item, "month", ""),
    };
  });
}

export { dashboardParsers };
