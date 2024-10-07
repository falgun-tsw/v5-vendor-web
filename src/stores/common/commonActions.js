import { commonConstants } from "./commonConstants";
const commonActions = {};

commonActions.setToast = (payload) => ({
  type: commonConstants.GLOBAL_SET_TOAST_DATA,
  payload,
});

commonActions.resetToast = () => ({
  type: commonConstants.GLOBAL_RESET_TOAST_DATA,
});

commonActions.updateLoader = (loading) => ({
  type: commonConstants.GLOBAL_LOADER_DATA,
  payload: loading,
});

export { commonActions };
