import server from "./server";

export const postUserLogin = async (data) => {
  const response = await server().post("/CmsManagment/login", data);
  return response.data;
};

export const getCurrentUser = async (data) => {
  const response = await server().get("/user/Profile", data);
  return response.data;
};

export const forgetPasswordApi = async ({ data }) => {
  const response = await server().post("/auth/ForgetPassword", data);
  return response.data;
};

export const getUsersApi = async ({
  pageNumber,
  pageSize,
  SearchValue,
  IsVerified,
}) => {
  const queryParams = new URLSearchParams({
    PageNumber: pageNumber,
    pageSize: pageSize,
  });
  if (SearchValue) {
    queryParams.append("SearchValue", SearchValue);
  }

  if (IsVerified) {
    queryParams.append("IsVerified", IsVerified);
  }
  const queryString = queryParams.toString();
  const response = await server().get(
    `/CmsManagment/getAllUsers?${queryString}`
  );
  return response.data;
};

export const verifyUserApi = async ({ id, data }) => {
  const response = await server().patch(`/CmsManagment/verify/${id}`, data);
  return response.data;
};

export const unVerifyUserApi = async ({ id }) => {
  const response = await server().patch(`/CmsManagment/unverify/${id}`);
  return response.data;
};

export const deleteUserApi = async ({ id }) => {
  const response = await server().delete(`/CmsManagment/deleteUser/${id}`);
  return response.data;
};

export const updateUserApi = async ({ data }) => {
  const response = await server().patch(
    `/CmsManagment/UpdateUser/${data?.id}`,
    data
  );
  return response.data;
};

export const getUserApi = async ({ id }) => {
  const response = await server().get(`/user/${id}`);
  return response.data;
};

export const toggleTrialApi = async ({ accountId }) => {
  const response = await server().put(
    `/CmsManagment/ToggleTrial?accountId=${accountId}`
  );
  return response.data;
};
