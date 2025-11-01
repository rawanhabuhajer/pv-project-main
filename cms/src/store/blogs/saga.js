import {
  addBlogApi,
  deleteBlogApi,
  getBlogsApi,
  getSingleBlogApi,
  updateBlogApi,
} from "api/blogs";
import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import {
  addBlogFailure,
  addBlogSuccess,
  deleteBlogFailure,
  deleteBlogSuccess,
  getBlogs,
  getBlogsFailure,
  getBlogsSuccess,
  getSingleBlogFailure,
  getSingleBlogSuccess,
  updateBlogFailure,
  updateBlogSuccess,
} from "./actions";
import {
  ADD_BLOG,
  DELETE_BLOG,
  GET_ALL_BLOGS,
  GET_SINGLE_BLOG,
  UPDATE_BLOG,
} from "./actionTypes";

function* getAllBlogsSaga({ payload }) {
  try {
    const  responseData  = yield call(getBlogsApi, payload);
    yield put(getBlogsSuccess(responseData));
  } catch (error) {
    console.log(error);
    yield put(getBlogsFailure(error.response?.data?.responseData?.message));
  }
}

// ============================================================
// ============================================================

function* getSingleBlogSaga({ payload }) {
  try {
    const { responseData } = yield call(getSingleBlogApi, payload);
    yield put(getSingleBlogSuccess(responseData));
  } catch (error) {
    console.log(error);
    yield put(
      getSingleBlogFailure(error.response?.data?.responseData?.message)
    );
  }
}

// ============================================================
// ============================================================

function* addBlogSaga({ payload }) {
  try {
    const { responseData, isSuccess } = yield call(addBlogApi, payload);
    yield put(addBlogSuccess(responseData));
    if (isSuccess) {
      yield payload?.toast?.success("تمت الاضافة بنجاح");

      setTimeout(() => {
        payload?.navigate?.("/blogs");
      }, 1000);
    }
  } catch (error) {
    console.log(error);
    yield put(addBlogFailure(error.response?.data?.responseData?.message));
    yield payload?.toast?.error(error.response?.data?.responseData?.message);
  }
}

// ============================================================
// ============================================================

function* updateBlogSaga({ payload }) {
  try {
    const { responseData, isSuccess } = yield call(updateBlogApi, payload);
    yield put(updateBlogSuccess(responseData));
    if (isSuccess) {
      yield payload?.toast?.success("تم التعديل بنجاح");

      setTimeout(() => {
        payload?.navigate?.("/blogs");
      }, 1000);
    }
  } catch (error) {
    console.log(error);
    yield put(updateBlogFailure(error.response?.data?.responseData?.message));
  }
}

// ============================================================
// ============================================================

function* deleteBlogSaga({ payload }) {
  try {
    const { responseData, isSuccess, message } = yield call(
      deleteBlogApi,
      payload
    );
    yield put(deleteBlogSuccess(responseData));
    if (isSuccess) {
      yield payload?.setShow(false);
      yield payload?.toast?.success("تم الحذف بنجاح");
      yield put(
        getBlogs({
          lang: payload?.lang || "ar",
          PageNumber: 1,
          PageSize: 10,
        })
      );
    } else {
      yield payload?.toast?.error(message || "حدث خطأ ما أثناء الحذف");
    }
  } catch (error) {
    console.log(error);
    yield put(deleteBlogFailure(error.response?.data?.responseData?.message));
    yield payload?.toast?.error("حدث خطأ ما أثناء الحذف");
  }
}

// ============================================================
// ============================================================

export function* watchGetAllBlogs() {
  yield takeEvery(GET_ALL_BLOGS, getAllBlogsSaga);
}

// ============================================================

export function* watchGetSingleBlog() {
  yield takeEvery(GET_SINGLE_BLOG, getSingleBlogSaga);
}

// ============================================================

export function* watchAddBlog() {
  yield takeEvery(ADD_BLOG, addBlogSaga);
}

// ============================================================

export function* watchUpdateBlog() {
  yield takeEvery(UPDATE_BLOG, updateBlogSaga);
}

// ============================================================

export function* watchDeleteBlog() {
  yield takeEvery(DELETE_BLOG, deleteBlogSaga);
}

// ============================================================
// ============================================================

function* blogsSaga() {
  yield all([fork(watchGetAllBlogs)]);
  yield all([fork(watchGetSingleBlog)]);
  yield all([fork(watchAddBlog)]);
  yield all([fork(watchUpdateBlog)]);
  yield all([fork(watchDeleteBlog)]);
}

export default blogsSaga;
