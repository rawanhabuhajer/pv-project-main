import server from "./server";

export const getTendersApi = async ({
  cookies,
  pageNumber,
  pageSize,
  IsDeslastOfferPresentationDate,
  IsDesWinChance,
  IsDesCondetionalBookletPrice,
  IsDesExpectedCost,
}) => {
  let url = `/etimad/Tenders?pageNumber=${pageNumber}&pageSize=${pageSize}`;

  if (
    IsDeslastOfferPresentationDate === true ||
    IsDeslastOfferPresentationDate === false
  ) {
    url += `&IsDeslastOfferPresentationDate=${IsDeslastOfferPresentationDate}`;
  }
  if (IsDesWinChance === true || IsDesWinChance === false) {
    url += `&IsDesWinChance=${IsDesWinChance}`;
  }
  if (
    IsDesCondetionalBookletPrice === true ||
    IsDesCondetionalBookletPrice === false
  ) {
    url += `&IsDesCondetionalBookletPrice=${IsDesCondetionalBookletPrice}`;
  }
  if (IsDesExpectedCost === true || IsDesExpectedCost === false) {
    url += `&IsDesExpectedCost=${IsDesExpectedCost}`;
  }

  const response = await server({ cookies }).get(url);
  return response.data;
};
export const getKeyWordsTendersApi = async ({
  cookies,
  pageNumber,
  pageSize,
  IsDeslastOfferPresentationDate,
  IsDesWinChance,
  IsDesCondetionalBookletPrice,
  IsDesExpectedCost,
}) => {
  let url = `/etimad/GetKeyWordsTenders?pageNumber=${pageNumber}&pageSize=${pageSize}`;

  if (
    IsDeslastOfferPresentationDate === true ||
    IsDeslastOfferPresentationDate === false
  ) {
    url += `&IsDeslastOfferPresentationDate=${IsDeslastOfferPresentationDate}`;
  }
  if (IsDesWinChance === true || IsDesWinChance === false) {
    url += `&IsDesWinChance=${IsDesWinChance}`;
  }
  if (
    IsDesCondetionalBookletPrice === true ||
    IsDesCondetionalBookletPrice === false
  ) {
    url += `&IsDesCondetionalBookletPrice=${IsDesCondetionalBookletPrice}`;
  }
  if (IsDesExpectedCost === true || IsDesExpectedCost === false) {
    url += `&IsDesExpectedCost=${IsDesExpectedCost}`;
  }

  const response = await server({ cookies }).get(url);
  return response.data;
};

export const getTendersByProfileIdApi = async ({
  cookies,
  pageNumber,
  pageSize,
  ProfileId,
}) => {
  const response = await server({ cookies }).get(
    `/etimad/Tenders?pageNumber=${pageNumber}&pageSize=${pageSize}&ProfileId=${ProfileId}`
  );
  return response.data;
};

export const getTenderApi = async ({ cookies, id }) => {
  const response = await server({ cookies }).get(`/etimad/GetTenderById/${id}`);
  return response.data;
};
export const getTenderStatusApi = async ({ cookies }) => {
  const response = await server({ cookies }).get(
    `/etimad/GetAllTenderStatuses`
  );
  return response.data;
};

export const ToggleFavouriteApi = async ({ cookies, id }) => {
  const response = await server({ cookies }).post(
    `/etimad/AddRemoveFavourite?tenderId=${id}`
  );
  return response.data;
};
export const ToggleUnFavouriteApi = async ({ cookies, id }) => {
  const response = await server({ cookies }).post(
    `/companies/AddUnFavouriteTender?tenderId=${id}`
  );
  return response.data;
};

export const getCompetitiveCompaniesApi = async ({ cookies, id }) => {
  const response = await server({ cookies }).get(
    `/companies/GetMostCompetitiveCompanies/${id}`
  );
  return response.data;
};

export const getSimilarProjectsApi = async ({
  cookies,
  id,
  pageNumber,
  pageSize,
  isDesPresentationDate,
  IsDesAwardAmount,
}) => {
  let url = `/etimad/GetSimilarProjects?tenderId=${id}&pageNumber=${pageNumber}&pageSize=${pageSize}`;

  if (isDesPresentationDate !== undefined) {
    url += `&isDesPresentationDate=${isDesPresentationDate}`;
  }

  if (IsDesAwardAmount !== undefined) {
    url += `&IsDesAwardAmount=${IsDesAwardAmount}`;
  }
  const response = await server({ cookies }).get(url);
  return response.data;
};
export const getActiveSimilarProjectsApi = async ({
  cookies,
  tenderId,
  pageNumber,
  pageSize,
}) => {
  const response = await server({ cookies }).get(
    `/etimad/GetActiveSimilarTender?tenderId=${tenderId}&pageNumber=${pageNumber}&pageSize=${pageSize}`
  );
  return response.data;
};

export const getAgencyApi = async ({ cookies, id }) => {
  const response = await server({ cookies }).get(
    `/etimad/GetCountTendersByAgencyId/${id}`
  );
  return response.data;
};

export const getTenderByAgencyApi = async ({
  cookies,
  id,
  pageNumber,
  pageSize,
  IsDesBookletPrice,
  isDesPresentationDate,
  StatusIds,
}) => {
  let url = `/etimad/GetTendersByAgencyId?AgencyId=${id}&pageNumber=${pageNumber}&pageSize=${pageSize}`;

  if (isDesPresentationDate !== undefined) {
    url += `&isDesPresentationDate=${isDesPresentationDate}`;
  }

  if (IsDesBookletPrice !== undefined) {
    url += `&IsDesBookletPrice=${IsDesBookletPrice}`;
  }
  if (StatusIds !== undefined) {
    url += `&StatusIds=${StatusIds}`;
  }

  const response = await server({ cookies }).get(url);
  return response.data;
};

export const getCompanyApi = async ({ cookies, id }) => {
  const response = await server({ cookies }).get(
    `/companies/GetCompanyInfo/${id}`
  );
  return response.data;
};

export const getTendersByCompanyApi = async ({
  cookies,
  id,
  pageNumber,
  pageSize,
  isDesPresentationDate,
  isWinner,
}) => {
  let url = `/companies/GetRelateTenderCompany?companyId=${id}&pageNumber=${pageNumber}&pageSize=${pageSize}`;

  if (isDesPresentationDate !== undefined) {
    url += `&isDesPresentationDate=${isDesPresentationDate}`;
  }

  if (isWinner !== undefined) {
    url += `&isWinner=${isWinner}`;
  }

  const response = await server({ cookies }).get(url);
  return response.data;
};

export const getAllFavoriteTendersApi = async ({
  cookies,
  pageNumber,
  pageSize,
  tenderName,
}) => {
  const response = await server({ cookies }).get(
    `/companies/GetTenderFavourites?pageNumber=${pageNumber}&pageSize=${pageSize}&tenderName=${tenderName}`
  );
  return response.data;
};
export const getExpiredTenderFavouritesForCompanyApi = async ({
  cookies,
  pageNumber,
  pageSize,
}) => {
  const response = await server({ cookies }).get(
    `/companies/GetExpiredTenderFavouritesForCompany?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );
  return response.data;
};

export const addUserProfileApi = async ({ cookies, data }) => {
  const response = await server({ cookies }).post(`/AddUserProfile`, data);
  return response.data;
};

export const getSingleProfileApi = async ({ cookies, id }) => {
  const response = await server({ cookies }).get(
    `/GetUserProfileById?UserProfileId=${id}`
  );
  return response.data;
};

export const updateUserProfileApi = async ({ cookies, data }) => {
  const response = await server({ cookies }).put(`/UpdateUserProfile`, data);
  return response.data;
};

export const getAllProfilesApi = async ({ cookies }) => {
  const response = await server({ cookies }).get(`/GetAllUserProfile`);
  return response.data;
};

export const deleteUserProfileApi = async ({ cookies, id }) => {
  const response = await server({ cookies }).delete(
    `/DeleteUserProfileById/${id}`
  );
  return response.data;
};

export const addWatchedTendersApi = async ({
  cookies,
  totalClicks,
  AccountId,
}) => {
  const response = await server({ cookies }).post(
    `/DashBoard/AddWatchedTendersControlBoard?totalClicks=${totalClicks}&AccountId=${AccountId}`
  );
  return response.data;
};

export const deleteRfpApi = async ({ cookies, docId, tenderId }) => {
  const response = await server({ cookies }).put(
    `/booklets/DeleteBookletAnswers?docId=${docId}&tenderId=${tenderId}`
  );
  return response.data;
};

export const AssignChildToTenderApi = async ({
  cookies,
  parentUserId,
  childUserId,
  tenderId,
}) => {
  const response = await server({ cookies }).post(
    `/etimad/AssignChildToTender`,
    { parentUserId, childUserId, tenderId }
  );
  return response.data;
};
export const RemoveChildFromTenderApi = async ({
  cookies,
  parentUserId,
  childUserId,
  tenderId,
}) => {
  const response = await server({ cookies }).post(
    `/etimad/RemoveChildFromTender`,
    { parentUserId, childUserId, tenderId }
  );
  return response.data;
};

export const getTenderChildsDataApi = async ({ cookies, tenderId }) => {
  const response = await server({ cookies }).post(
    `/etimad/GetChildDataByTenderId?tenderId=${tenderId}`
  );
  return response.data;
};
