import { faqApis } from "./faqApis";
import { faqParsers } from "./faqParsers";
import { faqConstants } from "./faqConstants";
import { put, takeLatest, call } from "@redux-saga/core/effects";

function* fetchFaqsSaga() {
  try {
    yield put({ type: faqConstants.FAQS_REQUEST });
    const res = yield call(faqApis.faqsList);
    const payload = faqParsers.faqsList(res);
    yield put({
      type: faqConstants.FAQS_RESPONSE,
      payload,
    });
  } catch (e) {
    yield put({
      type: faqConstants.FAQS_RESPONSE,
      payload: [],
    });
  }
}

export function* registerFaqsSagas() {
  yield takeLatest(faqConstants.FAQS_SAGA, fetchFaqsSaga);
}
