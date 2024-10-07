import { myWorkApis } from "./myworkApis";
import { myWorkParsers } from "./myworkParsers";
import { myWorkConstants } from "./myworkConstants";
import { put, takeLatest, call } from "@redux-saga/core/effects";

function* fetchMyWorkListSaga({payload}) {
  try {
    yield put({ type: myWorkConstants.MY_WORK_REQUEST });
    const res = yield call(myWorkApis.getMyWorkList,payload);
    const parsedRes = myWorkParsers.parseMyWorksList(res);
    yield put({
      type: myWorkConstants.MY_WORK_RESPONSE,
      payload: parsedRes,
    });
  } catch (e) {
    yield put({
      type: myWorkConstants.MY_WORK_RESPONSE,
      payload: {},
    });
  }
}

function* fetchMyWorkDetailsSaga({ type, payload: jobId }) {
  try {
    yield put({ type: myWorkConstants.MY_WORK_DETAILS_REQUEST });
    const res = yield call(myWorkApis.getMyWorkDetails, jobId);
    const parsedRes = myWorkParsers.parseMyWorkDetails(res);
    yield put({
      type: myWorkConstants.MY_WORK_DETAILS_RESPONSE,
      payload: parsedRes,
    });
  } catch (e) {
    yield put({ type: myWorkConstants.MY_WORK_DETAILS_RESPONSE, payload: {} });
  }
}

function* fetchScreenBuilderModulesSaga({ type, payload: clientId }) {
  try {
    yield put({ type: myWorkConstants.SCREEN_BUILDER_MODULES_REQUEST });
    const res = yield call(myWorkApis.getScreenBuilderModules, clientId);
    const parsedRes = myWorkParsers.parseScreenBuilderModules(res);
    yield put({
      type: myWorkConstants.SCREEN_BUILDER_MODULES_RESPONSE,
      payload: parsedRes,
    });
  } catch (e) {
    yield put({
      type: myWorkConstants.SCREEN_BUILDER_MODULES_RESPONSE,
      payload: [],
    });
  }
}

export function* registerMyWorkSagas() {
  yield takeLatest(myWorkConstants.MY_WORK_SAGA, fetchMyWorkListSaga);
  yield takeLatest(
    myWorkConstants.MY_WORK_DETAILS_SAGA,
    fetchMyWorkDetailsSaga
  );
  yield takeLatest(
    myWorkConstants.SCREEN_BUILDER_MODULES_SAGA,
    fetchScreenBuilderModulesSaga
  );
}
