import server from "./server";

export const getProjectsNearDeadlinesApi = async ({ cookies, userId }) => {
  const response = await server({ cookies }).get(
    `/dashboard/projectsNearDeadlines/${userId}`
  );
  return response.data;
};

export const getCategoriesStatusStatsApi = async ({
  cookies,
  userId,
  deadline,
  createdTo,
  createdFrom,
}) => {
  const params = new URLSearchParams();

  if (createdFrom) params.append("createdFrom", createdFrom);
  if (createdTo) params.append("createdTo", createdTo);
  if (deadline) params.append("deadline", deadline);

  const queryString = params.toString();
  const url = `/dashboard/categories/stats/${userId}${
    queryString ? `?${queryString}` : ""
  }`;

  const response = await server({ cookies }).get(url);
  return response.data;
};

export const getMvCategoriesStatusStatsApi = async ({
  cookies,
  userId,
  deadline,
  createdTo,
  createdFrom,
}) => {
  const params = new URLSearchParams();

  if (createdFrom) params.append("createdFrom", createdFrom);
  if (createdTo) params.append("createdTo", createdTo);
  if (deadline) params.append("deadline", deadline);

  const queryString = params.toString();
  const url = `/dashboard/categories/mvStats/${userId}${
    queryString ? `?${queryString}` : ""
  }`;

  const response = await server({ cookies }).get(url);
  return response.data;
};

export const getPvProjetsCountByYearApi = async ({
  cookies,
  userId,
  selectedYear,
}) => {
  const url = `/dashboard/categories/${userId}/projects/count-by-year?year=${selectedYear}`;

  const response = await server({ cookies }).get(url);
  return response.data;
};

export const getMvProjetsCountByYearApi = async ({
  cookies,
  userId,
  selectedYear,
}) => {
  const url = `/dashboard/categories/${userId}/mvProjects/count-by-year?year=${selectedYear}`;

  const response = await server({ cookies }).get(url);
  return response.data;
};

export const getlatestProjectsApi = async ({ cookies, userId }) => {
  const url = `/dashboard/categories/${userId}/latest-projects`;

  const response = await server({ cookies }).get(url);
  return response.data;
};
