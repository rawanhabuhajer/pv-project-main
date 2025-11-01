import server from "./server";
export const getAllBlogsApi = async ({ cookies }) => {
  const response = await server({ cookies }).get(`/blogs/getAllBlogs`);
  return response.data;
};

export const getSingleBlogApi = async ({ cookies, id }) => {
  const response = await server({ cookies }).get(`/blogs/getBlogById/${id}`);
  return response.data;
};

export const getBlogCategoriesApi = async ({ cookies }) => {
  const response = await server({ cookies }).get(`/blogs/GetAllBlogCategory`);
  return response.data;
};
