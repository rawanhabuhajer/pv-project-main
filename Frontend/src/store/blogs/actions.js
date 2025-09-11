import {
  GET_ALL_BLOGS,
  GET_ALL_BLOGS_FAILURE,
  GET_ALL_BLOGS_SUCCESS,
  GET_BLOG_CATEGORIES,
  GET_BLOG_CATEGORIES_FAILURE,
  GET_BLOG_CATEGORIES_SUCCESS,
  GET_SINGLE_BLOG,
  GET_SINGLE_BLOG_FAILURE,
  GET_SINGLE_BLOG_SUCCESS,
} from "./actionTypes";

export const getAllBlogs = (payload) => {
  return {
    type: GET_ALL_BLOGS,
    payload,
  };
};

export const getAllBlogsSuccess = (payload) => {
  return {
    type: GET_ALL_BLOGS_SUCCESS,
    payload,
  };
};

export const getAllBlogsFailure = (payload) => {
  return {
    type: GET_ALL_BLOGS_FAILURE,
    payload,
  };
};

// ====================================================
// ====================================================

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

// ====================================================
// ====================================================

export const getBlogCategories = (payload) => {
  return {
    type: GET_BLOG_CATEGORIES,
    payload,
  };
};

export const getBlogCategoriesSuccess = (payload) => {
  return {
    type: GET_BLOG_CATEGORIES_SUCCESS,
    payload,
  };
};

export const getBlogCategoriesFailure = (payload) => {
  return {
    type: GET_BLOG_CATEGORIES_FAILURE,
    payload,
  };
};

// ====================================================
// ====================================================
