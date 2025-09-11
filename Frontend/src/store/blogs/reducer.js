import { HYDRATE } from "next-redux-wrapper";
import {
  GET_ALL_BLOGS,
  GET_ALL_BLOGS_SUCCESS,
  GET_ALL_BLOGS_FAILURE,
  GET_SINGLE_BLOG,
  GET_SINGLE_BLOG_SUCCESS,
  GET_SINGLE_BLOG_FAILURE,
  GET_BLOG_CATEGORIES,
  GET_BLOG_CATEGORIES_SUCCESS,
  GET_BLOG_CATEGORIES_FAILURE,
} from "./actionTypes";

const initialState = {
  blogs: [],
  singleBlog: {},
  categories: [],
  isLoggedIn: false,
  loading: false,
  error: "",
};

const blogs = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      for (const key in action.payload?.blogs) {
        if (Object.hasOwnProperty.call(action.payload?.blogs, key)) {
          const element = action.payload?.blogs[key];
          element === "init" && delete action.payload?.blogs[key];
        }
      }
      return { ...state, ...action.payload.blogs };

    case GET_ALL_BLOGS:
      return { ...state, loading: true };

    case GET_ALL_BLOGS_SUCCESS:
      return { ...state, loading: false, blogs: action.payload };

    case GET_ALL_BLOGS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // ====================================================
    // ====================================================

    case GET_SINGLE_BLOG:
      return { ...state, loading: true };

    case GET_SINGLE_BLOG_SUCCESS:
      return { ...state, singleBlog: action.payload, loading: false };

    case GET_SINGLE_BLOG_FAILURE:
      return { ...state, error: action.payload, loading: false };

    // ====================================================
    // ====================================================

    case GET_BLOG_CATEGORIES:
      return { ...state, loading: true };

    case GET_BLOG_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload, loading: false };

    case GET_BLOG_CATEGORIES_FAILURE:
      return { ...state, error: action.payload, loading: false };

    // ====================================================
    // ====================================================

    default:
      return state;
  }
};

export default blogs;
