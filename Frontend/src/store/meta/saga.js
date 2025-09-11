import { takeEvery, fork, put, all } from "redux-saga/effects";
import { SET_META } from "./actionTypes";
import { setMetaFailure, setMetaSuccess } from "./actions";

// ====================================================
// ====================================================

function* setMeta({ payload }) {
  try {
    yield put(setMetaSuccess(payload));
  } catch (error) {
    console.log(error);
    yield put(setMetaFailure(error));
  }
}

// ====================================================
// ====================================================

export function* watchSetMeta() {
  yield takeEvery(SET_META, setMeta);
}

// ====================================================
// ====================================================

function* metaSaga() {
  yield all([fork(watchSetMeta)]);
}

export default metaSaga;
