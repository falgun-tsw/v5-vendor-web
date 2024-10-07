import { appliedjobConstants } from "./appliedjobConstants";

const initialState = {
  appliedJobsList: [],
  appliedJobsListCount: 0,
  appliedJobDetails: {},
  loading: {
    appliedJob: 0,
    appliedJobDetails: 0,
  },
};

export const appliedjobReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case appliedjobConstants.APPLIED_JOBS_REQUEST:
      return {
        ...state,
        loading: {
          appliedJob: 1,
        },
      };

    case appliedjobConstants.APPLIED_JOBS_RESPONSE:
      return {
        ...state,
        loading: {
          appliedJob: 0,
        },
        appliedJobsList: payload.data,
        appliedJobsListCount: payload.appliedJobsListCount
      };

    case appliedjobConstants.APPLIED_JOBS_DETAILS_REQUEST:
      return {
        ...state,
        loading: {
          appliedJobDetails: 1,
        },
      };

    case appliedjobConstants.APPLIED_JOBS_DETAILS_RESPONSE:
      return {
        ...state,
        loading: {
          appliedJobDetails: 0,
        },
        appliedJobDetails: payload,
      };

    default:
      return state;
  }
};
