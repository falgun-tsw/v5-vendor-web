import { reportConstants } from "./reportConstants";

const initialState = {
  earningStats: [],
  loading: {
    report: 0,
  },
};

export const reportReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case reportConstants.EARNINGS_STATS_REQUEST:
      return {
        ...state,
        loading: {
          report: 1,
        },
      };

    case reportConstants.EARNINGS_STATS_RESPONSE:
      return {
        ...state,
        loading: {
          report: 0,
        },
        earningStats: [...payload],
      };

    default:
      return state;
  }
};
