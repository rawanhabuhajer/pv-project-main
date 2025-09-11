import {
  GET_NEAR_DEADLINE_PROJECTS,
  GET_NEAR_DEADLINE_PROJECTS_FAILURE,
  GET_NEAR_DEADLINE_PROJECTS_SUCCESS,
  GET_CATEGORIES_STATUS_STATS,
  GET_CATEGORIES_STATUS_STATS_FAILURE,
  GET_CATEGORIES_STATUS_STATS_SUCCESS,
  GET_PV_PROJECTS_COUNT_BY_YEAR,
  GET_PV_PROJECTS_COUNT_BY_YEAR_SUCCESS,
  GET_PV_PROJECTS_COUNT_BY_YEAR_FAILURE,
  GET_MV_PROJECTS_COUNT_BY_YEAR,
  GET_MV_PROJECTS_COUNT_BY_YEAR_SUCCESS,
  GET_MV_PROJECTS_COUNT_BY_YEAR_FAILURE,
  GET_MV_CATEGORIES_STATUS_STATS,
  GET_MV_CATEGORIES_STATUS_STATS_SUCCESS,
  GET_MV_CATEGORIES_STATUS_STATS_FAILURE,
  GET_LATEST_PROJECTS,
  GET_LATEST_PROJECTS_SUCCESS,
  GET_LATEST_PROJECTS_FAILURE,
} from "./actionTypes";

export const getNearDeadlineProjects = (payload) => {
  return {
    type: GET_NEAR_DEADLINE_PROJECTS,
    payload,
  };
};

export const getNearDeadlineProjectsSuccess = (payload) => {
  return {
    type: GET_NEAR_DEADLINE_PROJECTS_SUCCESS,
    payload,
  };
};

export const getNearDeadlineProjectsFailure = (payload) => {
  return {
    type: GET_NEAR_DEADLINE_PROJECTS_FAILURE,
    payload,
  };
};

// ====================================================
// ====================================================

export const getCategoriesStatusStats = (payload) => {
  return {
    type: GET_CATEGORIES_STATUS_STATS,
    payload,
  };
};

export const getCategoriesStatusStatsSuccess = (payload) => {
  return {
    type: GET_CATEGORIES_STATUS_STATS_SUCCESS,
    payload,
  };
};

export const getCategoriesStatusStatsFailure = (payload) => {
  return {
    type: GET_CATEGORIES_STATUS_STATS_FAILURE,
    payload,
  };
};

// ====================================================
// ====================================================
// PV
export const getPvProjectsCountByYear = (payload) => ({
  type: GET_PV_PROJECTS_COUNT_BY_YEAR,
  payload,
});

export const getPvProjectsCountByYearSuccess = (payload) => ({
  type: GET_PV_PROJECTS_COUNT_BY_YEAR_SUCCESS,
  payload,
});

export const getPvProjectsCountByYearFailure = (payload) => ({
  type: GET_PV_PROJECTS_COUNT_BY_YEAR_FAILURE,
  payload,
});

// ====================================================
// ====================================================

// MV
export const getMvProjectsCountByYear = (payload) => ({
  type: GET_MV_PROJECTS_COUNT_BY_YEAR,
  payload,
});

export const getMvProjectsCountByYearSuccess = (payload) => ({
  type: GET_MV_PROJECTS_COUNT_BY_YEAR_SUCCESS,
  payload,
});

export const getMvProjectsCountByYearFailure = (payload) => ({
  type: GET_MV_PROJECTS_COUNT_BY_YEAR_FAILURE,
  payload,
});

// ====================================================
// ====================================================
// actions.js
export const getMvCategoriesStatusStats = (payload) => {
  return {
    type: GET_MV_CATEGORIES_STATUS_STATS,
    payload,
  };
};

export const getMvCategoriesStatusStatsSuccess = (payload) => {
  return {
    type: GET_MV_CATEGORIES_STATUS_STATS_SUCCESS,
    payload,
  };
};

export const getMvCategoriesStatusStatsFailure = (payload) => {
  return {
    type: GET_MV_CATEGORIES_STATUS_STATS_FAILURE,
    payload,
  };
};

// ====================================================
// ====================================================

export const getLatestProjects = (payload) => {
  return {
    type: GET_LATEST_PROJECTS,
    payload,
  };
};

export const getLatestProjectsSuccess = (payload) => {
  return {
    type: GET_LATEST_PROJECTS_SUCCESS,
    payload,
  };
};

export const getLatestProjectsFailure = (payload) => {
  return {
    type: GET_LATEST_PROJECTS_FAILURE,
    payload,
  };
};

// ====================================================
// ====================================================
