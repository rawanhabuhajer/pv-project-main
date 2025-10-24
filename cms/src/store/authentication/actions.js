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
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  ASSIGN_COMPANY,
  ASSIGN_COMPANY_SUCCESS,
  ASSIGN_COMPANY_FAILURE,
  REMOVE_ASSIGNED_COMPANY,
  REMOVE_ASSIGNED_COMPANY_SUCCESS,
  REMOVE_ASSIGNED_COMPANY_FAILURE,
  GET_USER_CONTROL_BOARD_FAILURE,
  GET_USER_CONTROL_BOARD_SUCCESS,
  GET_USER_CONTROL_BOARD,
  GET_USER_AUDIT_HISTORY_FAILURE,
  GET_USER_AUDIT_HISTORY_SUCCESS,
  GET_USER_AUDIT_HISTORY,
  ADD_USER_MODULE_FAILURE,
  ADD_USER_MODULE_SUCCESS,
  ADD_USER_MODULE,
  UPDATE_USER_MODULES_FAILURE,
  UPDATE_USER_MODULES_SUCCESS,
  UPDATE_USER_MODULES,
  GET_ALL_MODULES_FAILURE,
  GET_ALL_MODULES_SUCCESS,
  GET_ALL_MODULES,
  GET_USER_MODULES,
  GET_USER_MODULES_SUCCESS,
  GET_USER_MODULES_FAILURE,
  GET_WIN_RATE_PER_QUARTER,
  GET_WIN_RATE_PER_QUARTER_SUCCESS,
  GET_WIN_RATE_PER_QUARTER_FAILURE,
  ASSIGN_USER,
  ASSIGN_USER_SUCCESS,
  ASSIGN_USER_FAILURE,
  REMOVE_ASSIGNED_USER,
  REMOVE_ASSIGNED_USER_SUCCESS,
  REMOVE_ASSIGNED_USER_FAILURE,
  GET_HEALTH_STATUS,
  GET_HEALTH_STATUS_SUCCESS,
  GET_HEALTH_STATUS_FAILURE,
  GET_USER_COLLABORATORS,
  GET_USER_COLLABORATORS_SUCCESS,
  GET_USER_COLLABORATORS_FAILURE,
  ADD_KEYWORDS,
  ADD_KEYWORDS_SUCCESS,
  ADD_KEYWORDS_FAILURE,
  GET_KEYWORDS,
  GET_KEYWORDS_SUCCESS,
  GET_KEYWORDS_FAILURE,
  TOGGLE_FREE_TRIAL,
  TOGGLE_FREE_TRIAL_SUCCESS,
  TOGGLE_FREE_TRIAL_FAILURE,
  CREATE_NEW_ACCOUNT,
  CREATE_NEW_ACCOUNT_SUCCESS,
  CREATE_NEW_ACCOUNT_FAILURE,
  GET_ALL_COMPANIES,
  GET_ALL_COMPANIES_SUCCESS,
  GET_ALL_COMPANIES_FAILURE,
  GET_COMPANY_INFO,
  GET_COMPANY_INFO_SUCCESS,
  GET_COMPANY_INFO_FAILURE,
  UPDATE_COMPANY_INFO,
  UPDATE_COMPANY_INFO_SUCCESS,
  UPDATE_COMPANY_INFO_FAILURE,
  TOOGLE_USER_LOGIN_MULTI_DEVICES,
  TOOGLE_USER_LOGIN_MULTI_DEVICES_SUCCESS,
  TOOGLE_USER_LOGIN_MULTI_DEVICES_FAILURE,
  UNVERIFY_USER,
  UNVERIFY_USER_SUCCESS,
  UNVERIFY_USER_FAILURE,
} from "./actionTypes";

export const loginUser = (payload) => {
  return {
    type: LOGIN_USER,
    payload,
  };
};

export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

// ========================================================
// ========================================================

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
  };
};

// ========================================================
// ========================================================

export const getCurrentUser = () => {
  return {
    type: CURRENT_USER,
  };
};

export const getCurrentUserSuccess = (payload) => {
  return {
    type: CURRENT_USER_SUCCESS,
    payload,
  };
};

export const getCurrentUserFailure = (payload) => {
  return {
    type: CURRENT_USER_FAILURE,
    payload,
  };
};

// ========================================================
// ========================================================

export const forgetPassword = (payload) => {
  return {
    type: FORGET_PASSWORD,
    payload,
  };
};

export const forgetPasswordSuccess = (payload) => {
  return {
    type: FORGET_PASSWORD_SUCCESS,
    payload,
  };
};

export const forgetPasswordFailure = (payload) => {
  return {
    type: FORGET_PASSWORD_FAILURE,
    payload,
  };
};

// ========================================================
// ========================================================

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};

// ========================================================
// ========================================================

export const getUsers = (payload) => {
  return {
    type: GET_USERS,
    payload,
  };
};

export const getUsersSuccess = (payload) => {
  return {
    type: GET_USERS_SUCCESS,
    payload,
  };
};

export const getUsersFailure = (payload) => {
  return {
    type: GET_USERS_FAILURE,
    payload,
  };
};

// ========================================================
// ========================================================

export const verifyUser = (payload) => {
  return {
    type: VERIFY_USER,
    payload,
  };
};

export const verifyUserSuccess = (payload) => {
  return {
    type: VERIFY_USER_SUCCESS,
    payload,
  };
};

export const verifyUserFailure = (payload) => {
  return {
    type: VERIFY_USER_FAILURE,
    payload,
  };
};

// ========================================================
// ========================================================

export const unVerifyUser = (payload) => {
  return {
    type: UNVERIFY_USER,
    payload,
  };
};

export const unVerifyUserSuccess = (payload) => {
  return {
    type: UNVERIFY_USER_SUCCESS,
    payload,
  };
};

export const unVerifyUserFailure = (payload) => {
  return {
    type: UNVERIFY_USER_FAILURE,
    payload,
  };
};

// ========================================================
// ========================================================

export const deleteUser = (payload) => {
  return {
    type: DELETE_USER,
    payload,
  };
};

export const deleteUserSuccess = (payload) => {
  return {
    type: DELETE_USER_SUCCESS,
    payload,
  };
};

export const deleteUserFailure = (payload) => {
  return {
    type: DELETE_USER_FAILURE,
    payload,
  };
};

// ========================================================
// ========================================================

export const updateUser = (payload) => {
  return {
    type: UPDATE_USER,
    payload,
  };
};

export const updateUserSuccess = (payload) => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload,
  };
};

export const updateUserFailure = (payload) => {
  return {
    type: UPDATE_USER_FAILURE,
    payload,
  };
};

// ========================================================
// ========================================================

export const getUser = (payload) => {
  return {
    type: GET_USER,
    payload,
  };
};

export const getUserSuccess = (payload) => {
  return {
    type: GET_USER_SUCCESS,
    payload,
  };
};

export const getUserFailure = (payload) => {
  return {
    type: GET_USER_FAILURE,
    payload,
  };
};

// ========================================================
// ========================================================

export const assignCompany = (payload) => {
  return {
    type: ASSIGN_COMPANY,
    payload,
  };
};

export const assignCompanySuccess = (payload) => {
  return {
    type: ASSIGN_COMPANY_SUCCESS,
    payload,
  };
};

export const assignCompanyFailure = (payload) => {
  return {
    type: ASSIGN_COMPANY_FAILURE,
    payload,
  };
};

// ========================================================
// ========================================================

export const removeAssignedCompany = (payload) => {
  return {
    type: REMOVE_ASSIGNED_COMPANY,
    payload,
  };
};

export const removeAssignedCompanySuccess = (payload) => {
  return {
    type: REMOVE_ASSIGNED_COMPANY_SUCCESS,
    payload,
  };
};

export const removeAssignedCompanyFailure = (payload) => {
  return {
    type: REMOVE_ASSIGNED_COMPANY_FAILURE,
    payload,
  };
};

// ========================================================
// ========================================================

export const getUserAuditHistory = (payload) => {
  return {
    type: GET_USER_AUDIT_HISTORY,
    payload,
  };
};

export const getUserAuditHistorySuccess = (payload) => {
  return {
    type: GET_USER_AUDIT_HISTORY_SUCCESS,
    payload,
  };
};

export const getUserAuditHistoryFailure = (payload) => {
  return {
    type: GET_USER_AUDIT_HISTORY_FAILURE,
    payload,
  };
};

// ========================================================
// ========================================================

export const getUserControlBoard = (payload) => {
  return {
    type: GET_USER_CONTROL_BOARD,
    payload,
  };
};

export const getUserControlBoardSuccess = (payload) => {
  return {
    type: GET_USER_CONTROL_BOARD_SUCCESS,
    payload,
  };
};

export const getUserControlBoardFailure = (payload) => {
  return {
    type: GET_USER_CONTROL_BOARD_FAILURE,
    payload,
  };
};

// ========================================================
// ========================================================

export const getAllModules = () => {
  return {
    type: GET_ALL_MODULES,
  };
};

export const getAllModulesSuccess = (payload) => {
  return {
    type: GET_ALL_MODULES_SUCCESS,
    payload,
  };
};

export const getAllModulesFailure = (payload) => {
  return {
    type: GET_ALL_MODULES_FAILURE,
    payload,
  };
};

// ========================================================
// ========================================================

export const updateUserModules = (payload) => {
  return {
    type: UPDATE_USER_MODULES,
    payload,
  };
};

export const updateUserModulesSuccess = (payload) => {
  return {
    type: UPDATE_USER_MODULES_SUCCESS,
    payload,
  };
};

export const updateUserModulesFailure = (payload) => {
  return {
    type: UPDATE_USER_MODULES_FAILURE,
    payload,
  };
};

// ========================================================
// ========================================================

export const addUserModule = (payload) => {
  return {
    type: ADD_USER_MODULE,
    payload,
  };
};

export const addUserModuleSuccess = (payload) => {
  return {
    type: ADD_USER_MODULE_SUCCESS,
    payload,
  };
};

export const addUserModuleFailure = (payload) => {
  return {
    type: ADD_USER_MODULE_FAILURE,
    payload,
  };
};

// ========================================================
// ========================================================

export const getUserModules = (payload) => {
  return {
    type: GET_USER_MODULES,
    payload,
  };
};

export const getUserModulesSuccess = (payload) => {
  return {
    type: GET_USER_MODULES_SUCCESS,
    payload,
  };
};

export const getUserModulesFailure = (payload) => {
  return {
    type: GET_USER_MODULES_FAILURE,
    payload,
  };
};

// ========================================================
// ========================================================

export const getWinRatePerQuarter = (payload) => {
  return {
    type: GET_WIN_RATE_PER_QUARTER,
    payload,
  };
};

export const getWinRatePerQuarterSuccess = (payload) => {
  return {
    type: GET_WIN_RATE_PER_QUARTER_SUCCESS,
    payload,
  };
};

export const getWinRatePerQuarterFailure = (payload) => {
  return {
    type: GET_WIN_RATE_PER_QUARTER_FAILURE,
    payload,
  };
};

// ========================================================
// ========================================================

export const assignUser = (payload) => {
  return {
    type: ASSIGN_USER,
    payload,
  };
};

export const assignUserSuccess = (payload) => {
  return {
    type: ASSIGN_USER_SUCCESS,
    payload,
  };
};

export const assignUserFailure = (payload) => {
  return {
    type: ASSIGN_USER_FAILURE,
    payload,
  };
};

// ========================================================
// ========================================================

export const removeAssignedUser = (payload) => {
  return {
    type: REMOVE_ASSIGNED_USER,
    payload,
  };
};

export const removeAssignedUserSuccess = (payload) => {
  return {
    type: REMOVE_ASSIGNED_USER_SUCCESS,
    payload,
  };
};

export const removeAssignedUserFailure = (payload) => {
  return {
    type: REMOVE_ASSIGNED_USER_FAILURE,
    payload,
  };
};

// ========================================================
// ========================================================

export const getHealthStatus = (payload) => {
  return {
    type: GET_HEALTH_STATUS,
    payload,
  };
};

export const getHealthStatusSuccess = (payload) => {
  return {
    type: GET_HEALTH_STATUS_SUCCESS,
    payload,
  };
};

export const getHealthStatusFailure = (payload) => {
  return {
    type: GET_HEALTH_STATUS_FAILURE,
    payload,
  };
};

// ========================================================
// ========================================================

export const getUserCollaborators = (payload) => {
  return {
    type: GET_USER_COLLABORATORS,
    payload,
  };
};

export const getUserCollaboratorsSuccess = (payload) => {
  return {
    type: GET_USER_COLLABORATORS_SUCCESS,
    payload,
  };
};

export const getUserCollaboratorsFailure = (payload) => {
  return {
    type: GET_USER_COLLABORATORS_FAILURE,
    payload,
  };
};

// ========================================================
// ========================================================

export const AddKeyWords = (payload) => {
  return {
    type: ADD_KEYWORDS,
    payload,
  };
};

export const AddKeyWordsSuccess = (payload) => {
  return {
    type: ADD_KEYWORDS_SUCCESS,
    payload,
  };
};

export const AddKeyWordsFailure = (payload) => {
  return {
    type: ADD_KEYWORDS_FAILURE,
    payload,
  };
};

// ========================================================
// ========================================================

export const getKeyWords = (payload) => {
  return {
    type: GET_KEYWORDS,
    payload,
  };
};

export const getKeyWordsSuccess = (payload) => {
  return {
    type: GET_KEYWORDS_SUCCESS,
    payload,
  };
};

export const getKeyWordsFailure = (payload) => {
  return {
    type: GET_KEYWORDS_FAILURE,
    payload,
  };
};

// ========================================================
// ========================================================

export const toggleFreeTrial = (payload) => {
  return {
    type: TOGGLE_FREE_TRIAL,
    payload,
  };
};

export const toggleFreeTrialSuccess = (payload) => {
  return {
    type: TOGGLE_FREE_TRIAL_SUCCESS,
    payload,
  };
};

export const toggleFreeTrialFailure = (payload) => {
  return {
    type: TOGGLE_FREE_TRIAL_FAILURE,
    payload,
  };
};

// ========================================================
// ========================================================

export const createNewAccount = (payload) => {
  return {
    type: CREATE_NEW_ACCOUNT,
    payload,
  };
};

export const createNewAccountSuccess = (payload) => {
  return {
    type: CREATE_NEW_ACCOUNT_SUCCESS,
    payload,
  };
};

export const createNewAccountFailure = (payload) => {
  return {
    type: CREATE_NEW_ACCOUNT_FAILURE,
    payload,
  };
};

// ========================================================
// ========================================================

export const getAllCompanies = (payload) => {
  return {
    type: GET_ALL_COMPANIES,
    payload,
  };
};

export const getAllCompaniesSuccess = (payload) => {
  return {
    type: GET_ALL_COMPANIES_SUCCESS,
    payload,
  };
};

export const getAllCompaniesFailure = (payload) => {
  return {
    type: GET_ALL_COMPANIES_FAILURE,
    payload,
  };
};

// ========================================================
// ========================================================

export const getCompanyInfo = (payload) => {
  return {
    type: GET_COMPANY_INFO,
    payload,
  };
};

export const getCompanyInfoSuccess = (payload) => {
  return {
    type: GET_COMPANY_INFO_SUCCESS,
    payload,
  };
};

export const getCompanyInfoFailure = (payload) => {
  return {
    type: GET_COMPANY_INFO_FAILURE,
    payload,
  };
};

// ====================================================
// ====================================================

export const updateCompanyInfo = (payload) => {
  return {
    type: UPDATE_COMPANY_INFO,
    payload,
  };
};

export const updateCompanyInfoSuccess = (payload) => {
  return {
    type: UPDATE_COMPANY_INFO_SUCCESS,
    payload,
  };
};

export const updateCompanyInfoFailure = (payload) => {
  return {
    type: UPDATE_COMPANY_INFO_FAILURE,
    payload,
  };
};

// ====================================================
// ====================================================

export const toggleUserLoginMultiDevices = (payload) => {
  return {
    type: TOOGLE_USER_LOGIN_MULTI_DEVICES,
    payload,
  };
};

export const toggleUserLoginMultiDevicesSuccess = (payload) => {
  return {
    type: TOOGLE_USER_LOGIN_MULTI_DEVICES_SUCCESS,
    payload,
  };
};

export const toggleUserLoginMultiDevicesFailure = (payload) => {
  return {
    type: TOOGLE_USER_LOGIN_MULTI_DEVICES_FAILURE,
    payload,
  };
};

// ====================================================
// ====================================================
