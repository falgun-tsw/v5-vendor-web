import { put, takeLatest, call } from "@redux-saga/core/effects";
import { reportConstants } from "./reportConstants";
import { reportApis } from "./reportApis";
import { reportParsers } from "./reportParsers";

function* fetchEarningStatsSaga({ type, payload }) {
  try {
    yield put({ type: reportConstants.EARNINGS_STATS_REQUEST });
    const res = yield call(reportApis.getEarningStats, payload);
    const parsedPayload = reportParsers.getEarningStats(res);
    yield put({
      type: reportConstants.EARNINGS_STATS_RESPONSE,
      payload: parsedPayload,
    });
  } catch (e) {
    yield put({
      type: reportConstants.EARNINGS_STATS_RESPONSE,
      payload: [],
    });
  }
}

export function* registerReportSagas() {
  yield takeLatest(reportConstants.REPORTS_EARNINGS_STATS_SAGA, fetchEarningStatsSaga);
}
