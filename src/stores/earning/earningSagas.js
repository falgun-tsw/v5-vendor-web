import { earningApis } from "./earningApis";
import { earningParsers } from "./earningParsers";
import { earningConstants } from "./earningConstants";
import { put, takeLatest, call } from "@redux-saga/core/effects";

function* fetchEarningsSaga({ payload }) {
  try {
    yield put({ type: earningConstants.EARNINGS_REQUEST });
    const res = yield call(earningApis.earningsList,payload);
    const parsedRes = earningParsers.earningsList(res);
    yield put({
      type: earningConstants.EARNINGS_RESPONSE,
      payload: parsedRes,
    });
  } catch (e) {
    yield put({
      type: earningConstants.EARNINGS_RESPONSE,
      payload: {},
    });
  }
}

function* fetchEarningsStatsSaga() {
  try {
    yield put({ type: earningConstants.STATS_EARNINGS_REQUEST });
    const res = yield call(earningApis.getEarningStats);
    const payload = earningParsers.getEarningStats(res);
    yield put({
      type: earningConstants.STATS_EARNINGS_RESPONSE,
      payload,
    });
  } catch (e) {
    yield put({
      type: earningConstants.STATS_EARNINGS_RESPONSE,
      payload: {},
    });
  }
}

export function* registerEarningSagas() {
  yield takeLatest(earningConstants.EARNINGS_SAGA, fetchEarningsSaga);
  yield takeLatest(
    earningConstants.STATS_EARNINGS_SAGA,
    fetchEarningsStatsSaga
  );
}
