import { HYDRATE } from "next-redux-wrapper";
import {
  POST_USER_LOGIN,
  POST_USER_LOGIN_SUCCESS,
  POST_USER_LOGIN_FAILURE,
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  POST_USER_REGISTER,
  POST_USER_REGISTER_SUCCESS,
  POST_USER_REGISTER_FAILURE,
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAILURE,
  SEND_CONTACT_MESSAGE,
  SEND_CONTACT_MESSAGE_SUCCESS,
  SEND_CONTACT_MESSAGE_FAILURE,
} from "./actionTypes";

const initialState = {
  user: {},
  isLoggedIn: false,
  loading: false,
  error: "",
};

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      for (const key in action.payload?.user) {
        if (Object.hasOwnProperty.call(action.payload?.user, key)) {
          const element = action.payload?.user[key];
          element === "init" && delete action.payload?.user[key];
        }
      }
      return { ...state, ...action.payload.user };

    case POST_USER_REGISTER:
      return {
        ...state,
        loading: true,
      };
    case POST_USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: false,
      };
    case POST_USER_REGISTER_FAILURE:
      return { ...state, error: JSON.parse(action.payload), loading: false };

    // ====================================================
    // ====================================================

    case POST_USER_LOGIN:
      return {
        ...state,
        loading: true,
      };
    case POST_USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isLoggedIn: true,
        error: false,
      };
    case POST_USER_LOGIN_FAILURE:
      return { ...state, error: JSON.parse(action.payload), loading: false };

    // ====================================================
    // ====================================================

    case GET_USER_PROFILE:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isLoggedIn: true,
        error: false,
      };
    case GET_USER_PROFILE_FAILURE:
      return {
        ...state,
        error: JSON.parse(action.payload),
        user: {},
        isLoggedIn: false,
        loading: false,
      };

    // ====================================================
    // ====================================================

    case LOGOUT_USER:
      return { ...state, loading: true };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: {},
        isLoggedIn: false,
        error: false,
      };
    case LOGOUT_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // ====================================================
    // ====================================================

    case RESET_PASSWORD:
      return { ...state, loading: true };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case RESET_PASSWORD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // ====================================================
    // ====================================================

    case FORGET_PASSWORD:
      return { ...state, loading: true };
    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case FORGET_PASSWORD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // ====================================================
    // ====================================================

    case SEND_CONTACT_MESSAGE:
      return { ...state, loading: true };
    case SEND_CONTACT_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case SEND_CONTACT_MESSAGE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // ====================================================
    // ====================================================

    default:
      return { ...state };
  }
};

export default authentication;
