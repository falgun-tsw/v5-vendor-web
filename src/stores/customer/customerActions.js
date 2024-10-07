import { customerConstants } from "./customerConstants";
const customerActions = {};
customerActions.logout = () => ({
  type: customerConstants.LOGOUT_SAGA,
});

customerActions.updateAuthData = (payload) => ({
  type: customerConstants.LOGIN_DATA,
  payload,
});

customerActions.getProfile = () => ({
  type: customerConstants.PROFILE_SAGA,
});

export { customerActions };
