import { manageVendorUserConstants } from "./userManagementConstants";
import { manageVendorUserApi } from "./userManagementApis";
import { manageVendorUserParser } from "./userManagementParsers";
import { put, takeLatest, call } from "@redux-saga/core/effects";

function* fetchVendorUserSaga({ type, payload }) {
  try {
    yield put({ type: manageVendorUserConstants.FETCH_VENDOR_USER_REQUEST });
    const res = yield call(manageVendorUserApi.fetchVendorUser, payload);
    const parsedRes = manageVendorUserParser.parseVendorUserList(res);
    yield put({
      type: manageVendorUserConstants.FETCH_VENDOR_USER_RESPONSE,
      payload: parsedRes,
    });
  } catch (e) {
    yield put({
      type: manageVendorUserConstants.FETCH_VENDOR_USER_RESPONSE,
      payload: {},
    });
  }
}

function* fetchVendorUserDetailsSaga({ type, payload: id }) {
  try {
    yield put({
      type: manageVendorUserConstants.FETCH_VENDOR_USER_DETAILS_REQUEST,
    });
    const res = yield call(manageVendorUserApi.fetchVendorUserDetails, id);
    const parsedRes = manageVendorUserParser.parseVendorUserDetails(res);
    yield put({
      type: manageVendorUserConstants.FETCH_VENDOR_USER_DETAILS_RESPONSE,
      payload: parsedRes,
    });
  } catch (e) {
    yield put({
      type: manageVendorUserConstants.FETCH_VENDOR_USER_DETAILS_RESPONSE,
      payload: {},
    });
  }
}

function* fetchVendorUserCredsSaga({ type, payload: id }) {
  try {
    yield put({
      type: manageVendorUserConstants.FETCH_VENDOR_USER_CREDS_REQUEST,
    });
    const res = yield call(manageVendorUserApi.fetchVendorUserCreds, id);
    const parsedRes = manageVendorUserParser.parseVendorUserCreds(res);
    yield put({
      type: manageVendorUserConstants.FETCH_VENDOR_USER_CREDS_RESPONSE,
      payload: parsedRes,
    });
  } catch (e) {
    yield put({
      type: manageVendorUserConstants.FETCH_VENDOR_USER_CREDS_RESPONSE,
      payload: {},
    });
  }
}

export function* registerUserManagementSagas() {
  yield takeLatest(
    manageVendorUserConstants.FETCH_VENDOR_USER_SAGA,
    fetchVendorUserSaga
  );
  yield takeLatest(
    manageVendorUserConstants.FETCH_VENDOR_USER_DETAILS_SAGA,
    fetchVendorUserDetailsSaga
  );
  yield takeLatest(
    manageVendorUserConstants.FETCH_VENDOR_USER_CREDS_SAGA,
    fetchVendorUserCredsSaga
  );
}
