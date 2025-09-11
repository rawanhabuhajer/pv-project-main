import {
  GET_PV_PROJECTS,
  GET_PV_PROJECTS_FAILURE,
  GET_PV_PROJECTS_SUCCESS,
  ADD_PV_PROJECT,
  ADD_PV_PROJECT_FAILURE,
  ADD_PV_PROJECT_SUCCESS,
  EDIT_PV_PROJECT,
  EDIT_PV_PROJECT_FAILURE,
  EDIT_PV_PROJECT_SUCCESS,
  DELETE_PV_PROJECT,
  DELETE_PV_PROJECT_FAILURE,
  DELETE_PV_PROJECT_SUCCESS,
  ADD_PROJECT_SUB_BY_ID,
  ADD_PROJECT_SUB_BY_ID_FAILURE,
  ADD_PROJECT_SUB_BY_ID_SUCCESS,
  GET_PROJECT_SUB_BY_ID_FAILURE,
  GET_PROJECT_SUB_BY_ID,
  GET_PROJECT_SUB_BY_ID_SUCCESS,
  EDIT_PROJECT_SUB_BY_ID,
  EDIT_PROJECT_SUB_BY_ID_FAILURE,
  EDIT_PROJECT_SUB_BY_ID_SUCCESS,
  DELETE_PROJECT_SUB_BY_ID,
  DELETE_PROJECT_SUB_BY_ID_FAILURE,
  DELETE_PROJECT_SUB_BY_ID_SUCCESS,
  GET_SUB_PROJECT_DATA_BY_ID,
  GET_SUB_PROJECT_DATA_BY_ID_FAILURE,
  GET_SUB_PROJECT_DATA_BY_ID_SUCCESS,
  EDIT_SUB_PROJECT_DATA_BY_ID,
  EDIT_SUB_PROJECT_DATA_BY_ID_FAILURE,
  EDIT_SUB_PROJECT_DATA_BY_ID_SUCCESS,
  GET_MV_PROJECTS,
  GET_MV_PROJECTS_FAILURE,
  GET_MV_PROJECTS_SUCCESS,
  ADD_MV_PROJECT,
  ADD_MV_PROJECT_FAILURE,
  ADD_MV_PROJECT_SUCCESS,
  EDIT_MV_PROJECT,
  EDIT_MV_PROJECT_FAILURE,
  EDIT_MV_PROJECT_SUCCESS,
  DELETE_MV_PROJECT,
  DELETE_MV_PROJECT_FAILURE,
  DELETE_MV_PROJECT_SUCCESS,
  GET_SINGLE_MV_PROJECT_DATA,
  GET_SINGLE_MV_PROJECT_DATA_FAILURE,
  GET_SINGLE_MV_PROJECT_DATA_SUCCESS,
  EDIT_SINGLE_MV_PROJECT_DATA,
  EDIT_SINGLE_MV_PROJECT_DATA_FAILURE,
  EDIT_SINGLE_MV_PROJECT_DATA_SUCCESS,
} from "./actionTypes";

export const getPvProjects = (payload) => {
  return {
    type: GET_PV_PROJECTS,
    payload,
  };
};

export const getPvProjectsSuccess = (payload) => {
  return {
    type: GET_PV_PROJECTS_SUCCESS,
    payload,
  };
};

export const getPvProjectsFailure = (payload) => {
  return {
    type: GET_PV_PROJECTS_FAILURE,
    payload,
  };
};

// ====================================================
// ====================================================

export const addPvProjects = (payload) => {
  return {
    type: ADD_PV_PROJECT,
    payload,
  };
};

export const addPvProjectsSuccess = (payload) => {
  return {
    type: ADD_PV_PROJECT_SUCCESS,
    payload,
  };
};

export const addPvProjectsFailure = (payload) => {
  return {
    type: ADD_PV_PROJECT_FAILURE,
    payload,
  };
};

// ====================================================
// ====================================================

export const editPvProjects = (payload) => {
  return {
    type: EDIT_PV_PROJECT,
    payload,
  };
};

export const editPvProjectsSuccess = (payload) => {
  return {
    type: EDIT_PV_PROJECT_SUCCESS,
    payload,
  };
};

export const editPvProjectsFailure = (payload) => {
  return {
    type: EDIT_PV_PROJECT_FAILURE,
    payload,
  };
};

// ====================================================
// ====================================================

export const deletePvProjects = (payload) => {
  return {
    type: DELETE_PV_PROJECT,
    payload,
  };
};

export const deletePvProjectsSuccess = (payload) => {
  return {
    type: DELETE_PV_PROJECT_SUCCESS,
    payload,
  };
};

export const deletePvProjectsFailure = (payload) => {
  return {
    type: DELETE_PV_PROJECT_FAILURE,
    payload,
  };
};

// ====================================================
// ====================================================

export const getProjectSubById = (payload) => {
  return {
    type: GET_PROJECT_SUB_BY_ID,
    payload,
  };
};

export const getProjectSubByIdSuccess = (payload) => {
  return {
    type: GET_PROJECT_SUB_BY_ID_SUCCESS,
    payload,
  };
};

export const getProjectSubByIdFailure = (payload) => {
  return {
    type: GET_PROJECT_SUB_BY_ID_FAILURE,
    payload,
  };
};

// ====================================================
// ====================================================

export const addProjectSubById = (payload) => {
  return {
    type: ADD_PROJECT_SUB_BY_ID,
    payload,
  };
};

export const addProjectSubByIdSuccess = (payload) => {
  return {
    type: ADD_PROJECT_SUB_BY_ID_SUCCESS,
    payload,
  };
};

export const addProjectSubByIdFailure = (payload) => {
  return {
    type: ADD_PROJECT_SUB_BY_ID_FAILURE,
    payload,
  };
};

// ====================================================
// ====================================================

export const editProjectSubById = (payload) => {
  return {
    type: EDIT_PROJECT_SUB_BY_ID,
    payload,
  };
};

export const editProjectSubByIdSuccess = (payload) => {
  return {
    type: EDIT_PROJECT_SUB_BY_ID_SUCCESS,
    payload,
  };
};

export const editProjectSubByIdFailure = (payload) => {
  return {
    type: EDIT_PROJECT_SUB_BY_ID_FAILURE,
    payload,
  };
};

// ====================================================
// ====================================================

export const deleteProjectSubById = (payload) => {
  return {
    type: DELETE_PROJECT_SUB_BY_ID,
    payload,
  };
};

export const deleteProjectSubByIdSuccess = (payload) => {
  return {
    type: DELETE_PROJECT_SUB_BY_ID_SUCCESS,
    payload,
  };
};

export const deleteProjectSubByIdFailure = (payload) => {
  return {
    type: DELETE_PROJECT_SUB_BY_ID_FAILURE,
    payload,
  };
};

// ====================================================
// ====================================================

export const getSubProjectDataById = (payload) => {
  return {
    type: GET_SUB_PROJECT_DATA_BY_ID,
    payload,
  };
};

export const getSubProjectDataByIdSuccess = (payload) => {
  return {
    type: GET_SUB_PROJECT_DATA_BY_ID_SUCCESS,
    payload,
  };
};

export const getSubProjectDataByIdFailure = (payload) => {
  return {
    type: GET_SUB_PROJECT_DATA_BY_ID_FAILURE,
    payload,
  };
};

// ====================================================
// ====================================================

export const editSubProjectDataById = (payload) => {
  return {
    type: EDIT_SUB_PROJECT_DATA_BY_ID,
    payload,
  };
};

export const editSubProjectDataByIdSuccess = (payload) => {
  return {
    type: EDIT_SUB_PROJECT_DATA_BY_ID_SUCCESS,
    payload,
  };
};

export const editSubProjectDataByIdFailure = (payload) => {
  return {
    type: EDIT_SUB_PROJECT_DATA_BY_ID_FAILURE,
    payload,
  };
};

// ====================================================
// ====================================================

export const getMvProjects = (payload) => {
  return {
    type: GET_MV_PROJECTS,
    payload,
  };
};

export const getMvProjectsSuccess = (payload) => {
  return {
    type: GET_MV_PROJECTS_SUCCESS,
    payload,
  };
};

export const getMvProjectsFailure = (payload) => {
  return {
    type: GET_MV_PROJECTS_FAILURE,
    payload,
  };
};

// ====================================================
// ====================================================

export const addMvProjects = (payload) => {
  return {
    type: ADD_MV_PROJECT,
    payload,
  };
};

export const addMvProjectsSuccess = (payload) => {
  return {
    type: ADD_MV_PROJECT_SUCCESS,
    payload,
  };
};

export const addMvProjectsFailure = (payload) => {
  return {
    type: ADD_MV_PROJECT_FAILURE,
    payload,
  };
};

// ====================================================
// ====================================================

export const editMvProjects = (payload) => {
  return {
    type: EDIT_MV_PROJECT,
    payload,
  };
};

export const editMvProjectsSuccess = (payload) => {
  return {
    type: EDIT_MV_PROJECT_SUCCESS,
    payload,
  };
};

export const editMvProjectsFailure = (payload) => {
  return {
    type: EDIT_MV_PROJECT_FAILURE,
    payload,
  };
};

// ====================================================
// ====================================================

export const deleteMvProjects = (payload) => {
  return {
    type: DELETE_MV_PROJECT,
    payload,
  };
};

export const deleteMvProjectsSuccess = (payload) => {
  return {
    type: DELETE_MV_PROJECT_SUCCESS,
    payload,
  };
};

export const deleteMvProjectsFailure = (payload) => {
  return {
    type: DELETE_MV_PROJECT_FAILURE,
    payload,
  };
};

// ====================================================
// ====================================================

export const getSingleProjectDataById = (payload) => {
  return {
    type: GET_SINGLE_MV_PROJECT_DATA,
    payload,
  };
};

export const getSingleProjectDataByIdSuccess = (payload) => {
  return {
    type: GET_SINGLE_MV_PROJECT_DATA_SUCCESS,
    payload,
  };
};

export const getSingleProjectDataByIdFailure = (payload) => {
  return {
    type: GET_SINGLE_MV_PROJECT_DATA_FAILURE,
    payload,
  };
};

// ====================================================
// ====================================================

export const editSingleProjectDataById = (payload) => {
  return {
    type: EDIT_SINGLE_MV_PROJECT_DATA,
    payload,
  };
};

export const editSingleProjectDataByIdSuccess = (payload) => {
  return {
    type: EDIT_SINGLE_MV_PROJECT_DATA_SUCCESS,
    payload,
  };
};

export const editSingleProjectDataByIdFailure = (payload) => {
  return {
    type: EDIT_SINGLE_MV_PROJECT_DATA_FAILURE,
    payload,
  };
};

// ====================================================
// ====================================================
