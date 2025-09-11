const express = require("express");
const {
  signupUser,
  loginUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  requestPasswordReset,
  resetPassword,
  verifyUser,
  getUserProfile,
} = require("../controllers/userController");
const { requireAuth } = require("../middleware/requireAuth");

const router = express.Router();

// login route
router.get("/", getAllUsers);
router.post("/login", loginUser);
router.get("/profile", getUserProfile);

// signup route
router.post("/signup", signupUser);
router.get("/categories", requireAuth, getUser);
router.get("/mvCategories", requireAuth, getUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

router.post("/request-reset", requestPasswordReset); // Request password reset
router.post("/reset-password", resetPassword); // Reset password using token

router.patch("/verify/:userId", verifyUser);
module.exports = router;
