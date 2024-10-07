import { put, takeLatest, call } from "@redux-saga/core/effects";
import { appliedjobConstants } from "./appliedjobConstants";
import { appliedjobApis } from "./appliedjobApis";
import { appliedjobParsers } from "./appliedjobParsers";

function* fetchAppliedJobsListSaga({ payload }) {
  try {
    yield put({ type: appliedjobConstants.APPLIED_JOBS_REQUEST });
    const res = yield call(appliedjobApis.getAppliedJobs,payload);
    const parsedRes = appliedjobParsers.parseAppliedJobsList(res);
    yield put({ type: appliedjobConstants.APPLIED_JOBS_RESPONSE, payload: parsedRes });
  } catch (e) {
    yield put({ type: appliedjobConstants.APPLIED_JOBS_RESPONSE, payload: {} });
  }
}

function* fetchAppliedJobDetailsSaga({ type, payload }) {
  try {
    yield put({ type: appliedjobConstants.APPLIED_JOBS_DETAILS_REQUEST });
    const res = yield call(appliedjobApis.getAppliedJobsDeatils, payload);
    const parsedRes = appliedjobParsers.parseAppliedJobsDetails(res);
    yield put({
      type: appliedjobConstants.APPLIED_JOBS_DETAILS_RESPONSE,
      payload: parsedRes,
    });
  } catch (e) {
    yield put({
      type: appliedjobConstants.APPLIED_JOBS_DETAILS_RESPONSE,
      payload: {},
    });
  }
}

export function* registerAppliedJobSagas() {
  yield takeLatest(appliedjobConstants.APPLIED_JOBS_SAGA, fetchAppliedJobsListSaga);
  yield takeLatest(
    appliedjobConstants.APPLIED_JOBS_DETAILS_SAGA,
    fetchAppliedJobDetailsSaga
  );
}
