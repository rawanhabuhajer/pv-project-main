import server from "./server";

export const getPvProjectsApi = async ({
  cookies,
  pageNumber,
  pageSize,
  userId,
  selectedSort,
  searchValue,
  status,
}) => {
  let url = `/categories/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  if (status) url += `&status=${status}`;
  if (selectedSort) url += `&selectedSort=${selectedSort}`;
  if (searchValue) url += `&search=${searchValue}`;
  const response = await server({ cookies }).get(url);
  return response.data;
};

export const addPvProjectsApi = async ({ cookies, userId, data }) => {
  const response = await server({ cookies }).post(
    `/categories/${userId}`,
    data
  );
  return response.data;
};

export const editPvProjectsApi = async ({ cookies, projectId, data }) => {
  const response = await server({ cookies }).patch(
    `/categories/${projectId}`,
    data
  );
  return response.data;
};

export const deletePvProjectsApi = async ({ cookies, projectId }) => {
  const response = await server({ cookies }).delete(`/categories/${projectId}`);
  return response.data;
};

export const getPvProjectSubsApi = async ({
  cookies,
  pageNumber,
  pageSize,
  projectId,
  search,
  sortBy,
  status,
}) => {
  let url = `/subCategories/${projectId}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  if (search) url += `&search=${search}`;
  if (sortBy) url += `&sortBy=${sortBy}`;
  if (status) url += `&status=${status}`;
  console.log(url);
  const response = await server({ cookies }).get(url);

  return response.data;
};

export const addPvSubProjectApi = async ({ cookies, projectId, data }) => {
  const response = await server({ cookies }).post(
    `/subCategories/${projectId}`,
    data
  );
  return response.data;
};

export const editPvSubProjectApi = async ({ cookies, subProjectId, data }) => {
  const response = await server({ cookies }).patch(
    `/subCategories/subcategory/update/${subProjectId}`,
    data
  );
  return response.data;
};

export const deleteSubPvProjectApi = async ({ cookies, subProjectId }) => {
  const response = await server({ cookies }).delete(
    `/subCategories/subcategory/${subProjectId}`
  );
  return response.data;
};

export const getPvSubProjectDataApi = async ({
  cookies,
  pageNumber,
  pageSize,
  subProjectId,
}) => {
  const response = await server({ cookies }).get(
    `/subCategories/subcategory/${subProjectId}?page=${pageNumber}&pageSize=${pageSize}`
  );
  return response.data;
};

export const editSubProjectDataApi = async ({
  cookies,
  subProjectId,
  data,
}) => {
  const response = await server({ cookies }).patch(
    `/subCategories/subcategory/${subProjectId}`,
    { data }
  );
  return response.data;
};

export const getMvProjectsApi = async ({
  cookies,
  pageNumber,
  pageSize,
  userId,
  searchValue,
  selectedSort,
  status,
}) => {
  let url = `/mvCategories/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}${selectedSort}&search=${searchValue}`;

  if (status) url += `&status=${status}`;
  const response = await server({ cookies }).get(url);
  return response.data;
};

export const addMvProjectsApi = async ({ cookies, userId, data }) => {
  const response = await server({ cookies }).post(
    `/mvCategories/${userId}`,
    data
  );
  return response.data;
};

export const editMvProjectsApi = async ({ cookies, mvCategoryId, data }) => {
  const response = await server({ cookies }).patch(
    `/mvCategories/singlecategory/${mvCategoryId}`,
    data
  );
  return response.data;
};

export const deleteMvProjectsApi = async ({ cookies, mvCategoryId }) => {
  const response = await server({ cookies }).delete(
    `/mvCategories/singlecategory/${mvCategoryId}`
  );
  return response.data;
};

export const getMvSingleProjectDataApi = async ({ cookies, mvCategoryId }) => {
  const response = await server({ cookies, mvCategoryId }).get(
    `/mvCategories/singlecategory/${mvCategoryId}`
  );
  return response.data;
};
export const editMvSingleProjectDataApi = async ({
  cookies,
  mvCategoryId,
  details,
}) => {
  const response = await server({ cookies }).patch(
    `/mvCategories/singlecategory/${mvCategoryId}`,
    { details }
  );
  return response.data;
};
