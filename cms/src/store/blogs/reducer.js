import {
  GET_ALL_BLOGS,
  GET_ALL_BLOGS_SUCCESS,
  GET_ALL_BLOGS_FAILURE,
  GET_SINGLE_BLOG,
  GET_SINGLE_BLOG_SUCCESS,
  GET_SINGLE_BLOG_FAILURE,
  ADD_BLOG,
  ADD_BLOG_SUCCESS,
  ADD_BLOG_FAILURE,
  UPDATE_BLOG,
  UPDATE_BLOG_SUCCESS,
  UPDATE_BLOG_FAILURE,
  DELETE_BLOG,
  DELETE_BLOG_SUCCESS,
  DELETE_BLOG_FAILURE,
} from "./actionTypes";

const initialState = {
  blogs: [],
  singleBlog: {},
  isLoggedIn: null,
  loading: false,
  error: "",
};

const blogs = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BLOGS:
      return {
        ...state,
        loading: true,
      };

    case GET_ALL_BLOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: action.payload,
      };

    case GET_ALL_BLOGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // ============================================================
    // ============================================================

    case GET_SINGLE_BLOG:
      return {
        ...state,
        loading: true,
      };

    case GET_SINGLE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        singleBlog: action.payload,
      };

    case GET_SINGLE_BLOG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // ============================================================
    // ============================================================

    case ADD_BLOG:
      return {
        ...state,
        loading: true,
      };

    case ADD_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        // blogs: [...(state.blogs || []), action.payload],
      };

    case ADD_BLOG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // ============================================================
    // ============================================================

    case UPDATE_BLOG:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        // blogs: state?.blogs?.map((blog) =>
        //   blog.id === action.payload.id ? action.payload : blog
        // ),
      };

    case UPDATE_BLOG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // ============================================================
    // ============================================================

    case DELETE_BLOG:
      return {
        ...state,
        loading: true,
      };

    case DELETE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        // blogs: state.blogs.filter(
        //   (blog) => blog?.slug !== action.payload?.slug
        // ),
      };

    case DELETE_BLOG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // ============================================================
    // ============================================================

    default:
      return state;
  }
};

export default blogs;
