import server from "./server";

export const postUserRegisterApi = async ({ cookies, formData }) => {
  const response = await server({ cookies }).post("/user/signup", formData);
  return response.data;
};

export const postUserLoginApi = async ({ cookies, formData }) => {
  const response = await server({ cookies }).post("/user/login", formData);
  return response.data;
};

export const getUserProfileApi = async ({ cookies }) => {
  const response = await server({ cookies }).get(`/user/Profile`);
  return response.data;
};

export const resetPasswordApi = async ({ cookies, newPassword, token }) => {
  const response = await server({ cookies }).post("/user/reset-password", {
    newPassword,
    token,
  });
  return response.data;
};

export const forgetPasswordApi = async ({ cookies, formData }) => {
  const response = await server({ cookies }).post(
    `/user/request-reset`,
    formData
  );
  return response.data;
};

export const sendContactMessageApi = async ({ cookies, data }) => {
  const response = await server({ cookies }).post(`/send-email`, data);
  return response.data;
};
