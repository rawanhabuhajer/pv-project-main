import { HYDRATE } from "next-redux-wrapper";
import { SET_META, SET_META_FAILURE, SET_META_SUCCESS } from "./actionTypes";

const initialState = {
  meta: { breadCrumb: {} },
  isLoggedIn: false,
  loading: false,
  error: "",
};

const meta = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      for (const key in action.payload?.meta) {
        if (Object.hasOwnProperty.call(action.payload?.meta, key)) {
          const element = action.payload?.meta[key];
          element === "init" && delete action.payload?.meta[key];
        }
      }
      return { ...state, ...action.payload.meta };

    case SET_META:
      return { ...state, loading: true };

    case SET_META_SUCCESS:
      return {
        ...state,
        loading: false,
        meta: {
          ...state.meta,
          [action.payload.name]: action.payload.value,
        },
      };

    case SET_META_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // ====================================================
    // ====================================================

    default:
      return state;
  }
};

export default meta;
