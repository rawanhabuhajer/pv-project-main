import {
  getPvProjectsApi,
  addPvProjectsApi,
  editPvProjectsApi,
  deletePvProjectsApi,
  getPvProjectSubsApi,
  addPvSubProjectApi,
  deleteSubPvProjectApi,
  editPvSubProjectApi,
  getPvSubProjectDataApi,
  editSubProjectDataApi,
  getMvProjectsApi,
  addMvProjectsApi,
  editMvProjectsApi,
  deleteMvProjectsApi,
  editMvSingleProjectDataApi,
  getMvSingleProjectDataApi,
  getMvProjectSubsApi,
  addMvSubProjectApi,
  deleteSubMvProjectApi,
  editMvSubProjectApi,
} from "@/api/projects";
import { fork, put, all, call, takeEvery } from "redux-saga/effects";
import {
  addPvProjectsFailure,
  addPvProjectsSuccess,
  getPvProjectsFailure,
  getPvProjectsSuccess,
  editPvProjectsFailure,
  editPvProjectsSuccess,
  deletePvProjectsFailure,
  deletePvProjectsSuccess,
  getProjectSubByIdFailure,
  getProjectSubByIdSuccess,
  addProjectSubByIdFailure,
  addProjectSubByIdSuccess,
  editProjectSubByIdFailure,
  editProjectSubByIdSuccess,
  deleteProjectSubByIdFailure,
  deleteProjectSubByIdSuccess,
  getSubProjectDataByIdFailure,
  getSubProjectDataByIdSuccess,
  editSubProjectDataByIdFailure,
  editSubProjectDataByIdSuccess,
  getMvProjectsFailure,
  getMvProjectsSuccess,
  addMvProjectsFailure,
  addMvProjectsSuccess,
  editMvProjectsFailure,
  editMvProjectsSuccess,
  deleteMvProjectsFailure,
  deleteMvProjectsSuccess,
  getSingleProjectDataByIdFailure,
  getSingleProjectDataByIdSuccess,
  editSingleProjectDataByIdFailure,
  editSingleProjectDataByIdSuccess,
  getSingleProjectDataById,
  getPvProjects,
  getProjectSubById,
  getMvProjects,
  getMvProjectSubByIdFailure,
  getMvProjectSubByIdSuccess,
  addMvProjectSubByIdFailure,
  addMvProjectSubByIdSuccess,
  editMvProjectSubByIdFailure,
  editMvProjectSubByIdSuccess,
  deleteMvProjectSubByIdFailure,
  deleteMvProjectSubByIdSuccess,
  getMvProjectSubById,
} from "./actions";
import {
  GET_PV_PROJECTS,
  ADD_PV_PROJECT,
  EDIT_PV_PROJECT,
  DELETE_PV_PROJECT,
  ADD_PROJECT_SUB_BY_ID,
  GET_PROJECT_SUB_BY_ID,
  EDIT_PROJECT_SUB_BY_ID,
  DELETE_PROJECT_SUB_BY_ID,
  GET_SUB_PROJECT_DATA_BY_ID,
  EDIT_SUB_PROJECT_DATA_BY_ID,
  GET_MV_PROJECTS,
  ADD_MV_PROJECT,
  EDIT_MV_PROJECT,
  DELETE_MV_PROJECT,
  GET_SINGLE_MV_PROJECT_DATA,
  EDIT_SINGLE_MV_PROJECT_DATA,
  ADD_MV_PROJECT_SUB_BY_ID,
  GET_MV_PROJECT_SUB_BY_ID,
  EDIT_MV_PROJECT_SUB_BY_ID,
  DELETE_MV_PROJECT_SUB_BY_ID,
} from "./actionTypes";

// ====================================================
// ====================================================

function* getPvProjectsSaga({ payload }) {
  try {
    const { responseData } = yield call(getPvProjectsApi, payload);

    yield put(getPvProjectsSuccess(responseData));
  } catch (error) {
    console.log(error);
    yield put(getPvProjectsFailure(error));
    yield payload.toast.error("حدث خطأ ما الرجاء المحاولة مرة أخرى");
  }
}

// ====================================================
// ====================================================

function* addPvProjectSaga({ payload }) {
  try {
    const { data, isSuccess, message } = yield call(addPvProjectsApi, payload);
    yield put(addPvProjectsSuccess(data));
    if (isSuccess) {
      yield payload?.dispatch(
        getPvProjects({
          pageNumber: 1,
          pageSize: 10,
          userId: payload?.userId,
          searchValue: "",
          selectedSort: "sortBy=createdAt&order=desc",
        })
      );
      yield payload.toast.success("new project added successfully");
    } else {
      yield payload.toast.error(message);
    }
  } catch (error) {
    console.log(error);
    yield put(addPvProjectsFailure(error));
    yield payload.toast.error("حدث خطأ ما الرجاء المحاولة مرة أخرى");
  }
}

// ====================================================
// ====================================================

function* editPvProjectsSaga({ payload }) {
  try {
    const { data, isSuccess, message } = yield call(editPvProjectsApi, payload);
    yield put(editPvProjectsSuccess(data));
    if (isSuccess) {
      yield payload?.dispatch(
        getPvProjects({
          pageNumber: 1,
          pageSize: 10,
          userId: payload?.userId,
          searchValue: "",
          selectedSort: "sortBy=createdAt&order=desc",
        })
      );
      yield payload.toast.success("project updated successfully");
    } else {
      yield payload.toast.error(message);
    }
  } catch (error) {
    console.log(error);
    yield put(editPvProjectsFailure(error));
    yield payload.toast.error("حدث خطأ ما الرجاء المحاولة مرة أخرى");
  }
}

// ====================================================
// ====================================================

function* deletePvProjectsSaga({ payload }) {
  try {
    const { data, isSuccess, message } = yield call(
      deletePvProjectsApi,
      payload
    );
    yield put(deletePvProjectsSuccess(data));
    if (isSuccess) {
      yield payload?.dispatch(
        getPvProjects({
          pageNumber: 1,
          pageSize: 10,
          userId: payload?.userId,
          searchValue: "",
          selectedSort: "sortBy=createdAt&order=desc",
        })
      );
      yield payload.toast.success("project deleted successfully");
    } else {
      yield payload.toast.error(message);
    }
  } catch (error) {
    console.log(error);
    yield put(deletePvProjectsFailure(error));
    yield payload.toast.error("حدث خطأ ما الرجاء المحاولة مرة أخرى");
  }
}

// ====================================================
// ====================================================

function* getProjectSubByIdSaga({ payload }) {
  try {
    const { responseData } = yield call(getPvProjectSubsApi, payload);
    yield put(getProjectSubByIdSuccess(responseData));
  } catch (error) {
    console.log(error);
    yield put(getProjectSubByIdFailure(error));
    yield payload.toast.error("حدث خطأ ما الرجاء المحاولة مرة أخرى");
  }
}

// ====================================================
// ====================================================

function* addProjectSubByIdSaga({ payload }) {
  try {
    const { data, isSuccess, message } = yield call(
      addPvSubProjectApi,
      payload
    );
    yield put(addProjectSubByIdSuccess(data));
    if (isSuccess) {
      yield payload?.dispatch(
        getProjectSubById({
          pageNumber: 1,
          pageSize: 10,
          projectId: payload?.projectId,
        })
      );
      yield payload.toast.success("project deleted successfully");
    } else {
      yield payload.toast.error(
        message || "حدث خطأ ما الرجاء المحاولة مرة أخرى"
      );
    }
  } catch (error) {
    console.log(error);
    yield put(addProjectSubByIdFailure(error));
    yield payload.toast.error("حدث خطأ ما الرجاء المحاولة مرة أخرى");
  }
}

// ====================================================
// ====================================================

function* editProjectSubByIdSaga({ payload }) {
  try {
    const { data, isSuccess, message } = yield call(
      editPvSubProjectApi,
      payload
    );
    yield put(editProjectSubByIdSuccess(data));
    if (isSuccess) {
      yield payload?.dispatch(
        getProjectSubById({
          pageNumber: 1,
          pageSize: 10,
          projectId: payload?.projectId,
        })
      );
      yield payload.toast.success("sub-project updated successfully");
    } else {
      yield payload.toast.error(message || "something error happened");
    }
  } catch (error) {
    console.log(error);
    yield put(editProjectSubByIdFailure(error));
    yield payload.toast.error("حدث خطأ ما الرجاء المحاولة مرة أخرى");
  }
}

// ====================================================
// ====================================================

function* deleteProjectSubByIdSaga({ payload }) {
  try {
    const { data, isSuccess, message } = yield call(
      deleteSubPvProjectApi,
      payload
    );
    yield put(deleteProjectSubByIdSuccess(data));
    if (isSuccess) {
      yield payload?.dispatch(
        getProjectSubById({
          pageNumber: 1,
          pageSize: 10,
          projectId: payload?.projectId,
        })
      );
      yield payload.toast.success("sub-project deleted successfully");
    } else {
      yield payload.toast.error(message || "something wrong happened");
    }
  } catch (error) {
    console.log(error);
    yield put(deleteProjectSubByIdFailure(error));
    yield payload.toast.error("حدث خطأ ما الرجاء المحاولة مرة أخرى");
  }
}

// ====================================================
// ====================================================

function* getPvSubProjectDataSaga({ payload }) {
  try {
    const { responseData } = yield call(getPvSubProjectDataApi, payload);
    yield put(getSubProjectDataByIdSuccess(responseData));
  } catch (error) {
    console.log(error);
    yield put(getSubProjectDataByIdFailure(error));
    yield payload.toast.error("حدث خطأ ما الرجاء المحاولة مرة أخرى");
  }
}

// ====================================================
// ====================================================

function* editPvSubProjectDataSaga({ payload }) {
  try {
    const { responseData, isSuccess } = yield call(
      editSubProjectDataApi,
      payload
    );
    yield put(editSubProjectDataByIdSuccess(responseData));
    if (isSuccess) {
      yield payload.toast.success("sub-project updated successfully");
    }
  } catch (error) {
    console.log(error);
    yield put(editSubProjectDataByIdFailure(error));
    yield payload.toast.error("حدث خطأ ما الرجاء المحاولة مرة أخرى");
  }
}

// ====================================================
// ====================================================

function* getMvProjectsSaga({ payload }) {
  try {
    const { responseData } = yield call(getMvProjectsApi, payload);

    yield put(getMvProjectsSuccess(responseData));
  } catch (error) {
    console.log(error);
    yield put(getMvProjectsFailure(error));
    yield payload.toast.error("حدث خطأ ما الرجاء المحاولة مرة أخرى");
  }
}

// ====================================================
// ====================================================

function* addMvProjectSaga({ payload }) {
  try {
    const { isSuccess, responseData } = yield call(addMvProjectsApi, payload);
    yield put(addMvProjectsSuccess(responseData));
    if (isSuccess) {
      yield put(
        getMvProjects({
          pageNumber: 1,
          pageSize: 10,
          userId: payload?.userId,
          searchValue: "",
          selectedSort: "&sortBy=updatedAt&order=des",
        })
      );
    }
  } catch (error) {
    console.log(error);
    yield put(addMvProjectsFailure(error));
    yield payload.toast.error("حدث خطأ ما الرجاء المحاولة مرة أخرى");
  }
}

// ====================================================
// ====================================================

function* editMvProjectsSaga({ payload }) {
  try {
    const { responseData, isSuccess } = yield call(editMvProjectsApi, payload);
    yield put(editMvProjectsSuccess(responseData));
    if (isSuccess) {
      yield put(
        getMvProjects({
          pageNumber: 1,
          pageSize: 10,
          userId: payload?.userId,
          searchValue: "",
          selectedSort: "&sortBy=updatedAt&order=des",
        })
      );
      yield payload.toast.success("Updated successfully");
    } else {
      yield payload.toast.error("حدث خطأ ما الرجاء المحاولة مرة أخرى");
    }
  } catch (error) {
    console.log(error);
    yield put(editMvProjectsFailure(error));
    yield payload.toast.error("حدث خطأ ما الرجاء المحاولة مرة أخرى");
  }
}

// ====================================================
// ====================================================

function* deleteMvProjectsSaga({ payload }) {
  try {
    const { isSuccess, responseData } = yield call(
      deleteMvProjectsApi,
      payload
    );
    yield put(deleteMvProjectsSuccess(responseData));
    if (isSuccess) {
      yield put(
        getMvProjects({
          pageNumber: 1,
          pageSize: 10,
          userId: payload?.userId,
          searchValue: "",
          selectedSort: "&sortBy=updatedAt&order=des",
        })
      );
      yield payload.toast.success("Deleted successfully");
    } else {
      yield payload.toast.error("حدث خطأ ما الرجاء المحاولة مرة أخرى");
    }
  } catch (error) {
    console.log(error);
    yield put(deleteMvProjectsFailure(error));
    yield payload.toast.error("حدث خطأ ما الرجاء المحاولة مرة أخرى");
  }
}

// ====================================================
// ====================================================

function* getMvSingleProjectDataSaga({ payload }) {
  try {
    const { responseData } = yield call(getMvSingleProjectDataApi, payload);
    yield put(getSingleProjectDataByIdSuccess(responseData));
  } catch (error) {
    console.log(error);
    yield put(getSingleProjectDataByIdFailure(error));
    yield payload.toast.error("حدث خطأ ما الرجاء المحاولة مرة أخرى");
  }
}

// ====================================================
// ====================================================

function* editMvSingleProjectDataSaga({ payload }) {
  try {
    const response = yield call(editMvSingleProjectDataApi, payload);
    yield put(editSingleProjectDataByIdSuccess(response));
    if (response?.isSuccess) {
      yield payload.dispatch(
        getSingleProjectDataById({
          mvCategoryId: payload?.mvCategoryId,
        })
      );
    }
  } catch (error) {
    console.log(error);
    yield put(editSingleProjectDataByIdFailure(error));
    yield payload.toast.error("حدث خطأ ما الرجاء المحاولة مرة أخرى");
  }
}

// ====================================================
// ====================================================

function* getMvProjectSubByIdSaga({ payload }) {
  try {
    const { responseData } = yield call(getMvProjectSubsApi, payload);
    yield put(getMvProjectSubByIdSuccess(responseData));
  } catch (error) {
    console.log(error);
    yield put(getMvProjectSubByIdFailure(error));
    yield payload.toast.error("حدث خطأ ما الرجاء المحاولة مرة أخرى");
  }
}

// ====================================================
// ====================================================

function* addMvProjectSubByIdSaga({ payload }) {
  try {
    const { responseData, isSuccess, message } = yield call(
      addMvSubProjectApi,
      payload
    );
    yield put(addMvProjectSubByIdSuccess(responseData));
    if (isSuccess) {
      yield put(
        getMvProjectSubById({
          pageNumber: 1,
          pageSize: 10,
          projectId: payload?.projectId,
        })
      );
      yield payload.toast.success("new subproject Added successfully");
    } else {
      yield payload.toast.error(
        message || "حدث خطأ ما الرجاء المحاولة مرة أخرى"
      );
    }
  } catch (error) {
    console.log(error);
    yield put(addMvProjectSubByIdFailure(error));
    yield payload.toast.error("حدث خطأ ما الرجاء المحاولة مرة أخرى");
  }
}

// ====================================================
// ====================================================

function* editMvProjectSubByIdSaga({ payload }) {
  try {
    const { responseData, isSuccess, message } = yield call(
      editMvSubProjectApi,
      payload
    );
    yield put(editMvProjectSubByIdSuccess(responseData));
    if (isSuccess) {
      yield payload?.dispatch(
        getMvProjectSubById({
          pageNumber: 1,
          pageSize: 10,
          projectId: payload?.projectId,
        })
      );
      yield payload.toast.success("sub-project updated successfully");
    } else {
      yield payload.toast.error(message || "something error happened");
    }
  } catch (error) {
    console.log(error);
    yield put(editMvProjectSubByIdFailure(error));
    yield payload.toast.error("حدث خطأ ما الرجاء المحاولة مرة أخرى");
  }
}

// ====================================================
// ====================================================

function* deleteMvProjectSubByIdSaga({ payload }) {
  try {
    const { isSuccess, message } = yield call(deleteSubMvProjectApi, payload);
    yield put(deleteMvProjectSubByIdSuccess(payload));
    if (isSuccess) {
      yield put(
        getMvProjectSubById({
          pageNumber: 1,
          pageSize: 10,
          projectId: payload?.projectId,
        })
      );
      yield payload.toast.success("sub-project deleted successfully");
    } else {
      yield payload.toast.error(message || "something wrong happened");
    }
  } catch (error) {
    console.log(error);
    yield put(deleteMvProjectSubByIdFailure(error));
    yield payload.toast.error("حدث خطأ ما الرجاء المحاولة مرة أخرى");
  }
}

// ====================================================
// ====================================================

export function* watchGetPvProjectsSaga() {
  yield takeEvery(GET_PV_PROJECTS, getPvProjectsSaga);
}

export function* watchAddPvProjectSaga() {
  yield takeEvery(ADD_PV_PROJECT, addPvProjectSaga);
}

export function* watchEditPvProjectsSaga() {
  yield takeEvery(EDIT_PV_PROJECT, editPvProjectsSaga);
}

export function* watchDeletePvProjectsSaga() {
  yield takeEvery(DELETE_PV_PROJECT, deletePvProjectsSaga);
}

export function* watchGetProjectSubByIdSaga() {
  yield takeEvery(GET_PROJECT_SUB_BY_ID, getProjectSubByIdSaga);
}

export function* watchAddProjectSubByIdSaga() {
  yield takeEvery(ADD_PROJECT_SUB_BY_ID, addProjectSubByIdSaga);
}

export function* watchEditProjectSubByIdSaga() {
  yield takeEvery(EDIT_PROJECT_SUB_BY_ID, editProjectSubByIdSaga);
}

export function* watchDeleteProjectSubByIdSaga() {
  yield takeEvery(DELETE_PROJECT_SUB_BY_ID, deleteProjectSubByIdSaga);
}

export function* watchGetPvSubProjectDataSaga() {
  yield takeEvery(GET_SUB_PROJECT_DATA_BY_ID, getPvSubProjectDataSaga);
}

export function* watchEditPvSubProjectDataSaga() {
  yield takeEvery(EDIT_SUB_PROJECT_DATA_BY_ID, editPvSubProjectDataSaga);
}

export function* watchGetMvProjectDataSaga() {
  yield takeEvery(GET_MV_PROJECTS, getMvProjectsSaga);
}

export function* watchAddMvProjectDataSaga() {
  yield takeEvery(ADD_MV_PROJECT, addMvProjectSaga);
}

export function* watchEditMvProjectDataSaga() {
  yield takeEvery(EDIT_MV_PROJECT, editMvProjectsSaga);
}

export function* watchDeleteMvProjectDataSaga() {
  yield takeEvery(DELETE_MV_PROJECT, deleteMvProjectsSaga);
}

export function* watchGetMvSingleProjectDataSaga() {
  yield takeEvery(GET_SINGLE_MV_PROJECT_DATA, getMvSingleProjectDataSaga);
}

export function* watchEditMvSingleProjectDataSaga() {
  yield takeEvery(EDIT_SINGLE_MV_PROJECT_DATA, editMvSingleProjectDataSaga);
}

export function* watchGetMvProjectSubByIdSaga() {
  yield takeEvery(GET_MV_PROJECT_SUB_BY_ID, getMvProjectSubByIdSaga);
}

export function* watchAddMvProjectSubByIdSaga() {
  yield takeEvery(ADD_MV_PROJECT_SUB_BY_ID, addMvProjectSubByIdSaga);
}

export function* watchEditMvProjectSubByIdSaga() {
  yield takeEvery(EDIT_MV_PROJECT_SUB_BY_ID, editMvProjectSubByIdSaga);
}

export function* watchDeleteMvProjectSubByIdSaga() {
  yield takeEvery(DELETE_MV_PROJECT_SUB_BY_ID, deleteMvProjectSubByIdSaga);
}

// ====================================================
// ====================================================

function* projectsSaga() {
  yield all([fork(watchGetPvProjectsSaga)]);
  yield all([fork(watchAddPvProjectSaga)]);
  yield all([fork(watchEditPvProjectsSaga)]);
  yield all([fork(watchDeletePvProjectsSaga)]);
  yield all([fork(watchGetProjectSubByIdSaga)]);
  yield all([fork(watchAddProjectSubByIdSaga)]);
  yield all([fork(watchEditProjectSubByIdSaga)]);
  yield all([fork(watchDeleteProjectSubByIdSaga)]);
  yield all([fork(watchGetPvSubProjectDataSaga)]);
  yield all([fork(watchEditPvSubProjectDataSaga)]);
  yield all([fork(watchAddMvProjectDataSaga)]);
  yield all([fork(watchGetMvProjectDataSaga)]);
  yield all([fork(watchEditMvProjectDataSaga)]);
  yield all([fork(watchDeleteMvProjectDataSaga)]);
  yield all([fork(watchGetMvSingleProjectDataSaga)]);
  yield all([fork(watchEditMvSingleProjectDataSaga)]);
  yield all([fork(watchGetMvProjectSubByIdSaga)]);
  yield all([fork(watchAddMvProjectSubByIdSaga)]);
  yield all([fork(watchEditMvProjectSubByIdSaga)]);
  yield all([fork(watchDeleteMvProjectSubByIdSaga)]);
}

export default projectsSaga;
