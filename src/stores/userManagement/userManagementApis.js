import { axios } from "../../helper/axios";
import { manageVendorUserConstants } from "./userManagementConstants";

const manageVendorUserApi = {};

manageVendorUserApi.fetchVendorUser = async (payload = {}) => {
  const searchParams = {};
  if (Object.keys(payload).length) {
    Object.keys(payload).forEach((item) => {
      if (![null, undefined, ""].includes(payload[item])) {
        searchParams[item] = payload[item];
      }
    });
  }
  const res = await axios.get(manageVendorUserConstants.FETCH_VENDOR_USER_API, {
    params: searchParams,
  });
  return res;
};

manageVendorUserApi.fetchVendorUserDetails = async (id) => {
  const url = manageVendorUserConstants.FETCH_VENDOR_USER_DETAILS_API.replace(
    "id",
    id
  );
  const res = await axios.get(url);
  return res;
};

manageVendorUserApi.addVendorUser = async (payload) => {
  const res = await axios.post(
    manageVendorUserConstants.ADD_VENDOR_USER_API,
    payload
  );
  return res;
};

manageVendorUserApi.editVendorUser = async (id, payload) => {
  const url = manageVendorUserConstants.EDIT_VENDOR_USER_API.replace("id", id);
  const res = await axios.put(url, payload);
  return res;
};

manageVendorUserApi.deactivateVendorUser = (id) => {
  const url = manageVendorUserConstants.DEACTIVATE_VENDOR_USER_API.replace(
    "id",
    id
  );
  return axios.put(url);
};

manageVendorUserApi.activateVendorUser = (id) => {
  const url = manageVendorUserConstants.ACTIVATE_VENDOR_USER_API.replace(
    "id",
    id
  );
  return axios.put(url);
};

manageVendorUserApi.fetchVendorUserCreds = (id) => {
  const url = manageVendorUserConstants.FETCH_VENDOR_USER_CREDS_API.replace(
    "id",
    id
  );
  return axios.get(url);
};

export { manageVendorUserApi };
