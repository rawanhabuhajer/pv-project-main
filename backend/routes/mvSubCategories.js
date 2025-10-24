const express = require("express");
const {
  createSubcategory,
  getSubcategoriesByCategory,
  updateSubcategory,
  deleteSubcategory,
  getSubCategoryById,
  updateSubcategoryInfo,
} = require("../controllers/mvSubCategories");

const { requireAuth } = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.route("/:id").get(getSubcategoriesByCategory).post(createSubcategory);

router
  .route("/mvSubcategory/:subcategoryId")
  .get(getSubCategoryById)
  .patch(updateSubcategory)
  .delete(deleteSubcategory);

router
  .route("/mvSubcategory/update/:subcategoryId")
  .patch(updateSubcategoryInfo);

module.exports = router;
