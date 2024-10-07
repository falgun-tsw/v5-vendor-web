import { customerConstants } from "./customerConstants";
import persistReducer from "redux-persist/lib/persistReducer";
import storage from "redux-persist/lib/storage";
const initialState = {
  isAuthenticated: false,
  loginProfile: {},
  profile: {},
  loading: {
    profile: 0,
  },
};

export const customerReducers = persistReducer(
  {
    storage,
    key: "customer",
    whitelist: ["isAuthenticated", "loginProfile"],
  },
  (state = initialState, { type, payload }) => {
    switch (type) {
      case customerConstants.LOGIN_DATA: {
        return {
          ...state,
          isAuthenticated: true,
          loginProfile: { ...payload },
        };
      }
      case customerConstants.RESET_AUTH_DATA: {
        return {
          ...initialState,
          isAuthenticated: false,
        };
      }
      case customerConstants.PROFILE_REQUEST: {
        return {
          ...state,
          loading: {
            ...state.loading,
            profile: 1,
          },
        };
      }

      case customerConstants.PROFILE_RESPONSE: {
        return {
          ...state,
          loading: {
            ...state.loading,
            profile: 0,
          },
          profile: payload,
        };
      }
      case customerConstants.RESET_PROFILE_DATA: {
        return {
          ...initialState,
          loginProfile: initialState.loginProfile,
          profile: initialState.profile
        };
      }
      case customerConstants.UPDATE_PROFILE_DATA: {
        return {
          ...state,
          profile: {
            ...state.profile,
            fullName: payload.fullName,
            alternateNo: payload.alternateNo,
            profilePic: payload.profilePic,
          },
        };
      }
      
      default:
        return state;
    }
  }
);
