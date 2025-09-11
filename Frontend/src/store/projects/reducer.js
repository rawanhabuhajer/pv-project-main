import { HYDRATE } from "next-redux-wrapper";
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
  GET_PROJECT_SUB_BY_ID,
  GET_PROJECT_SUB_BY_ID_FAILURE,
  GET_PROJECT_SUB_BY_ID_SUCCESS,
  ADD_PROJECT_SUB_BY_ID,
  ADD_PROJECT_SUB_BY_ID_FAILURE,
  ADD_PROJECT_SUB_BY_ID_SUCCESS,
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

const initialState = {
  pvProjects: [],
  pvSubProjects: [],
  pvSubProjectsData: {},
  MvProjects: [],
  MvSubProjectsData: {},
  profileLoading: false,
  isLoggedIn: false,
  loading: false,
  error: "",
  page: 1,
};

const projects = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      for (const key in action.payload?.projects) {
        if (Object.hasOwnProperty.call(action.payload?.projects, key)) {
          const element = action.payload?.projects[key];
          element === "init" && delete action.payload?.projects[key];
        }
      }
      return { ...state, ...action.payload.projects };

    case GET_PV_PROJECTS:
      return { ...state, pvProjectsLoading: true };

    case GET_PV_PROJECTS_SUCCESS:
      return {
        ...state,
        pvProjects: action.payload.items,
        pvProjectsMeta: {
          pageNumber: action.payload.pageIndex,
          pageSize: action.payload.pageSize,
          count: action.payload.count,
        },
        pvProjectsLoading: false,
      };

    case GET_PV_PROJECTS_FAILURE:
      return { ...state, error: action.payload, pvProjectsLoading: false };

    // ====================================================
    // ====================================================

    case EDIT_PV_PROJECT:
      return { ...state, editPvProjectLoading: true };

    case EDIT_PV_PROJECT_SUCCESS:
      return { ...state, tender: action.payload, editPvProjectLoading: false };

    case EDIT_PV_PROJECT_FAILURE:
      return { ...state, error: action.payload, editPvProjectLoading: false };

    // ====================================================
    // ====================================================

    case ADD_PV_PROJECT:
      return {
        ...state,
        addPvProjectsLoading: true,
      };

    case ADD_PV_PROJECT_SUCCESS:
      return {
        ...state,
        addPvProjectsLoading: false,
        AddPvProject: action.payload,
      };

    case ADD_PV_PROJECT_FAILURE:
      return { ...state, error: action.payload, addPvProjectsLoading: false };

    // ====================================================
    // ====================================================

    case DELETE_PV_PROJECT:
      return {
        ...state,
        deletePvProjectsLoading: true,
      };

    case DELETE_PV_PROJECT_SUCCESS:
      return {
        ...state,
        deletePvProjectsLoading: false,
        deletePvProject: action.payload,
      };

    case DELETE_PV_PROJECT_FAILURE:
      return {
        ...state,
        error: action.payload,
        deletePvProjectsLoading: false,
      };

    // ====================================================
    // ====================================================
    // ====================================================
    // ====================================================

    case GET_PROJECT_SUB_BY_ID:
      return { ...state, pvSubProjectsLoading: true };

    case GET_PROJECT_SUB_BY_ID_SUCCESS:
      return {
        ...state,
        pvSubProjects: action.payload.items,
        SubProjectsMeta: {
          pageNumber: action.payload.pageIndex,
          pageSize: action.payload.pageSize,
          count: action.payload.count,
          categoryName: action?.payload?.categoryName,
        },
        pvSubProjectsLoading: false,
      };

    case GET_PROJECT_SUB_BY_ID_FAILURE:
      return { ...state, error: action.payload, pvSubProjectsLoading: false };

    // ====================================================
    // ====================================================

    case EDIT_PROJECT_SUB_BY_ID:
      return { ...state, editSubPvProjectLoading: true };

    case EDIT_PROJECT_SUB_BY_ID_SUCCESS:
      return {
        ...state,
        editSubPvProject: action.payload,
        editSubPvProjectLoading: false,
      };

    case EDIT_PROJECT_SUB_BY_ID_FAILURE:
      return {
        ...state,
        error: action.payload,
        editSubPvProjectLoading: false,
      };

    // ====================================================
    // ====================================================

    case ADD_PROJECT_SUB_BY_ID:
      return {
        ...state,
        addSubPvProjectsLoading: true,
      };

    case ADD_PROJECT_SUB_BY_ID_SUCCESS:
      return {
        ...state,
        addSubPvProjectsLoading: false,
        AddSubPvProject: action.payload,
      };

    case ADD_PROJECT_SUB_BY_ID_FAILURE:
      return {
        ...state,
        error: action.payload,
        addSubPvProjectsLoading: false,
      };

    // ====================================================
    // ====================================================

    case DELETE_PROJECT_SUB_BY_ID:
      return {
        ...state,
        deleteSubPvProjectsLoading: true,
      };

    case DELETE_PROJECT_SUB_BY_ID_SUCCESS:
      return {
        ...state,
        deleteSubPvProjectsLoading: false,
        deleteSubPvProject: action.payload,
      };

    case DELETE_PROJECT_SUB_BY_ID_FAILURE:
      return {
        ...state,
        error: action.payload,
        deleteSubPvProjectsLoading: false,
      };

    // ====================================================
    // ====================================================

    // ====================================================
    // ====================================================

    case GET_SUB_PROJECT_DATA_BY_ID:
      return { ...state, pvSubProjectsLoading: true };

    case GET_SUB_PROJECT_DATA_BY_ID_SUCCESS:
      return {
        ...state,
        pvSubProjectsData: action.payload,
        // pvSubProjectsDataMeta: {
        //   pageNumber: action.payload.pageIndex,
        //   pageSize: action.payload.pageSize,
        //   count: action.payload.count,
        // },
        pvSubProjectsDataLoading: false,
      };

    case GET_SUB_PROJECT_DATA_BY_ID_FAILURE:
      return {
        ...state,
        error: action.payload,
        pvSubProjectsDataLoading: false,
      };

    // ====================================================
    // ====================================================

    case EDIT_SUB_PROJECT_DATA_BY_ID:
      return { ...state, editPvSubProjectsDataLoading: true };

    case EDIT_SUB_PROJECT_DATA_BY_ID_SUCCESS:
      return {
        ...state,
        editPvSubProjectsData: action.payload,
        editPvSubProjectsDataLoading: false,
      };

    case EDIT_SUB_PROJECT_DATA_BY_ID_FAILURE:
      return {
        ...state,
        error: action.payload,
        editPvSubProjectsDataLoading: false,
      };

    // ====================================================
    // ====================================================
    // ====================================================
    // ====================================================

    case GET_MV_PROJECTS:
      return { ...state, MvProjectsLoading: true };

    case GET_MV_PROJECTS_SUCCESS:
      return {
        ...state,
        MvProjects: action.payload.items,
        MvProjectsMeta: {
          pageNumber: action.payload.pageIndex,
          pageSize: action.payload.pageSize,
          count: action.payload.count,
        },
        MvProjectsLoading: false,
      };

    case GET_MV_PROJECTS_FAILURE:
      return { ...state, error: action.payload, MvProjectsLoading: false };

    // ====================================================
    // ====================================================

    case EDIT_MV_PROJECT:
      return { ...state, editMvProjectLoading: true };

    case EDIT_MV_PROJECT_SUCCESS:
      return { ...state, tender: action.payload, editMvProjectLoading: false };

    case EDIT_MV_PROJECT_FAILURE:
      return { ...state, error: action.payload, editMvProjectLoading: false };

    // ====================================================
    // ====================================================

    case ADD_MV_PROJECT:
      return {
        ...state,
        addMvProjectsLoading: true,
      };

    case ADD_MV_PROJECT_SUCCESS:
      return {
        ...state,
        addMvProjectsLoading: false,
        AddMvProject: action.payload,
      };

    case ADD_MV_PROJECT_FAILURE:
      return { ...state, error: action.payload, addMvProjectsLoading: false };

    // ====================================================
    // ====================================================

    case DELETE_MV_PROJECT:
      return {
        ...state,
        deleteMvProjectsLoading: true,
      };

    case DELETE_MV_PROJECT_SUCCESS:
      return {
        ...state,
        deleteMvProjectsLoading: false,
        deleteMvProject: action.payload,
      };

    case DELETE_MV_PROJECT_FAILURE:
      return {
        ...state,
        error: action.payload,
        deleteMvProjectsLoading: false,
      };

    // ====================================================
    // ====================================================

    case GET_SINGLE_MV_PROJECT_DATA:
      return { ...state, MvSingleProjectsLoading: true };

    case GET_SINGLE_MV_PROJECT_DATA_SUCCESS:
      return {
        ...state,
        MvSingleProjectsData: action.payload,
        MvSingleProjectsDataLoading: false,
      };

    case GET_SINGLE_MV_PROJECT_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
        MvSingleProjectsDataLoading: false,
      };

    // ====================================================
    // ====================================================

    case EDIT_SINGLE_MV_PROJECT_DATA:
      return { ...state, editMvSingleProjectsDataLoading: true };

    case EDIT_SINGLE_MV_PROJECT_DATA_SUCCESS:
      return {
        ...state,
        editMvSingleProjectsData: action.payload,
        editMvSingleProjectsDataLoading: false,
      };

    case EDIT_SINGLE_MV_PROJECT_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
        editMvSingleProjectsDataLoading: false,
      };

    // ====================================================
    // ====================================================

    default:
      return state;
  }
};

export default projects;
