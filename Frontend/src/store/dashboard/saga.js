import {
  getProjectsNearDeadlinesApi,
  getCategoriesStatusStatsApi,
  getPvProjetsCountByYearApi,
  getMvProjetsCountByYearApi,
  getMvCategoriesStatusStatsApi,
  getlatestProjectsApi,
} from "@/api/dashboard";
import {
  takeEvery,
  fork,
  put,
  all,
  call,
  takeLatest,
} from "redux-saga/effects";
import {
  getNearDeadlineProjectsSuccess,
  getNearDeadlineProjectsFailure,
  getCategoriesStatusStatsFailure,
  getCategoriesStatusStatsSuccess,
  getPvProjectsCountByYearSuccess,
  getPvProjectsCountByYearFailure,
  getMvProjectsCountByYearSuccess,
  getMvProjectsCountByYearFailure,
  getMvCategoriesStatusStatsSuccess,
  getMvCategoriesStatusStatsFailure,
  getLatestProjectsSuccess,
  getLatestProjectsFailure,
} from "./actions";
import {
  GET_NEAR_DEADLINE_PROJECTS,
  GET_CATEGORIES_STATUS_STATS,
  GET_PV_PROJECTS_COUNT_BY_YEAR,
  GET_MV_PROJECTS_COUNT_BY_YEAR,
  GET_MV_CATEGORIES_STATUS_STATS,
  GET_LATEST_PROJECTS,
} from "./actionTypes";

// ====================================================
// ====================================================

function* getNearDeadlineProjectsSaga({ payload }) {
  try {
    const { responseData } = yield call(getProjectsNearDeadlinesApi, payload);

    yield put(getNearDeadlineProjectsSuccess(responseData));
  } catch (error) {
    console.log(error);
    yield put(getNearDeadlineProjectsFailure(error));
    yield payload.toast.error("حدث خطأ ما الرجاء المحاولة مرة أخرى");
  }
}

// ====================================================
// ====================================================

function* getCategoriesStatusStatsSaga({ payload }) {
  try {
    const { data } = yield call(getCategoriesStatusStatsApi, payload);

    yield put(getCategoriesStatusStatsSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getCategoriesStatusStatsFailure(error));
    yield payload.toast.error("حدث خطأ ما الرجاء المحاولة مرة أخرى");
  }
}

// ====================================================
// ====================================================

// PV Saga
function* getPvProjectsCountByYearSaga({ payload }) {
  try {
    const { responseData } = yield call(getPvProjetsCountByYearApi, payload);
    yield put(getPvProjectsCountByYearSuccess(responseData));
  } catch (error) {
    console.error(error);
    yield put(getPvProjectsCountByYearFailure(error));
  }
}

// ====================================================
// ====================================================
// MV Saga
function* getMvProjectsCountByYearSaga({ payload }) {
  try {
    const { responseData } = yield call(getMvProjetsCountByYearApi, payload);
    yield put(getMvProjectsCountByYearSuccess(responseData));
  } catch (error) {
    console.error(error);
    yield put(getMvProjectsCountByYearFailure(error));
  }
}

// ====================================================
// ====================================================

function* getMvCategoriesStatusStatsSaga({ payload }) {
  try {
    const { data } = yield call(getMvCategoriesStatusStatsApi, payload);
    yield put(getMvCategoriesStatusStatsSuccess(data));
  } catch (error) {
    console.error(error);
    yield put(getMvCategoriesStatusStatsFailure(error));
  }
}

// ====================================================
// ====================================================

function* getLatestProjectsSaga({ payload }) {
  try {
    const { responseData } = yield call(getlatestProjectsApi, payload);
    yield put(getLatestProjectsSuccess(responseData));
  } catch (error) {
    console.error(error);
    yield put(getLatestProjectsFailure(error));
  }
}

// ====================================================
// ====================================================

export function* watchGetNearDeadlineProjectsSaga() {
  yield takeEvery(GET_NEAR_DEADLINE_PROJECTS, getNearDeadlineProjectsSaga);
}

export function* watchGetCategoriesStatusStatsSaga() {
  yield takeEvery(GET_CATEGORIES_STATUS_STATS, getCategoriesStatusStatsSaga);
}

export function* watchGetPvProjectsCountByYearSaga() {
  yield takeLatest(GET_PV_PROJECTS_COUNT_BY_YEAR, getPvProjectsCountByYearSaga);
}

export function* watchGetMvProjectsCountByYearSaga() {
  yield takeLatest(GET_MV_PROJECTS_COUNT_BY_YEAR, getMvProjectsCountByYearSaga);
}
export function* watchGetMvCategoriesStatusStatsSaga() {
  yield takeLatest(
    GET_MV_CATEGORIES_STATUS_STATS,
    getMvCategoriesStatusStatsSaga
  );
}
export function* watchGetLatestProjectsSaga() {
  yield takeEvery(GET_LATEST_PROJECTS, getLatestProjectsSaga);
}

// ====================================================
// ====================================================

function* dashboardSaga() {
  yield all([fork(watchGetNearDeadlineProjectsSaga)]);
  yield all([fork(watchGetCategoriesStatusStatsSaga)]);
  yield all([fork(watchGetPvProjectsCountByYearSaga)]);
  yield all([fork(watchGetMvProjectsCountByYearSaga)]);
  yield all([fork(watchGetMvCategoriesStatusStatsSaga)]);
  yield all([fork(watchGetLatestProjectsSaga)]);
}

export default dashboardSaga;
