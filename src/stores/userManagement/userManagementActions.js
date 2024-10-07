import { manageVendorUserConstants } from "./userManagementConstants";

const manageVendorUserActions = {};

manageVendorUserActions.getVendorUser = (payload) => {
  return {
    type: manageVendorUserConstants.FETCH_VENDOR_USER_SAGA,
    payload,
  };
};

manageVendorUserActions.getVendorUserDetails = (id) => {
  return {
    type: manageVendorUserConstants.FETCH_VENDOR_USER_DETAILS_SAGA,
    payload: id,
  };
};

manageVendorUserActions.addVendorUser = (payload) => {
  return {
    type: manageVendorUserConstants.ADD_VENDOR_USER_SAGA,
    payload,
  };
};
manageVendorUserActions.editVendorUser = (payload) => {
  return {
    type: manageVendorUserConstants.EDIT_VENDOR_USER_SAGA,
    payload,
  };
};

manageVendorUserActions.getVendorUserCreds = (id) => {
  return {
    type: manageVendorUserConstants.FETCH_VENDOR_USER_CREDS_SAGA,
    payload: id,
  };
};

export { manageVendorUserActions };
