import server from "./server";
export const getAllBlogsApi = async ({ cookies , lang }) => {
  const response = await server({ cookies }).get(`/Blog/GetAllBlogs?lang=${lang}`);
  return response.data;
};

export const getSingleBlogApi = async ({ cookies, slug }) => {
  const response = await server({ cookies }).get(
    `/Blog/GetBlogBySlugName/${encodeURIComponent(slug)}`
  );
  return response.data;
};

export const getBlogCategoriesApi = async ({ cookies }) => {
  const response = await server({ cookies }).get(
    `/BlogCategory/GetAllBlogCategory`
  );
  return response.data;
};
