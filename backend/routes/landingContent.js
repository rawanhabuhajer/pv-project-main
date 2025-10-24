const express = require("express");
const router = express.Router();
const {
  getAllSections,
  addSection,
  updateSection,
  getSectionBySlug,
} = require("../controllers/landingContent");

const customUpload = require("../middleware/Upload");
const { uploadImage } = require("../controllers/imageController");

const multer = require("multer");
const memoryUpload = multer();

// Sections routes
router.get("/getAllSections", getAllSections);
router.post("/addSection", addSection);
router.put("/updateSection/:sectionId", updateSection);
router.get("/GetCmsSectionBySlugName/:slug", getSectionBySlug);

// Image upload route
router.post("/uploadImage", memoryUpload.single("image"), uploadImage);

module.exports = router;
