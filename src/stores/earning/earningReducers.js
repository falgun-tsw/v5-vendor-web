import { earningConstants } from "./earningConstants";

const initialState = {
  jobEarningsList: [],
  jobEarningsListCount: 0,
  earningStats: {},
  loading: {
    jobEarning: 0,
  },
};

export const earningReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case earningConstants.EARNINGS_REQUEST:
      return {
        ...state,
        loading: {
          jobEarning: 1,
        },
      };

    case earningConstants.EARNINGS_RESPONSE:
      return {
        ...state,
        loading: {
          jobEarning: 0,
        },
        jobEarningsList: payload.data,
        jobEarningsListCount: payload.earningsListCount
      };

    case earningConstants.STATS_EARNINGS_REQUEST:
      return {
        ...state,
        loading: {
          jobEarning: 1,
        },
      };

    case earningConstants.STATS_EARNINGS_RESPONSE:
      return {
        ...state,
        loading: {
          jobEarning: 0,
        },
        earningStats: payload,
      };
    default:
      return state;
  }
};
