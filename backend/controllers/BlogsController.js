const Blog = require("../models/blogsModel");

// 🟢 Add a new blog
const createBlog = async (req, res) => {
  try {
    const { title, content, author, imageUrl, tags } = req.body;

    if (!title || !content || !author) {
      return res
        .status(400)
        .json({ isSuccess: false, message: "Missing required fields" });
    }

    const newBlog = await Blog.create({
      title,
      content,
      author,
      imageUrl,
      tags,
    });
    res.status(201).json({ isSuccess: true, responseData: newBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      isSuccess: false,
      message: "Error creating blog",
      error: error.message,
    });
  }
};

// 🟡 Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    let { PageNumber = 1, PageSize = 10 } = req.query;

    PageNumber = Math.max(parseInt(PageNumber), 1);
    PageSize = Math.max(parseInt(PageSize), 1);

    const skip = (PageNumber - 1) * PageSize;

    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(PageSize)
      .select("title content author tags imageUrl createdAt");

    const totalBlogs = await Blog.countDocuments();

    // format the date for readability
    const formattedBlogs = blogs.map((b) => ({
      ...b._doc,
      createdAt: b.createdAt,
    }));

    res.status(200).json({
      isSuccess: true,
      responseData: formattedBlogs,
      pagination: {
        total: totalBlogs,
        currentPage: PageNumber,
        pageSize: PageSize,
        totalPages: Math.ceil(totalBlogs / PageSize),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      isSuccess: false,
      message: "Error fetching blogs",
      error: error.message,
    });
  }
};

// 🟣 Get single blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog)
      return res
        .status(404)
        .json({ isSuccess: false, message: "Blog not found" });
    res.status(200).json({ isSuccess: true, responseData: blog });
  } catch (error) {
    res.status(500).json({ isSuccess: false, message: "Error fetching blog" });
  }
};

// 🟠 Update blog
const updateBlog = async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated)
      return res
        .status(404)
        .json({ isSuccess: false, message: "Blog not found" });
    res.status(200).json({ isSuccess: true, responseData: updated });
  } catch (error) {
    res.status(500).json({ isSuccess: false, message: "Error updating blog" });
  }
};

// 🔴 Delete blog
const deleteBlog = async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ isSuccess: false, message: "Blog not found" });
    res
      .status(200)
      .json({ isSuccess: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ isSuccess: false, message: "Error deleting blog" });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
