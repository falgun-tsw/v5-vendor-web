import { manageVendorUserConstants } from "./userManagementConstants";

const initialState = {
  vendorUsersList: [],
  vendorUsersListCountCount: 0,
  vendorUserDetails: {},
  vendorUserCreds: {},
  loading: {
    user: 0,
    userDetails: 0,
    vendorUserCreds: 0,
  },
};

export const userManagementReducers = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case manageVendorUserConstants.FETCH_VENDOR_USER_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          user: 1,
        },
      };

    case manageVendorUserConstants.FETCH_VENDOR_USER_RESPONSE:
      return {
        ...state,
        loading: {
          ...state.loading,
          user: 0,
        },
        vendorUsersList: payload.data,
        vendorUsersListCountCount: payload.vendorUsersListCountCount
      };

    case manageVendorUserConstants.FETCH_VENDOR_USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          userDetails: 1,
        },
      };

    case manageVendorUserConstants.FETCH_VENDOR_USER_DETAILS_RESPONSE:
      return {
        ...state,
        loading: {
          ...state.loading,
          userDetails: 0,
        },
        vendorUserDetails: payload,
      };

    case manageVendorUserConstants.FETCH_VENDOR_USER_CREDS_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          vendorUserCreds: 1,
        },
      };

    case manageVendorUserConstants.FETCH_VENDOR_USER_CREDS_RESPONSE:
      return {
        ...state,
        loading: {
          ...state.loading,
          vendorUserCreds: 0,
        },
        vendorUserCreds: payload,
      };

    default:
      return state;
  }
};
