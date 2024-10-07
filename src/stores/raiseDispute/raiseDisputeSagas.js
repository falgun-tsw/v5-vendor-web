import { call, put, takeLatest } from "@redux-saga/core/effects";

import { raiseDisputeApis } from "./raiseDisputeApis";
import { raiseDisputeParsers } from "./raiseDisputeParsers";
import { raiseDisputeConstants } from './riaseDisputeConstants';

function* disputeListSaga({ type }) {
  try {
    yield put({ type: raiseDisputeConstants.RAISE_DISPUTE_LIST_REQUEST });
    const res = yield call(raiseDisputeApis.getDisputeApi);
    const payload = raiseDisputeParsers.parseDisputeList(res);
    yield put({ type: raiseDisputeConstants.RAISE_DISPUTE_LIST_RESPONSE, payload });
  } catch (error) {
    yield put({ type: raiseDisputeConstants.RAISE_DISPUTE_LIST_RESPONSE, payload: [] });
    console.error(`Action ${type} failed with `, error);
  }
}
function* disputeListCategorySaga({ type }) {
  try {
    yield put({ type: raiseDisputeConstants.RAISE_DISPUTE_CATEGORIES_REQUEST });
    const res = yield call(raiseDisputeApis.getDisputeCategoriesApi);
    const payload = raiseDisputeParsers.parseDisputeCategories(res);
    yield put({
      type: raiseDisputeConstants.RAISE_DISPUTE_CATEGORIES_RESPONSE,
      payload,
    });
  } catch (error) {
    yield put({
      type: raiseDisputeConstants.RAISE_DISPUTE_CATEGORIES_RESPONSE,
      payload: [],
    });
    console.error(`Action ${type} failed with `, error);
  }
}

export function* registerRaiseDisputeSagas() {
  yield takeLatest(raiseDisputeConstants.RAISE_DISPUTE_LIST_SAGA, disputeListSaga);
  yield takeLatest(
    raiseDisputeConstants.RAISE_DISPUTE_CATEGORIES_SAGA,
    disputeListCategorySaga
  );
}
