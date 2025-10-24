import {
  ADD_BLOG,
  ADD_BLOG_FAILURE,
  ADD_BLOG_SUCCESS,
  DELETE_BLOG,
  DELETE_BLOG_FAILURE,
  DELETE_BLOG_SUCCESS,
  GET_ALL_BLOGS,
  GET_ALL_BLOGS_FAILURE,
  GET_ALL_BLOGS_SUCCESS,
  GET_SINGLE_BLOG,
  GET_SINGLE_BLOG_FAILURE,
  GET_SINGLE_BLOG_SUCCESS,
  UPDATE_BLOG,
  UPDATE_BLOG_FAILURE,
  UPDATE_BLOG_SUCCESS,
} from "./actionTypes";

export const getBlogs = (payload) => {
  return {
    type: GET_ALL_BLOGS,
    payload,
  };
};

export const getBlogsSuccess = (payload) => {
  return {
    type: GET_ALL_BLOGS_SUCCESS,
    payload,
  };
};

export const getBlogsFailure = (payload) => {
  return {
    type: GET_ALL_BLOGS_FAILURE,
    payload,
  };
};

// ============================================================
// ============================================================

export const getSingleBlog = (payload) => {
  return {
    type: GET_SINGLE_BLOG,
    payload,
  };
};

export const getSingleBlogSuccess = (payload) => {
  return {
    type: GET_SINGLE_BLOG_SUCCESS,
    payload,
  };
};

export const getSingleBlogFailure = (payload) => {
  return {
    type: GET_SINGLE_BLOG_FAILURE,
    payload,
  };
};

// ============================================================
// ============================================================

export const addBlog = (payload) => {
  return {
    type: ADD_BLOG,
    payload,
  };
};

export const addBlogSuccess = (payload) => {
  return {
    type: ADD_BLOG_SUCCESS,
    payload,
  };
};

export const addBlogFailure = (payload) => {
  return {
    type: ADD_BLOG_FAILURE,
    payload,
  };
};

// ============================================================
// ============================================================

export const updateBlog = (payload) => {
  return {
    type: UPDATE_BLOG,
    payload,
  };
};

export const updateBlogSuccess = (payload) => {
  return {
    type: UPDATE_BLOG_SUCCESS,
    payload,
  };
};

export const updateBlogFailure = (payload) => {
  return {
    type: UPDATE_BLOG_FAILURE,
    payload,
  };
};

// ============================================================
// ============================================================

export const deleteBlog = (payload) => {
  return {
    type: DELETE_BLOG,
    payload,
  };
};

export const deleteBlogSuccess = (payload) => {
  return {
    type: DELETE_BLOG_SUCCESS,
    payload,
  };
};

export const deleteBlogFailure = (payload) => {
  return {
    type: DELETE_BLOG_FAILURE,
    payload,
  };
};

// ============================================================
// ============================================================
