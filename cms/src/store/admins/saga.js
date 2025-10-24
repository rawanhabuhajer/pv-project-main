import {
  takeEvery,
  fork,
  put,
  all,
  call,
  takeLatest,
} from "redux-saga/effects";
import {
  addAdminFailure,
  addAdminSuccess,
  deleteAdminFailure,
  deleteAdminSuccess,
  getAdminFailure,
  getAdminSuccess,
  getAdmins,
  getAdminsFailure,
  getAdminsSuccess,
  updateAdminFailure,
  updateAdminSuccess,
  getAllContentSectionsSuccess,
  getAllContentSectionsFailure,
} from "./actions";
import {
  ADD_ADMIN,
  DELETE_ADMIN,
  GET_ADMIN,
  GET_ADMINS,
  UPDATE_ADMIN,
  GET_ALL_CONTENT_SECTIONS,
} from "./actionTypes";
import {
  addAdminApi,
  deleteAdminApi,
  getAdminApi,
  getAdminsApi,
  updateAdminApi,
  getAllSectionsApi,
} from "api/admins";
import { verifyUser } from "store/actions";

function* getAdminsSaga({ payload }) {
  try {
    const { responseData } = yield call(getAdminsApi, payload);
    yield put(getAdminsSuccess(responseData));
  } catch (error) {
    console.log(error);
    yield put(getAdminsFailure(error.response?.data?.responseData?.message));
  }
}

// ============================================================
// ============================================================

function* getAdminSaga({ payload }) {
  try {
    const { responseData } = yield call(getAdminApi, payload);
    yield put(getAdminSuccess(responseData));
  } catch (error) {
    console.log(error);
    yield put(getAdminFailure(error.response?.data?.responseData?.message));
  }
}

// ============================================================
// ============================================================

function* addAdminSaga({ payload }) {
  try {
    const { responseData, isSuccess } = yield call(addAdminApi, payload);
    yield put(addAdminSuccess(responseData));
    if (isSuccess) {
      yield payload?.toast?.success("تمت الاضافة بنجاح");
      if (payload?.reset) {
        payload.reset();
        payload.setStartDate("");
        payload.setEndDate("");
      }
    }
  } catch (error) {
    console.log(error);
    yield put(addAdminFailure(error.response?.data?.responseData?.message));
    yield payload?.toast?.error(error.response?.data?.responseData?.message);
  }
}

// ============================================================
// ============================================================

function* updateAdminSaga({ payload }) {
  try {
    const { responseData, isSuccess } = yield call(updateAdminApi, payload);
    yield put(updateAdminSuccess(responseData));
    if (isSuccess) {
      yield payload?.toast?.success("تم التعديل بنجاح");

      setTimeout(() => {
        payload?.navigate?.("/admins");
      }, 1000);
    }
  } catch (error) {
    console.log(error);
    yield put(updateAdminFailure(error.response?.data?.responseData?.message));
  }
}

// ============================================================
// ============================================================

function* deleteAdminSaga({ payload }) {
  try {
    const { responseData, isSuccess, message } = yield call(
      deleteAdminApi,
      payload
    );
    yield put(deleteAdminSuccess(responseData));
    if (isSuccess) {
      yield payload?.toast?.success("تم الحذف بنجاح");
      yield put(getAdmins());
    } else {
      yield payload?.toast?.error(message || "حدث خطأ ما أثناء الحذف");
    }
  } catch (error) {
    console.log(error);
    yield put(deleteAdminFailure(error.response?.data?.responseData?.message));
  }
}

// ============================================================
// ============================================================

function* getAllContentSetionsSaga({ payload }) {
  try {
    const { responseData } = yield call(getAllSectionsApi, payload);
    yield put(getAllContentSectionsSuccess(responseData));
  } catch (error) {
    console.log(error);
    yield put(
      getAllContentSectionsFailure(error.response?.data?.responseData?.message)
    );
  }
}

// ============================================================
// ============================================================

export function* watchGetAdmins() {
  yield takeEvery(GET_ADMINS, getAdminsSaga);
}

// ============================================================

export function* watchAdmin() {
  yield takeEvery(GET_ADMIN, getAdminSaga);
}

// ============================================================

export function* watchAddAdmin() {
  yield takeLatest(ADD_ADMIN, addAdminSaga);
}

// ============================================================

export function* watchUpdateAdmin() {
  yield takeLatest(UPDATE_ADMIN, updateAdminSaga);
}

// ============================================================

export function* watchDeleteAdmin() {
  yield takeLatest(DELETE_ADMIN, deleteAdminSaga);
}

// ============================================================

export function* watchAllContentSetionsSaga() {
  yield takeLatest(GET_ALL_CONTENT_SECTIONS, getAllContentSetionsSaga);
}

// ============================================================
// ============================================================

function* adminsSaga() {
  yield all([fork(watchGetAdmins)]);
  yield all([fork(watchAdmin)]);
  yield all([fork(watchAddAdmin)]);
  yield all([fork(watchUpdateAdmin)]);
  yield all([fork(watchDeleteAdmin)]);
  yield all([fork(watchAllContentSetionsSaga)]);
}

export default adminsSaga;
