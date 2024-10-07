import { jobManagementApis } from "./jobManagementApis";
import { jobManagementConstants } from "./jobManagementConstants";
import { put, takeLatest, call } from "@redux-saga/core/effects";
import { jobManagementParsers } from "./jobManagementParsers";

function* fetchVendorJobsSaga({ type, payload }) {
  try {
    yield put({ type: jobManagementConstants.VENDER_JOB_LIST_REQUEST });
    const res = yield call(jobManagementApis.getJobList, payload);
    const parsedRes = jobManagementParsers.parseJobList(res);
    yield put({
      type: jobManagementConstants.VENDER_JOB_LIST_RESPONSE,
      payload: parsedRes,
    });
  } catch (e) {
    yield put({
      type: jobManagementConstants.VENDER_JOB_LIST_RESPONSE,
      payload: [],
    });
  }
}

function* fetchSkillListSaga({ payload }) {
  try {
    yield put({ type: jobManagementConstants.SKILLS_LIST_REQUEST });
    const res = yield call(jobManagementApis.getSkillsList, payload);
    const parsedRes = jobManagementParsers.parseSkillsList(res);
    yield put({
      type: jobManagementConstants.SKILLS_LIST_RESPONSE,
      payload: parsedRes,
    });
  } catch (e) {
    yield put({
      type: jobManagementConstants.SKILLS_LIST_RESPONSE,
      payload: [],
    });
  }
}

function* fetchSkillCategoriesListSaga() {
  try {
    yield put({ type: jobManagementConstants.SKILLS_CATEGORIES_LIST_REQUEST });
    const res = yield call(jobManagementApis.getSkillsCategoriesList);
    const parsedRes = jobManagementParsers.parseSkillsCategoriesList(res);
    yield put({
      type: jobManagementConstants.SKILLS_CATEGORIES_LIST_RESPONSE,
      payload: parsedRes,
    });
  } catch (e) {
    yield put({
      type: jobManagementConstants.SKILLS_CATEGORIES_LIST_RESPONSE,
      payload: [],
    });
  }
}

function* fetchJobDescriptionSaga({ type, payload }) {
  try {
    yield put({ type: jobManagementConstants.JOB_DESCRIPTION_REQUEST });
    const res = yield call(jobManagementApis.getJobDescription, payload);
    const parsedRes = jobManagementParsers.parseJobDetails(res);
    yield put({
      type: jobManagementConstants.JOB_DESCRIPTION_RESPONSE,
      payload: parsedRes,
    });
  } catch (e) {
    yield put({
      type: jobManagementConstants.JOB_DESCRIPTION_RESPONSE,
      payload: {},
    });
  }
}

export function* registerJobManagementSagas() {
  yield takeLatest(
    jobManagementConstants.VENDER_JOB_LIST_SAGA,
    fetchVendorJobsSaga
  );
  yield takeLatest(jobManagementConstants.SKILLS_LIST_SAGA, fetchSkillListSaga);
  yield takeLatest(
    jobManagementConstants.SKILLS_CATEGORIES_LIST_SAGA,
    fetchSkillCategoriesListSaga
  );
  yield takeLatest(
    jobManagementConstants.JOB_DESCRIPTION_SAGA,
    fetchJobDescriptionSaga
  );
}
