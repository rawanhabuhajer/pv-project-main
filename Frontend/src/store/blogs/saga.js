import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import {
  getAllBlogsSuccess,
  getAllBlogsFailure,
  getSingleBlogSuccess,
  getSingleBlogFailure,
  getBlogCategoriesSuccess,
  getBlogCategoriesFailure,
} from "./actions";

import {
  getAllBlogsApi,
  getBlogCategoriesApi,
  getSingleBlogApi,
} from "@/api/blogs";
import {
  GET_ALL_BLOGS,
  GET_BLOG_CATEGORIES,
  GET_SINGLE_BLOG,
} from "./actionTypes";

function* getAllBlogsSaga({ payload }) {
  try {
    const { responseData } = yield call(getAllBlogsApi, payload);
    yield put(getAllBlogsSuccess(responseData));
  } catch (error) {
    console.log(error);
    yield put(getAllBlogsFailure(error));
  }
}

// ====================================================
// ====================================================

function* getSingleBlogSaga({ payload }) {
  try {
    const { responseData } = yield call(getSingleBlogApi, payload);
    yield put(getSingleBlogSuccess(responseData));
  } catch (error) {
    console.log(error);
    yield put(getSingleBlogFailure(error));
  }
}

// ====================================================
// ====================================================

function* getBlogCategoriesSaga({ payload }) {
  try {
    const { responseData } = yield call(getBlogCategoriesApi, payload);
    yield put(getBlogCategoriesSuccess(responseData));
  } catch (error) {
    console.log(error);
    yield put(getBlogCategoriesFailure(error));
  }
}

// ====================================================
// ====================================================

export function* watchGetAllBlogs() {
  yield takeEvery(GET_ALL_BLOGS, getAllBlogsSaga);
}

export function* watchGetSingleBlog() {
  yield takeEvery(GET_SINGLE_BLOG, getSingleBlogSaga);
}

export function* watchGetBlogCategories() {
  yield takeEvery(GET_BLOG_CATEGORIES, getBlogCategoriesSaga);
}

// ====================================================
// ====================================================

function* blogsSaga() {
  yield all([fork(watchGetAllBlogs)]);
  yield all([fork(watchGetSingleBlog)]);
  yield all([fork(watchGetBlogCategories)]);
}

export default blogsSaga;
