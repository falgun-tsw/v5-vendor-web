import { reportConstants } from "./reportConstants";

const reportActions = {};

reportActions.getEarningsStats = (payload) => {
  return { type: reportConstants.REPORTS_EARNINGS_STATS_SAGA, payload };
};

export { reportActions };
