const express = require("express");
const {
  getProjectsNearDeadline,
  getCategoryStats,
  getProjectsByYear,
  getMvProjectsByYear,
  getMvCategoryStats,
  getLatestProjects,
} = require("../controllers/DashboardController");

const { requireAuth } = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.route("/projectsNearDeadlines/:userId").get(getProjectsNearDeadline);
router.route("/categories/stats/:userId").get(getCategoryStats);
router.route("/categories/mvStats/:userId").get(getMvCategoryStats);
router
  .route("/categories/:userId/projects/count-by-year")
  .get(getProjectsByYear);
router
  .route("/categories/:userId/mvProjects/count-by-year")
  .get(getMvProjectsByYear);

router.route("/categories/:userId/latest-projects").get(getLatestProjects);

module.exports = router;
