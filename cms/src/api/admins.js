import server from "./server";

export const getAdminsApi = async () => {
  const response = await server().get(`/CmsManagment/getAllAdmins`);
  return response.data;
};

export const getAdminApi = async ({ id }) => {
  const response = await server().get(`/user/${id}`);
  return response.data;
};

export const addAdminApi = async ({ data }) => {
  const response = await server().post("/CmsManagment/createAdmin", data);
  return response.data;
};

export const updateAdminApi = async ({ data }) => {
  const response = await server().patch(
    `/CmsManagment/updateAdmin/${data?.userId}`,
    data
  );
  return response.data;
};

export const deleteAdminApi = async ({ id }) => {
  const response = await server().delete(`/CmsManagment/deleteAdmin/${id}`);
  return response.data;
};

export const getAllSectionsApi = async () => {
  const response = await server().get(`/landingContent/getAllSections`);
  return response.data;
};
