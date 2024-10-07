import { customerConstants } from "./customerConstants";
import { customerApis } from "./customerApis";
import { customerParsers } from "./customerParsers";
import { put, takeLatest, call } from "@redux-saga/core/effects";
import { localStore } from "../localStorage";

function* logoutSaga() {
  localStore.resetToken();
  localStorage.clear();
  yield put({ type: customerConstants.RESET_AUTH_DATA });
  yield put({ type: customerConstants.RESET_PROFILE_DATA });
}

function* profileSaga() {
  try {
    yield put({ type: customerConstants.PROFILE_REQUEST });
    const res = yield call(customerApis.profile);
    const payload = customerParsers.profile(res);
    yield put({
      type: customerConstants.PROFILE_RESPONSE,
      payload,
    });
  } catch (e) {
    yield put({
      type: customerConstants.PROFILE_RESPONSE,
      payload: {},
    });
  }
}

export function* registerCustomerSagas() {
  yield takeLatest(customerConstants.PROFILE_SAGA, profileSaga);
  yield takeLatest(customerConstants.LOGOUT_SAGA, logoutSaga);
}
