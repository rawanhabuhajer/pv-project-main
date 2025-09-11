import { SET_META, SET_META_FAILURE, SET_META_SUCCESS } from "./actionTypes";

export const setMeta = (payload) => {
  return {
    type: SET_META,
    payload,
  };
};

export const setMetaSuccess = (payload) => {
  return {
    type: SET_META_SUCCESS,
    payload,
  };
};

export const setMetaFailure = (payload) => {
  return {
    type: SET_META_FAILURE,
    payload,
  };
};

// ====================================================
// ====================================================
