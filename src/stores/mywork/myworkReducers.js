import persistReducer from "redux-persist/lib/persistReducer";
import storage from "redux-persist/lib/storage";
import { myWorkConstants } from "./myworkConstants";

const initialState = {
  myworkList: [],
  workListCount: 0,
  workDetails: {},
  loading: {
    mywork: 0,
    workdetail: 0,
  },
  showAssignJobModal: 0,
  screenBuilderModules: [],
  activeJobId: "",
};

export const myWorkReducers = persistReducer(
  {
    storage,
    key: "workdetail",
    whitelist: ["activeJobId"],
  },
  (state = initialState, { type, payload }) => {
    switch (type) {
      case myWorkConstants.MY_WORK_REQUEST:
        return {
          ...state,
          loading: {
            mywork: 1,
          },
        };

      case myWorkConstants.MY_WORK_RESPONSE:
        return {
          ...state,
          loading: {
            mywork: 0,
          },
          myworkList: payload.data,
          workListCount: payload.workListCount
        };

      case myWorkConstants.MY_WORK_DETAILS_REQUEST:
        return {
          ...state,
          loading: {
            workdetail: 1,
          },
        };

      case myWorkConstants.MY_WORK_DETAILS_RESPONSE:
        return {
          ...state,
          loading: {
            workdetail: 0,
          },
          workDetails: {
            ...payload,
          },
        };
      case myWorkConstants.TOGGLE_ASSIGN_JOB_MODAL:
        return {
          ...state,
          showAssignJobModal: !state.showAssignJobModal,
        };
      case myWorkConstants.SCREEN_BUILDER_MODULES_REQUEST:
        return {
          ...state,
          screenBuilderModules: payload,
        };
      case myWorkConstants.SCREEN_BUILDER_MODULES_RESPONSE:
        return {
          ...state,
          screenBuilderModules: payload,
        };
      case myWorkConstants.SET_ACTIVE_JOB_ID: {
        return {
          ...state,
          activeJobId: payload,
        };
      }

      default:
        return state;
    }
  }
);
