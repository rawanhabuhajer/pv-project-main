const express = require("express");
const {
  signupUser,
  loginUser,
  getUser,
  requestPasswordReset,
  resetPassword,
  getUserProfile,
} = require("../controllers/userController");
const { requireAuth } = require("../middleware/requireAuth");

const router = express.Router();

// login route

router.post("/login", loginUser);
router.get("/profile", getUserProfile);

// signup route
router.post("/signup", signupUser);

router.post("/request-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);

router.use(requireAuth);
router.get("/categories", requireAuth, getUser);
router.get("/mvCategories", requireAuth, getUser);
router.route("/:id").get(getUser);
module.exports = router;
