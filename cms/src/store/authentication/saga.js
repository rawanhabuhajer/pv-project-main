import {
  takeEvery,
  fork,
  put,
  all,
  call,
  takeLatest,
} from "redux-saga/effects";

// Import Api files
import {
  deleteUserApi,
  getCurrentUser,
  getUserApi,
  getUsersApi,
  postUserLogin,
  updateUserApi,
  verifyUserApi,
  toggleTrialApi,
  unVerifyUserApi,
} from "../../api/users";

// Login Redux States
import {
  CURRENT_USER,
  DELETE_USER,
  GET_USER,
  GET_USERS,
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_USER,
  VERIFY_USER,
  TOGGLE_FREE_TRIAL,
  UNVERIFY_USER,
} from "./actionTypes";
import {
  apiError,
  deleteUserFailure,
  deleteUserSuccess,
  getCurrentUserFailure,
  getCurrentUserSuccess,
  getUserFailure,
  getUserSuccess,
  getUsers,
  getUsersFailure,
  getUsersSuccess,
  loginSuccess,
  logoutUserSuccess,
  updateUserFailure,
  updateUserSuccess,
  verifyUserSuccess,
  unVerifyUserSuccess,
  toggleFreeTrialFailure,
  toggleFreeTrialSuccess,
} from "./actions";

function* loginUser({ payload }) {
  try {
    const { responseData, isSuccess, error } = yield call(
      postUserLogin,
      payload.data
    );
    yield put(loginSuccess(responseData));

    if (isSuccess) {
      localStorage.setItem("token", responseData.token);
      window.location.reload();
    } else {
      yield payload?.toast?.error(error);
    }
  } catch (error) {
    console.log(error);
    yield payload?.toast?.error(
      error.response?.data?.error || "An Erorr accured"
    );
    yield put(apiError(error.response?.data?.error || "An Erorr accured"));
  }
}

// ============================================================
// ============================================================

function* logoutUser() {
  try {
    yield put(logoutUserSuccess());
    localStorage.removeItem("token");
  } catch (error) {
    yield put(apiError(error.response?.data?.responseData?.message));
  }
}

// ============================================================
// ============================================================

function* currentUser() {
  try {
    const { responseData } = yield call(getCurrentUser);
    yield put(getCurrentUserSuccess(responseData));
  } catch (error) {
    console.log(error);
    yield put(
      getCurrentUserFailure(error.response?.data?.responseData?.message)
    );
  }
}

// ============================================================
// ============================================================

function* getUsersSaga({ payload }) {
  try {
    const { responseData } = yield call(getUsersApi, payload);
    yield put(getUsersSuccess(responseData));
  } catch (error) {
    console.log(error);
    yield put(getUsersFailure(error.response.data));
  }
}

// ============================================================
// ============================================================

function* verifyUserSaga({ payload }) {
  try {
    const { responseData, isSuccess, message } = yield call(
      verifyUserApi,
      payload
    );
    yield put(verifyUserSuccess(responseData));
    if (isSuccess) {
      yield payload?.toast?.success(message);
      yield payload?.dispatch(
        getUsers({
          pageNumber: payload?.page || 1,
          pageSize: payload?.pageSize || 10,
          SearchValue: payload?.SearchValue || "",
        })
      );
      yield payload?.resetInputs();
    }
  } catch (error) {
    yield put(apiError(error.response.data));
  }
}

// ============================================================
// ============================================================

function* unVerifyUserSaga({ payload }) {
  try {
    const { responseData, isSuccess, message } = yield call(
      unVerifyUserApi,
      payload
    );
    yield put(unVerifyUserSuccess(responseData));
    if (isSuccess) {
      yield payload?.toast?.success(message);
      yield payload?.dispatch(
        getUsers({
          pageNumber: payload?.page || 1,
          pageSize: payload?.pageSize || 10,
          SearchValue: payload?.SearchValue || "",
        })
      );
      yield payload?.resetInputs();
    }
  } catch (error) {
    yield put(apiError(error || "something wrong heppend"));
  }
}

// ============================================================
// ============================================================

function* deleteUserSaga({ payload }) {
  try {
    const { responseData, isSuccess, message } = yield call(
      deleteUserApi,
      payload
    );
    yield put(deleteUserSuccess(payload));
    if (isSuccess) {
      yield payload?.toast?.success(responseData);
      yield put(
        getUsers({
          pageNumber: payload?.page || 1,
          pageSize: payload?.pageSize || 10,
          SearchValue: payload?.SearchValue || "",
          CompanyName: payload?.CompanyName || "",
        })
      );
    } else {
      yield payload?.toast?.error(message);
    }
  } catch (error) {
    yield put(deleteUserFailure(error.response.data));
  }
}

// ============================================================
// ============================================================

function* updateUserSaga({ payload }) {
  try {
    const { responseData, isSuccess } = yield call(updateUserApi, payload);
    yield put(updateUserSuccess(responseData));
    if (isSuccess) {
      yield payload?.toast?.success("تم تحديث البيانات بنجاح");
    }
  } catch (error) {
    yield put(updateUserFailure(error.response.data));
  }
}

// ============================================================
// ============================================================

function* getUserSaga({ payload }) {
  try {
    const { responseData } = yield call(getUserApi, payload);
    yield put(getUserSuccess(responseData));
  } catch (error) {
    yield put(getUserFailure(error.response.data));
  }
}

// ============================================================
// ============================================================

function* toggleTrialSaga({ payload }) {
  try {
    const { responseData } = yield call(toggleTrialApi, payload);
    yield put(toggleFreeTrialSuccess(responseData));
  } catch (error) {
    yield put(toggleFreeTrialFailure(error.response.data));
  }
}

// ============================================================
// ============================================================

export function* watchUserLogin() {
  yield takeEvery(LOGIN_USER, loginUser);
}

export function* watchUserLogout() {
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export function* watchCurrentUser() {
  yield takeEvery(CURRENT_USER, currentUser);
}

export function* watchGetUsers() {
  yield takeEvery(GET_USERS, getUsersSaga);
}

export function* watchVerifyUser() {
  yield takeLatest(VERIFY_USER, verifyUserSaga);
}

export function* watchUnVerifyUser() {
  yield takeLatest(UNVERIFY_USER, unVerifyUserSaga);
}

export function* watchDeleteUser() {
  yield takeLatest(DELETE_USER, deleteUserSaga);
}

export function* watchUpdateUser() {
  yield takeLatest(UPDATE_USER, updateUserSaga);
}

export function* watchGetUser() {
  yield takeLatest(GET_USER, getUserSaga);
}

export function* watchToggleTrialSaga() {
  yield takeLatest(TOGGLE_FREE_TRIAL, toggleTrialSaga);
}

// ============================================================
// ============================================================

function* authSaga() {
  yield all([fork(watchUserLogin)]);
  yield all([fork(watchUserLogout)]);
  yield all([fork(watchCurrentUser)]);
  yield all([fork(watchGetUsers)]);
  yield all([fork(watchVerifyUser)]);
  yield all([fork(watchDeleteUser)]);
  yield all([fork(watchUpdateUser)]);
  yield all([fork(watchGetUser)]);
  yield all([fork(watchToggleTrialSaga)]);
  yield all([fork(watchUnVerifyUser)]);
}

export default authSaga;
