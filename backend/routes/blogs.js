const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/BlogsController");

const router = express.Router();

// Public or CMS-protected depending on your use case
router.post("/createBlog", createBlog);
router.get("/getAllBlogs", getAllBlogs);
router.get("/getBlogById/:id", getBlogById);
router.patch("/updateBlog/:id", updateBlog);
router.delete("/deleteBlog/:id", deleteBlog);

module.exports = router;