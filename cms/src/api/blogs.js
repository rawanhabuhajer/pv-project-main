const { default: server } = require("./server");

export const getBlogsApi = async ({
  lang,
  IsDesc,
  PageNumber,
  PageSize,
  Title,
  CategoryId,
}) => {
  const response = await server().get(
    `/Blog/GetAllBlogs?&Lang=${lang}&PageNumber=${1}&PageSize=${50}`
  );
  return response.data;
};

export const getSingleBlogApi = async ({ id, lang }) => {
  const response = await server().get(`/Blog/GetBlogById/${id}?lang=${lang}`);
  return response.data;
};

export const addBlogApi = async ({ data }) => {
  const response = await server().post(`/Blog/AddBlog`, data);
  return response.data;
};

export const updateBlogApi = async ({ data }) => {
  const response = await server().put(`/Blog/EditBlogById`, data);
  return response.data;
};

export const deleteBlogApi = async ({ slug }) => {
  const response = await server().delete(`/Blog/DeleteBlogBySlugName/${slug}`);
  return response.data;
};
