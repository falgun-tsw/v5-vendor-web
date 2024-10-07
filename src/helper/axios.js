import * as coreAxios from "axios";
import { config } from "@app/config/index";
import { localStore } from "@app/stores/localStorage";
import { customerActions } from "@app/stores/customer/customerActions";

import _get from "lodash.get";

const configRes = config();
// Apis of new server
export const axios = coreAxios.default.create({
  baseURL: configRes.apiUrl,
});

const readRequestDataFromError = (error) => {
  if (error.config.headers["Content-Type"] === "application/json") {
    return JSON.parse(error.config.data);
  }
  return {};
};

export const axiosInterceptor = (dispatch) => {
  axios.interceptors.request.use(async (request) => {
    const authToken = localStore.getToken();

    if (authToken) {
      request["headers"]["Authorization"] = `Bearer ${authToken}`;
    }
    return request;
  });

  //response interceptors
  axios.interceptors.response.use(
    async (response) => {
      if (!response.data) {
        return response;
      }

      return response.data;
    },
    (error) => {
      const { response } = error;
      const errorCode = _get(response, "data.code", "");
      let toastMessage = _get(
        response,
        "data.message",
        "Something went wrong! Please contact support team"
      );
      const avoidToastError = ["JEI012", "JSU017"];

      if (response) {
        const { status, data } = response;
        if (status === 400) {
          toastMessage = data.message;
        } else if (status === 401) {
          toastMessage = "You are not authorized";
          dispatch(customerActions.logout());
        }
      }

      if (
        response &&
        response.status !== 401 &&
        !avoidToastError.includes(errorCode)
      ) {
        alert(toastMessage)
        // dispatch(commonActions.setToast({ message: toastMessage }));
      } else {
        if (errorCode === "JSU017") {
          const { email = "" } = readRequestDataFromError(error);
          // dispatch(customerActions.setDeactiveAccountData({ deactiveAccountEmail: email, deactiveAccountMessage: response.data.message }))
        }
      }

      return Promise.reject(error);
    }
  );
};

export const screenBuilderAxios = coreAxios.default.create({
  baseURL: configRes.screen_builder_api_endpoint,
});

export const screenBuilderAxiosInterceptor = (dispatch) => {
  screenBuilderAxios.interceptors.request.use(async (request) => {
    const authToken = localStore.getToken();

    if (authToken) {
      request["headers"]["Authorization"] = `Bearer ${authToken}`;
    }
    return request;
  });

  //response interceptors
  screenBuilderAxios.interceptors.response.use(
    async (response) => {
      if (!response.data) {
        return response;
      }

      return response.data;
    },
    (error) => {
      const { response } = error;
      const errorCode = _get(response, "data.code", "");
      let toastMessage = _get(
        response,
        "data.message",
        "Something went wrong! Please contact support team"
      );
      const avoidToastError = ["JEI012", "JSU017"];

      if (response) {
        const { status, data } = response;
        if (status === 400) {
          toastMessage = data.message;
        } else if (status === 401) {
          toastMessage = "You are not authorized";
          dispatch(customerActions.logout());
        }
      }

      if (
        response &&
        response.status !== 401 &&
        !avoidToastError.includes(errorCode)
      ) {
        alert(toastMessage)
        // dispatch(commonActions.setToast({ message: toastMessage }));
      } else {
        if (errorCode === "JSU017") {
          const { email = "" } = readRequestDataFromError(error);
          // dispatch(customerActions.setDeactiveAccountData({ deactiveAccountEmail: email, deactiveAccountMessage: response.data.message }))
        }
      }

      return Promise.reject(error);
    }
  );
};