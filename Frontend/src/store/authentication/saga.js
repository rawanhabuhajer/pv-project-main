import {
  takeEvery,
  fork,
  put,
  all,
  call,
  takeLatest,
  select,
} from "redux-saga/effects";
import { destroyCookie, setCookie } from "nookies";
import router from "next/router";

// Import Api files
import {
  postUserLoginApi,
  getUserProfileApi,
  resetPasswordApi,
  postUserRegisterApi,
  forgetPasswordApi,
  sendContactMessageApi,
} from "@/api/authentication";

// Login Redux States
import {
  GET_USER_PROFILE,
  LOGOUT_USER,
  POST_USER_LOGIN,
  RESET_PASSWORD,
  POST_USER_REGISTER,
  FORGET_PASSWORD,
  SEND_CONTACT_MESSAGE,
} from "./actionTypes";

import {
  getUserProfileFailure,
  getUserProfileSuccess,
  logoutFailure,
  logoutSuccess,
  postUserLoginFailure,
  postUserLoginSuccess,
  resetPasswordFailure,
  resetPasswordSuccess,
  postUserRegisterFailure,
  postUserRegisterSuccess,
  forgetPasswordSuccess,
  forgetPasswordFailure,
  sendConatctMessageSuccess,
  sendConatctMessageFailure,
} from "./actions";

import { parseCookies } from "nookies";
import { addWatchedTenders } from "../actions";

// ====================================================
// ====================================================

function* postUserRegister({ payload }) {
  try {
    const { responseData, isSuccess } = yield call(
      postUserRegisterApi,
      payload
    );
    yield put(postUserRegisterSuccess(responseData));
    if (isSuccess) {
      yield payload?.toast.success(
        payload?.formatMessage({ id: "accountRegistered" })
      );
      yield payload?.reset();
      setTimeout(() => {
        router.push(`/thank-you`);
      }, 1000);
    }
  } catch (error) {
    console.log(error);
    yield put(postUserRegisterFailure(JSON.stringify(error)));
    if (error?.response?.status === 415) {
      yield payload.toast.error(error.response?.data?.title || error);
    } else
      yield payload.toast.error(error.response?.data?.responseData?.message);
  }
}

// ====================================================
// ====================================================

function* userLogin({ payload }) {
  try {
    const { responseData, isSuccess } = yield call(postUserLoginApi, payload);

    yield put(postUserLoginSuccess(responseData));
    yield setCookie(null, "token", responseData?.token, { path: "/" });

    if (isSuccess) {
      router.push(`/account`);
    }
  } catch (error) {
    console.log(error);
    yield put(postUserLoginFailure(JSON.stringify(error)));
    yield payload?.toast.error(error.response?.data?.responseData?.message);
  }
}

// ====================================================
// ====================================================

function* getUserProfileSaga({ payload }) {
  try {
    const { responseData } = yield call(getUserProfileApi, payload);

    yield put(getUserProfileSuccess(responseData));
    if (!responseData?.isVerified) {
      yield payload?.toast?.error(
        "حسابك غير مفعل ,يرجي التواصل مع الدعم الفني"
      );
      setTimeout(() => {
        setCookie(null, "token", "", { path: "/" });
        router.push(`/login`);
      }, 2000);
    }
  } catch (error) {
    console.log(error);
    yield put(getUserProfileFailure(JSON.stringify(error)));
    // yield payload?.toast.error(error.response?.data?.responseData?.message);
  }
}

// ====================================================
// ====================================================

function* logoutUser({ payload }) {
  try {
    yield put(logoutSuccess(payload));
    yield destroyCookie("", "token");
    yield router.push(`/`);
  } catch (error) {
    console.log(error);
    yield put(logoutFailure(error?.response?.responseData?.message));
  }
}

// ====================================================
// ====================================================

function* resetPassword({ payload }) {
  try {
    const { isSuccess, message } = yield call(resetPasswordApi, payload);
    yield put(resetPasswordSuccess(responseData));
    if (isSuccess) {
      yield payload.toast.success(message);
      yield payload?.reset();
      setTimeout(() => {
        router.push(`/login`);
      }, 1000);
    }
  } catch (error) {
    console.log(error);
    // yield put(resetPasswordFailure(error.response?.data?.error || error));
    yield payload?.toast?.error(message);
  }
}

// ====================================================
// ====================================================

function* forgetPassword({ payload }) {
  try {
    const { responseData, isSuccess, message } = yield call(
      forgetPasswordApi,
      payload
    );
    yield put(forgetPasswordSuccess(responseData));
    if (isSuccess) {
      yield payload.toast.success("a reset link has been sent to your email");
      yield payload.reset();
      setTimeout(() => {
        router.push(`/reset-password`);
      }, 1000);
    }
  } catch (error) {
    yield put(forgetPasswordFailure(error));
    yield payload.toast.error("Error request-Forget");
  }
}

// ====================================================
// ====================================================

function* sendConatctMessage({ payload }) {
  try {
    const { responseData, isSuccess, message } = yield call(
      sendContactMessageApi,
      payload
    );
    yield put(sendConatctMessageSuccess(responseData));
    if (isSuccess) {
      yield payload?.toast?.success(message || "Email sent successfully");
      yield payload?.setUserData({
        firstName: "",
        lastName: "",
        companyName: "",
        email: "",
        message: "",
      });
    } else {
      yield payload?.toast?.error(message || "Error send email");
    }
  } catch (error) {
    yield put(sendConatctMessageFailure(error));
    yield payload?.toast?.error("Error send email");
  }
}

// ====================================================
// ====================================================

export function* watchPostUserRegister() {
  yield takeLatest(POST_USER_REGISTER, postUserRegister);
}

export function* watchPostUserLogin() {
  yield takeLatest(POST_USER_LOGIN, userLogin);
}

export function* watchGetUserProfile() {
  yield takeEvery(GET_USER_PROFILE, getUserProfileSaga);
}

export function* watchLogout() {
  yield takeLatest(LOGOUT_USER, logoutUser);
}

export function* watchResetPassword() {
  yield takeLatest(RESET_PASSWORD, resetPassword);
}

export function* watchForgetPassword() {
  yield takeLatest(FORGET_PASSWORD, forgetPassword);
}

export function* watchSendConatctMessage() {
  yield takeLatest(SEND_CONTACT_MESSAGE, sendConatctMessage);
}

// ====================================================
// ====================================================

function* authenticationSaga() {
  yield all([fork(watchPostUserRegister)]);
  yield all([fork(watchPostUserLogin)]);
  yield all([fork(watchGetUserProfile)]);
  yield all([fork(watchLogout)]);
  yield all([fork(watchResetPassword)]);
  yield all([fork(watchForgetPassword)]);
  yield all([fork(watchSendConatctMessage)]);
}

export default authenticationSaga;
