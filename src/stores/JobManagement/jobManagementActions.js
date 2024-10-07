import { jobManagementConstants } from "./jobManagementConstants";

const jobManagementActions = {};

jobManagementActions.getJobsList = (payload) => {
  return {
    type: jobManagementConstants.VENDER_JOB_LIST_SAGA,
    payload,
  };
};

jobManagementActions.getSkillsList = (payload) => {
  return {
    type: jobManagementConstants.SKILLS_LIST_SAGA,
    payload
  };
};

jobManagementActions.getSkillsCategoreyList = () => {
  return {
    type: jobManagementConstants.SKILLS_CATEGORIES_LIST_SAGA,
  };
};

jobManagementActions.getJobDescription = (payload) => {
  return {
    type: jobManagementConstants.JOB_DESCRIPTION_SAGA,
    payload,
  };
};

export { jobManagementActions };
