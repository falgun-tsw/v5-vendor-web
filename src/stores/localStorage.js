import { config } from "../config";
import { localStorageHelper } from "@app/helper/localStorage";

const localStore = {};
const res = config();

localStore.setToken = (v) =>
  localStorageHelper.set(res.localStorageKeys.tokenKey, v);
localStore.getToken = () =>
  localStorageHelper.get(res.localStorageKeys.tokenKey);
localStore.resetToken = () =>
  localStorageHelper.remove(res.localStorageKeys.tokenKey);

export { localStore };
