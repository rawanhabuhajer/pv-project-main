import {
  GET_ADMINS,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_FAILURE,
  GET_ADMIN,
  GET_ADMIN_SUCCESS,
  GET_ADMIN_FAILURE,
  ADD_ADMIN,
  ADD_ADMIN_SUCCESS,
  ADD_ADMIN_FAILURE,
  UPDATE_ADMIN,
  UPDATE_ADMIN_SUCCESS,
  UPDATE_ADMIN_FAILURE,
  DELETE_ADMIN,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_FAILURE,
  GET_ALL_CONTENT_SECTIONS,
  GET_ALL_CONTENT_SECTIONS_SUCCESS,
  GET_ALL_CONTENT_SECTIONS_FAILURE,
} from "./actionTypes";

const initialState = {
  admins: [],
  allContentSections: [],
  admin: {},
  metadata: {},
  isLoggedIn: null,
  loading: false,
  error: "",
};

const admins = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMINS:
      return {
        ...state,
        loading: true,
      };

    case GET_ADMINS_SUCCESS:
      return {
        ...state,
        loading: false,
        admins: action.payload,
      };

    case GET_ADMINS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // ============================================================
    // ============================================================

    case GET_ADMIN:
      return {
        ...state,
        loading: true,
      };

    case GET_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        admin: action.payload,
      };

    case GET_ADMIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // ============================================================
    // ============================================================

    case ADD_ADMIN:
      return {
        ...state,
        loading: true,
      };

    case ADD_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        admins: [...state.admins, action.payload],
      };

    case ADD_ADMIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // ============================================================
    // ============================================================

    case UPDATE_ADMIN:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        admins: state.admins.map((admin) =>
          admin.id === action.payload.id ? action.payload : admin
        ),
      };

    case UPDATE_ADMIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // ============================================================
    // ============================================================

    case DELETE_ADMIN:
      return {
        ...state,
        loading: true,
      };

    case DELETE_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        admins: state.admins.filter(
          (admin) => admin?.id !== action.payload?.id
        ),
      };

    case DELETE_ADMIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // ============================================================
    // ============================================================

    case GET_ALL_CONTENT_SECTIONS:
      return {
        ...state,
        loading: true,
      };

    case GET_ALL_CONTENT_SECTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        allContentSections: action.payload,
      };

    case GET_ALL_CONTENT_SECTIONS_FAILURE:
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

export default admins;
