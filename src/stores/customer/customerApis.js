import { customerConstants } from "./customerConstants";
import { axios } from "@app/helper/axios";

const customerApis = {};
customerApis.profile = async () => {
  return axios.get(customerConstants.PROFILE_API);
};

customerApis.login = ({ userName, userPassword }) => {
  const payload = {
    userName,
    password: userPassword,
    userType: "VENDOR",
  };
  return axios.post(customerConstants.LOGIN_API, payload);
};

customerApis.changePassword = ({ currentPassword, newPassword }) => {
  const payload = {
    oldPassword: currentPassword,
    newPassword: newPassword,
  };
  return axios.post(customerConstants.CHANGE_PASSWORD_API, payload);
};

customerApis.editProfile = (payload) => {
  return axios.put(customerConstants.EDIT_PROFILE_API, payload);
};

export { customerApis };
