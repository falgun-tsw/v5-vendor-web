import { myWorkConstants } from "./myworkConstants";

const myWorkActions = {};

myWorkActions.getMyWorkList = (payload) => {
  return { type: myWorkConstants.MY_WORK_SAGA, payload };
};

myWorkActions.getMyWorkDetails = (id) => {
  return { type: myWorkConstants.MY_WORK_DETAILS_SAGA, payload: id };
};

myWorkActions.toggleAssignJobModle = () => {
  return { type: myWorkConstants.TOGGLE_ASSIGN_JOB_MODAL };
};

myWorkActions.getScreenBuilderModules = (id) => {
  return { type: myWorkConstants.SCREEN_BUILDER_MODULES_SAGA, payload: id };
};

myWorkActions.setActiveJobId = (jobId) => {
  return { type: myWorkConstants.SET_ACTIVE_JOB_ID, payload: jobId };
};

export { myWorkActions };
