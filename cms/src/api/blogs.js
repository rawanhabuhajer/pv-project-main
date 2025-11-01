const { default: server } = require("./server");

export const getBlogsApi = async ({ PageNumber, PageSize }) => {
  const response = await server().get(
    `/blogs/getAllBlogs?PageNumber=${PageNumber}&PageSize=${PageSize}`
  );
  return response.data;
};

export const getSingleBlogApi = async ({ id, lang }) => {
  const response = await server().get(`/blogs/getBlogById/${id}`);
  return response.data;
};

export const addBlogApi = async ({ data }) => {
  const response = await server().post(`/blogs/createBlog`, data);
  return response.data;
};

export const updateBlogApi = async ({ data }) => {
  const response = await server().put(`/blogs/updateBlog`, data);
  return response.data;
};

export const deleteBlogApi = async ({ id }) => {
  const response = await server().delete(`/blogs/deleteBlog/${id}`);
  return response.data;
};
