import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  CURRENT_USER,
  CURRENT_USER_SUCCESS,
  CURRENT_USER_FAILURE,
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAILURE,
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  VERIFY_USER,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_FAILURE,
  UNVERIFY_USER,
  UNVERIFY_USER_SUCCESS,
  UNVERIFY_USER_FAILURE,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
  GET_USER,
  CREATE_NEW_ACCOUNT,
  CREATE_NEW_ACCOUNT_SUCCESS,
  CREATE_NEW_ACCOUNT_FAILURE,
} from "./actionTypes";

const initialState = {
  user: {},
  users: [],
  metadata: {},
  singleUser: {},
  isLoggedIn: null,
  loading: false,
  error: "",
};

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
      };
      break;
    case LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
        user: action.payload,
        isLoggedIn: true,
      };
      break;
    case LOGOUT_USER:
      state = {
        ...state,
        loading: true,
      };
      break;
    case LOGOUT_USER_SUCCESS:
      state = {
        ...state,
        loading: false,
        user: {},
        isLoggedIn: false,
      };
      break;
    case CURRENT_USER:
      state = {
        ...state,
        loading: true,
      };
      break;
    case CURRENT_USER_SUCCESS:
      state = {
        ...state,
        loading: false,
        user: action.payload,
        isLoggedIn: true,
      };
      break;

    case CURRENT_USER_FAILURE:
      state = {
        ...state,
        loading: false,
        user: {},
        isLoggedIn: false,
      };
      break;

    case FORGET_PASSWORD:
      state = {
        ...state,
        loading: true,
      };
      break;

    case FORGET_PASSWORD_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;

    case FORGET_PASSWORD_FAILURE:
      state = {
        ...state,
        loading: false,
      };
      break;

    case API_ERROR:
      state = { ...state, error: action.payload, loading: false };
      break;

    // ============================================================
    // ============================================================

    case GET_USERS:
      state = {
        ...state,
        loading: true,
      };
      break;

    case GET_USERS_SUCCESS:
      state = {
        ...state,
        loading: false,
        users: action.payload?.users,
        metadata: {
          count: action.payload?.results,
          pageSize: action.payload?.pageSize,
          pageIndex: action.payload?.pageNumber,
        },
      };
      break;

    case GET_USERS_FAILURE:
      state = {
        ...state,
        loading: false,
      };
      break;

    // ============================================================
    // ============================================================

    case VERIFY_USER:
      state = {
        ...state,
        loading: true,
      };
      break;

    case VERIFY_USER_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;

    case VERIFY_USER_FAILURE:
      state = {
        ...state,
        loading: false,
      };
      break;

    // ============================================================
    // ============================================================

    case UNVERIFY_USER:
      state = {
        ...state,
        loading: true,
      };
      break;

    case UNVERIFY_USER_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;

    case UNVERIFY_USER_FAILURE:
      state = {
        ...state,
        loading: false,
      };
      break;

    // ============================================================
    // ============================================================

    case DELETE_USER:
      state = {
        ...state,
        loading: true,
      };
      break;

    case DELETE_USER_SUCCESS:
      state = {
        ...state,
        loading: false,
        users: state.users.filter((user) => user?.id !== action.payload?.id),
      };
      break;

    case DELETE_USER_FAILURE:
      state = {
        ...state,
        loading: false,
      };
      break;

    // ============================================================
    // ============================================================

    case UPDATE_USER:
      state = {
        ...state,
        loading: true,
      };
      break;

    case UPDATE_USER_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;

    case UPDATE_USER_FAILURE:
      state = {
        ...state,
        loading: false,
      };
      break;

    // ============================================================
    // ============================================================

    case GET_USER:
      state = {
        ...state,
        loading: true,
      };
      break;

    case GET_USER_SUCCESS:
      state = {
        ...state,
        loading: false,
        singleUser: action.payload,
      };
      break;

    case GET_USER_FAILURE:
      state = {
        ...state,
        loading: false,
      };
      break;

 
    // ============================================================
    // ============================================================

    case CREATE_NEW_ACCOUNT:
      state = {
        ...state,
        loading: true,
      };
      break;

    case CREATE_NEW_ACCOUNT_SUCCESS:
      state = {
        ...state,
        loading: false,
        createNewAccount: action.payload,
      };
      break;

    case CREATE_NEW_ACCOUNT_FAILURE:
      state = {
        ...state,
        loading: false,
      };
      break;

  

    // ====================================================
    // ====================================================

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default authentication;
