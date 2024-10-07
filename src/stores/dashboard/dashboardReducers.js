import { dashboardConstants } from "./dashboardConstants";

const initialState = {
  dashboardStats: {},
  userStats: [],
  jobStats: [],
  loading: {
    dashboardStats: 0,
    userStats: 0,
    jobStats: 0,
  },
};

export const dashboardReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case dashboardConstants.DASHBOARD_STATS_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, dashboardStats: 1 },
      };

    case dashboardConstants.DASHBOARD_STATS_RESPONSE:
      return {
        ...state,
        loading: { ...state.loading, dashboardStats: 0 },
        dashboardStats: payload,
      };

    case dashboardConstants.DASHBOARD_USERS_STATS_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          userStats: 1,
        },
      };

    case dashboardConstants.DASHBOARD_USERS_STATS_RESPONSE:
      return {
        ...state,
        loading: {
          ...state.loading,
          userStats: 0,
        },
        userStats: payload,
      };

    case dashboardConstants.DASHBOARD_JOBS_STATS_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          jobStats: 1,
        },
      };

    case dashboardConstants.DASHBOARD_JOBS_STATS_RESPONSE:
      return {
        ...state,
        loading: {
          ...state.loading,
          jobStats: 0,
        },
        jobStats: payload,
      };

    default:
      return state;
  }
};
