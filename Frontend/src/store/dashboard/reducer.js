import { HYDRATE } from "next-redux-wrapper";
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

const initialState = {
  nearDeadlineProjects: {},
  categoriesStatusStats: {},
  pvProjectsCountByYear: null,
  pvProjectsCountByYearLoading: false,
  mvCategoriesStatusStats: null,
  mvCategoriesStatusStatsLoading: false,
  mvProjectsCountByYear: null,
  mvProjectsCountByYearLoading: false,
  latestProjects: {},
  latestProjectsLoading: false,

  isLoggedIn: false,
  loading: false,
  error: "",
  page: 1,
};

const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      for (const key in action.payload?.dashboard) {
        if (Object.hasOwnProperty.call(action.payload?.dashboard, key)) {
          const element = action.payload?.dashboard[key];
          element === "init" && delete action.payload?.dashboard[key];
        }
      }
      return { ...state, ...action.payload.dashboard };

    case GET_NEAR_DEADLINE_PROJECTS:
      return { ...state, nearDeadlineProjectsLoading: true };

    case GET_NEAR_DEADLINE_PROJECTS_SUCCESS:
      return {
        ...state,
        nearDeadlineProjects: action.payload,
        nearDeadlineProjectsLoading: false,
      };

    case GET_NEAR_DEADLINE_PROJECTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        nearDeadlineProjectsLoading: false,
      };

    // ====================================================
    // ====================================================

    case GET_CATEGORIES_STATUS_STATS:
      return { ...state, categoriesStatusStatsLoading: true };

    case GET_CATEGORIES_STATUS_STATS_SUCCESS:
      return {
        ...state,
        categoriesStatusStats: action.payload,
        categoriesStatusStatsLoading: false,
      };

    case GET_CATEGORIES_STATUS_STATS_FAILURE:
      return {
        ...state,
        error: action.payload,
        categoriesStatusStatsLoading: false,
      };

    // ====================================================
    // ====================================================

    // PV
    case GET_PV_PROJECTS_COUNT_BY_YEAR:
      return { ...state, pvProjectsCountByYearLoading: true };

    case GET_PV_PROJECTS_COUNT_BY_YEAR_SUCCESS:
      return {
        ...state,
        pvProjectsCountByYear: action.payload,
        pvProjectsCountByYearLoading: false,
      };

    case GET_PV_PROJECTS_COUNT_BY_YEAR_FAILURE:
      return {
        ...state,
        error: action.payload,
        pvProjectsCountByYearLoading: false,
      };

    // ====================================================
    // ====================================================

    // MV
    case GET_MV_PROJECTS_COUNT_BY_YEAR:
      return { ...state, mvProjectsCountByYearLoading: true };

    case GET_MV_PROJECTS_COUNT_BY_YEAR_SUCCESS:
      return {
        ...state,
        mvProjectsCountByYear: action.payload,
        mvProjectsCountByYearLoading: false,
      };

    case GET_MV_PROJECTS_COUNT_BY_YEAR_FAILURE:
      return {
        ...state,
        error: action.payload,
        mvProjectsCountByYearLoading: false,
      };

    // ====================================================
    // ====================================================

    case GET_MV_CATEGORIES_STATUS_STATS:
      return { ...state, mvCategoriesStatusStatsLoading: true };

    case GET_MV_CATEGORIES_STATUS_STATS_SUCCESS:
      return {
        ...state,
        mvCategoriesStatusStats: action.payload,
        mvCategoriesStatusStatsLoading: false,
      };

    case GET_MV_CATEGORIES_STATUS_STATS_FAILURE:
      return {
        ...state,
        error: action.payload,
        mvCategoriesStatusStatsLoading: false,
      };

    // ====================================================
    // ====================================================

    case GET_LATEST_PROJECTS:
      return { ...state, latestProjectsLoading: true };

    case GET_LATEST_PROJECTS_SUCCESS:
      return {
        ...state,
        latestProjects: action.payload,
        latestProjectsLoading: false,
      };

    case GET_LATEST_PROJECTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        latestProjectsLoading: false,
      };

    // ====================================================
    // ====================================================

    default:
      return state;
  }
};

export default dashboard;
