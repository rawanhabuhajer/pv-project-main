import {
  DELETE_ADMIN,
  DELETE_ADMIN_FAILURE,
  DELETE_ADMIN_SUCCESS,
  GET_ADMINS,
  GET_ADMINS_FAILURE,
  GET_ADMINS_SUCCESS,
  GET_ADMIN,
  GET_ADMIN_FAILURE,
  GET_ADMIN_SUCCESS,
  UPDATE_ADMIN,
  UPDATE_ADMIN_FAILURE,
  UPDATE_ADMIN_SUCCESS,
  ADD_ADMIN,
  ADD_ADMIN_SUCCESS,
  ADD_ADMIN_FAILURE,
  GET_ALL_CONTENT_SECTIONS,
  GET_ALL_CONTENT_SECTIONS_SUCCESS,
  GET_ALL_CONTENT_SECTIONS_FAILURE,
} from "./actionTypes";

export const getAdmins = (payload) => {
  return {
    type: GET_ADMINS,
    payload,
  };
};

export const getAdminsSuccess = (payload) => {
  return {
    type: GET_ADMINS_SUCCESS,
    payload,
  };
};

export const getAdminsFailure = (payload) => {
  return {
    type: GET_ADMINS_FAILURE,
    payload,
  };
};

// ============================================================
// ============================================================

export const getAdmin = (payload) => {
  return {
    type: GET_ADMIN,
    payload,
  };
};

export const getAdminSuccess = (payload) => {
  return {
    type: GET_ADMIN_SUCCESS,
    payload,
  };
};

export const getAdminFailure = (payload) => {
  return {
    type: GET_ADMIN_FAILURE,
    payload,
  };
};

// ============================================================
// ============================================================

export const addAdmin = (payload) => {
  return {
    type: ADD_ADMIN,
    payload,
  };
};

export const addAdminSuccess = (payload) => {
  return {
    type: ADD_ADMIN_SUCCESS,
    payload,
  };
};

export const addAdminFailure = (payload) => {
  return {
    type: ADD_ADMIN_FAILURE,
    payload,
  };
};

// ============================================================
// ============================================================

export const updateAdmin = (payload) => {
  return {
    type: UPDATE_ADMIN,
    payload,
  };
};

export const updateAdminSuccess = (payload) => {
  return {
    type: UPDATE_ADMIN_SUCCESS,
    payload,
  };
};

export const updateAdminFailure = (payload) => {
  return {
    type: UPDATE_ADMIN_FAILURE,
    payload,
  };
};

// ============================================================
// ============================================================

export const deleteAdmin = (payload) => {
  return {
    type: DELETE_ADMIN,
    payload,
  };
};

export const deleteAdminSuccess = (payload) => {
  return {
    type: DELETE_ADMIN_SUCCESS,
    payload,
  };
};

export const deleteAdminFailure = (payload) => {
  return {
    type: DELETE_ADMIN_FAILURE,
    payload,
  };
};

// ============================================================
// ============================================================

export const getAllContentSections = (payload) => {
  return {
    type: GET_ALL_CONTENT_SECTIONS,
    payload,
  };
};

export const getAllContentSectionsSuccess = (payload) => {
  return {
    type: GET_ALL_CONTENT_SECTIONS_SUCCESS,
    payload,
  };
};

export const getAllContentSectionsFailure = (payload) => {
  return {
    type: GET_ALL_CONTENT_SECTIONS_FAILURE,
    payload,
  };
};

// ============================================================
// ============================================================
