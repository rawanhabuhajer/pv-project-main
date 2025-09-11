const express = require("express");
const {
  getAllMvCategories,
  getMvCategory,
  createMvCategory,
  updateMvCategory,
  deleteMvCategory,
} = require("../controllers/mvController2");

const { requireAuth } = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.route("/:userId").get(getAllMvCategories).post(createMvCategory);

router
  .route("/singlecategory/:id")
  .get(getMvCategory)
  .patch(updateMvCategory)
  .delete(deleteMvCategory);

module.exports = router;
