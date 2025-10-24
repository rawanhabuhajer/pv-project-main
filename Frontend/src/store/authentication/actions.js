import {
  POST_USER_LOGIN,
  POST_USER_LOGIN_SUCCESS,
  POST_USER_LOGIN_FAILURE,
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  POST_USER_REGISTER,
  POST_USER_REGISTER_SUCCESS,
  POST_USER_REGISTER_FAILURE,
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAILURE,
  SEND_CONTACT_MESSAGE,
  SEND_CONTACT_MESSAGE_SUCCESS,
  SEND_CONTACT_MESSAGE_FAILURE,
  GET_ALL_CMS_HOME,
  GET_ALL_CMS_HOME_SUCCESS,
  GET_ALL_CMS_HOME_FAILURE,
} from "./actionTypes";

export const postUserRegister = (payload) => {
  return {
    type: POST_USER_REGISTER,
    payload,
  };
};
export const postUserRegisterSuccess = (user) => {
  return {
    type: POST_USER_REGISTER_SUCCESS,
    payload: user,
  };
};
export const postUserRegisterFailure = (error) => {
  return {
    type: POST_USER_REGISTER_FAILURE,
    payload: error,
  };
};

// ====================================================
// ====================================================

export const postUserLogin = (payload) => {
  return {
    type: POST_USER_LOGIN,
    payload,
  };
};
export const postUserLoginSuccess = (user) => {
  return {
    type: POST_USER_LOGIN_SUCCESS,
    payload: user,
  };
};
export const postUserLoginFailure = (error) => {
  return {
    type: POST_USER_LOGIN_FAILURE,
    payload: error,
  };
};

// ====================================================
// ====================================================

export const getUserProfile = (payload) => {
  return {
    type: GET_USER_PROFILE,
    payload,
  };
};
export const getUserProfileSuccess = (user) => {
  return {
    type: GET_USER_PROFILE_SUCCESS,
    payload: user,
  };
};
export const getUserProfileFailure = (error) => {
  return {
    type: GET_USER_PROFILE_FAILURE,
    payload: error,
  };
};

// ====================================================
// ====================================================

export const logoutUser = (cookie) => ({
  type: LOGOUT_USER,
  payload: cookie,
});

export const logoutSuccess = () => ({
  type: LOGOUT_USER_SUCCESS,
});

export const logoutFailure = (error) => ({
  type: LOGOUT_USER_FAILURE,
  error,
});

// ====================================================
// ====================================================

export const resetPassword = (payload) => {
  return {
    type: RESET_PASSWORD,
    payload,
  };
};

export const resetPasswordSuccess = (payload) => {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload,
  };
};

export const resetPasswordFailure = (error) => {
  return {
    type: RESET_PASSWORD_FAILURE,
    payload: error,
  };
};

// ====================================================
// ====================================================

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

export const forgetPasswordFailure = (error) => {
  return {
    type: FORGET_PASSWORD_FAILURE,
    payload: error,
  };
};

// ====================================================
// ====================================================

export const sendConatctMessage = (payload) => {
  return {
    type: SEND_CONTACT_MESSAGE,
    payload,
  };
};

export const sendConatctMessageSuccess = (payload) => {
  return {
    type: SEND_CONTACT_MESSAGE_SUCCESS,
    payload,
  };
};

export const sendConatctMessageFailure = (error) => {
  return {
    type: SEND_CONTACT_MESSAGE_FAILURE,
    payload: error,
  };
};

// ====================================================
// ====================================================

export const getAllCmsHome = (payload) => {
  return {
    type: GET_ALL_CMS_HOME,
    payload,
  };
};

export const getAllCmsHomeSuccess = (payload) => {
  return {
    type: GET_ALL_CMS_HOME_SUCCESS,
    payload,
  };
};

export const getAllCmsHomeFailure = (payload) => {
  return {
    type: GET_ALL_CMS_HOME_FAILURE,
    payload,
  };
};
