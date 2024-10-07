import { jobManagementConstants } from './jobManagementConstants';

const initialState = {
  vendorJobsList: [],
  totalJobCount: 0,
  jobSkillsList: [],
  jobSkillsCategoriesList: [],
  jobDetails: {},
  loading: {
    job: 0,
    jobSkills: 0,
    jobSkillsCategories: 0,
    jobdetail: 0,
  },
};

export const jobManagementReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case jobManagementConstants.VENDER_JOB_LIST_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          job: 1,
        },
      };

    case jobManagementConstants.VENDER_JOB_LIST_RESPONSE:
      const { data,totalJobCount } = payload;
      return {
        ...state,
        loading: {
          ...state.loading,
          job: 0,
        },
        vendorJobsList: data,
        totalJobCount: totalJobCount
      };

    case jobManagementConstants.SKILLS_LIST_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          jobSkills: 1,
        },
      };

    case jobManagementConstants.SKILLS_LIST_RESPONSE:
      return {
        ...state,
        loading: {
          ...state.loading,
          jobSkills: 0,
        },
        jobSkillsList: payload,
      };

    case jobManagementConstants.SKILLS_CATEGORIES_LIST_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          jobSkillsCategories: 1,
        },
      };

    case jobManagementConstants.SKILLS_CATEGORIES_LIST_RESPONSE:
      return {
        ...state,
        loading: {
          ...state.loading,
          jobSkillsCategories: 0,
        },
        jobSkillsCategoriesList: payload,
      };

      case jobManagementConstants.JOB_DESCRIPTION_REQUEST:
        return {
          ...state,
          loading: {
            ...state.loading,
            jobdetail: 1,
          },
        };
  
      case jobManagementConstants.JOB_DESCRIPTION_RESPONSE: {
        return {
          ...state,
          loading: {
            ...state.loading,
            jobdetail: 0,
          },
          jobDetails: payload,
        };
      }

    default:
      return state;
  }
};
