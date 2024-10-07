import { commonApis } from "./commonApis";
import { commonParsers } from "./commonParsers";
import { commonConstants } from "./commonConstants";
import { call, put, takeLatest } from "@redux-saga/core/effects";

function* blogsSaga({ type }) {
  try {
    yield put({ type: commonConstants.BLOGS_REQUEST });

    const res = yield call(commonApis.getBlogs);
    const payload = commonParsers.blogs(res);
    yield put({ type: commonConstants.BLOGS_RESPONSE, payload });
  } catch (error) {
    console.log(`API of ${type} failed with ${error}`);
  }
}

export function* registerCommonSagas() {
  yield takeLatest(commonConstants.BLOGS_SAGA, blogsSaga);
}
