import { earningConstants } from "./earningConstants";
const earningActions = {};

earningActions.getEarningsList = (payload) => {
  return {
    type: earningConstants.EARNINGS_SAGA,
    payload
  };
};

earningActions.getEarningsStats = () => {
  return {
    type: earningConstants.STATS_EARNINGS_SAGA,
  };
};
export { earningActions };
