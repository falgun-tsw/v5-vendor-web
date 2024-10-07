import { dashboardConstants } from "./dashboardConstants";
import { dashboardApis } from "./dashboardApis";
import { dashboardParsers } from "./dashboardParsers";
import { put, takeLatest, call } from "@redux-saga/core/effects";

function* fetchDashboardStats({ type }) {
  try {
    yield put({ type: dashboardConstants.DASHBOARD_STATS_REQUEST });
    const res = yield call(dashboardApis.fetchDashboardStats);
    const payload = dashboardParsers.parseDashboardStats(res);
    yield put({ type: dashboardConstants.DASHBOARD_STATS_RESPONSE, payload });
  } catch (e) {
    console.log(`Saga failed with ${type} ==> ${e}`);
    yield put({
      type: dashboardConstants.DASHBOARD_STATS_RESPONSE,
      payload: {},
    });
  }
}

function* fetchUserStats({ type }) {
  try {
    yield put({ type: dashboardConstants.DASHBOARD_USERS_STATS_REQUEST });
    const res = yield call(dashboardApis.fetchUserStats);
    const payload = dashboardParsers.parseChartStats(res);
    yield put({
      type: dashboardConstants.DASHBOARD_USERS_STATS_RESPONSE,
      payload,
    });
  } catch (e) {
    console.log(`Saga failed with ${type} ==> ${e}`);
    yield put({
      type: dashboardConstants.DASHBOARD_USERS_STATS_RESPONSE,
      payload: [],
    });
  }
}

function* fetchJobStats({ type }) {
  try {
    yield put({ type: dashboardConstants.DASHBOARD_JOBS_STATS_REQUEST });
    const res = yield call(dashboardApis.fetchJobStats);
    const payload = dashboardParsers.parseChartStats(res);
    yield put({
      type: dashboardConstants.DASHBOARD_JOBS_STATS_RESPONSE,
      payload,
    });
  } catch (e) {
    console.log(`Saga failed with ${type} ==> ${e}`);
    yield put({
      type: dashboardConstants.DASHBOARD_JOBS_STATS_RESPONSE,
      payload: [],
    });
  }
}

export function* registerDashboardSagas() {
  yield takeLatest(
    dashboardConstants.DASHBOARD_STATS_SAGA,
    fetchDashboardStats
  );
  yield takeLatest(
    dashboardConstants.DASHBOARD_USERS_STATS_SAGA,
    fetchUserStats
  );
  yield takeLatest(dashboardConstants.DASHBOARD_JOBS_STATS_SAGA, fetchJobStats);
}