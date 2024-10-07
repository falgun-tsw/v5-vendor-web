import persistReducer from "redux-persist/lib/persistReducer";
import storage from "redux-persist/lib/storage";
import { config } from "../../config";
import { commonConstants } from "./commonConstants";

const configRes = config();

const initialState = {
  toast: {
    timeout: configRes.toastTimeout,
    open: false,
    message: "",
  },
  blogs: [],
  loading: {
    globalLoader: 0,
    blogs: 0,
  },
  initialCalled: {
    globalLoader: 0,
    blogs: 0,
  },
};

export const commonReducers = persistReducer(
  {
    storage,
    key: "common",
    whitelist: [],
  },
  (state = initialState, { type, payload }) => {
    switch (type) {
      case commonConstants.GLOBAL_SET_TOAST_DATA: {
        if (payload.message) {
          return {
            ...state,
            toast: {
              open: true,
              message: payload.message,
              timeout: payload.timeout || state.toast.timeout,
            },
          };
        } else {
          return {
            ...state,
            toast: initialState.toast,
          };
        }
      }

      case commonConstants.GLOBAL_RESET_TOAST_DATA: {
        return {
          ...state,
          toast: initialState.toast,
        };
      }

      case commonConstants.GLOBAL_LOADER_DATA: {
        return {
          ...state,
          loading: {
            ...state.loading,
            globalLoader: payload,
          },
        };
      }

      default:
        return state;
    }
  }
);
