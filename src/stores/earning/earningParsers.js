import _get from "lodash.get";

const earningParsers = {};

earningParsers.earningsList = (res) => {
  const earningsListCount = _get(res,"totalElements",0);
  if (res && res.content) {
    res = res.content;
  }

  if (!res) {
    return [];
  }

  const data = res.map((item, index) => ({
    id: _get(item, "id", ""),
    jobId: _get(item, "jobId", ""),
    jobRefNo: _get(item, "jobRefNo", ""),
    jobTitle: _get(item, "jobTitle", ""),
    jobStatus: _get(item, "jobStatus", ""),
    amountStatus: _get(item, "amountStatus", ""),
    amountPaid: _get(item, "amountPaid", ""),
    jobRating: _get(item, "jobRating", ""),
    jobStatusRemark: _get(item, "jobStatusRemark", ""),
    totalEarned: _get(item, "totalEarned", ""),
    totalHoursWorked: _get(item, "totalHoursWorked", ""),
    createdAt: _get(item, "createdAt", ""),
  }));

  return {data,earningsListCount};
};

earningParsers.getEarningStats = (res) => {
  if (res && res.response) {
    res = res.response;
  }

  if (!res) {
    return {};
  }

  return {
    totalHoursWorked: _get(res, "totalHoursWorked", 0),
    totalMoneyEarned: _get(res, "totalMoneyEarned", 0),
    totalProjectWorked: _get(res, "totalProjectWorked", 0),
    lastProjectEarning: _get(res, "lastProjectEarning", 0),
  };
};

export { earningParsers };
