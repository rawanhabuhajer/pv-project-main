const express = require("express");
const {
  getAllUsers,
  updateUser,
  deleteUser,
  verifyUser,
  unVerifyUser,
  getAdmins,
  updateAdmin,
  deleteAdmin,
  loginCMS,
  createAdmin,
} = require("../controllers/CmsManagmentManagment");
const { requireAuth, verifyCmsToken } = require("../middleware/requireAuth");

const router = express.Router();

router.post("/login", loginCMS);

router.use(requireAuth);

// login route
router.get("/getAllUsers", getAllUsers);

// signup route
router.route("/deleteUser/:id").delete(deleteUser);
router.route("/UpdateUser/:id").patch(updateUser);
router.patch("/verify/:userId", verifyUser);
router.patch("/unverify/:userId", unVerifyUser);

router.use(verifyCmsToken);
router.post("/createAdmin", createAdmin);
router.get("/getAllAdmins/", getAdmins);
router.patch("/updateAdmin/:id", updateAdmin);
router.delete("/deleteAdmin/:id", deleteAdmin);

module.exports = router;
