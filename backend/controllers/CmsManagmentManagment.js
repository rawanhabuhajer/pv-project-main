const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { sendVerificationEmail } = require("../utils/verifiedEmail");
const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET, {
    expiresIn: "365d",
  });
};

const loginCMS = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await User.login(email, password, role);

    if (!email || !password) {
      return res.status(400).json({ error: "All fields must be filled" });
    }

    if (!user)
      return res.status(400).json({ error: "Incorrect email or password" });

    // restrict CMS access
    if (!["admin", "superAdmin"].includes(user.role)) {
      return res
        .status(403)
        .json({ error: "Access denied. Not allowed in CMS" });
    }

    // const match = await bcrypt.compare(password, user.password);
    // if (!match)
    //   return res.status(400).json({ error: "Incorrect email or password" });

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ error: "Your account has not been verified by an admin yet." });
    }

    const token = createToken(user);

    res.status(200).json({
      isSuccess: true,
      responseData: {
        username: user?.username,
        email: user?.email,
        role: user?.role,
        id: user?._id,
        token,
        isVerified: user?.isVerified,
      },
    });
  } catch (error) {
    res.status(400).json({ isSuccess: false, error: error.message });
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    // Query params
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const searchValue = req.query.SearchValue || "";
    const isVerifiedFilter = req.query.IsVerified;

    // Build filter object
    const filter = {};

    // Search by username (case-insensitive)
    if (searchValue) {
      filter.username = { $regex: searchValue, $options: "i" };
    }

    // Fetch all users matching the filter (without pagination first)
    let users = await User.find(filter)
      .select("-password -categories -mvCategories")
      .sort({ createdAt: -1 });

    const now = new Date();

    // تحديث حالة isVerified بناءً على الفترة
    users.forEach((user) => {
      if (user.verificationStart && user.verificationEnd) {
        if (now >= user.verificationStart && now <= user.verificationEnd) {
          user.isVerified = true;
        } else {
          user.isVerified = false;
        }
      }
    });

    // إذا كان هناك فلتر isVerified من الـ query
    if (isVerifiedFilter !== undefined) {
      const isVerifiedBool = isVerifiedFilter === "true";
      users = users.filter((u) => u.isVerified === isVerifiedBool);
    }

    // Pagination
    const totalUsers = users.length;
    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize;
    const paginatedUsers = users.slice(start, end);

    res.status(200).json({
      isSuccess: true,
      responseData: {
        results: paginatedUsers.length,
        pageNumber,
        pageSize,
        totalUsers,
        totalPages: Math.ceil(totalUsers / pageSize),
        users: paginatedUsers,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      isSuccess: false,
      message: "Error fetching users",
      error: err.message,
    });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "Start date and end date are required" });
    }

    const verificationStart = new Date(startDate);
    const verificationEnd = new Date(endDate);

    if (
      isNaN(verificationStart.getTime()) ||
      isNaN(verificationEnd.getTime())
    ) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    if (verificationEnd <= verificationStart) {
      return res
        ?.status(400)
        ?.json({ error: "End date must be after start date" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // تحديث الحقول المطلوبة فقط
    user.verificationStart = verificationStart;
    user.verificationEnd = verificationEnd;

    // تحديث حالة isVerified بناءً على التاريخ الحالي
    const now = new Date();
    user.isVerified = now >= verificationStart && now <= verificationEnd;

    // تجاوز validators عند الحفظ
    await user.save({ validateBeforeSave: false });

    await sendVerificationEmail(user.email, user.username);

    res.status(200).json({
      isSuccess: true,
      message: "User verification period set successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error verifying user", details: error.message });
  }
};

const unVerifyUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.isVerified = false;
    user.verificationStart = null;
    user.verificationEnd = null;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      isSuccess: true,
      message: "User is now unverified",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error setting user as unverified",
      details: error.message,
    });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      new AppError("No user found with that ID", 404);
    }

    res.status(200).json({
      isSuccess: true,
      responseData: {
        user,
      },
    });
  } catch (error) {
    console.error("Error update user information:", error);
    res.status(500).json({ error: "Error update user information" });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "No user found with that ID" });
    }

    res.status(200).json({
      isSuccess: true,
      responseData: "deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user information:", error);
    res.status(500).json({ error: "Error deleting user information" });
  }
};

// GET all admins
const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({
      role: { $in: ["admin", "superAdmin"] },
    }).select(
      "-password -resetPasswordToken -resetPasswordExpires -categories -mvCategories -agreeTerms"
    );

    res.status(200).json({ isSuccess: true, responseData: admins });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching admins" });
  }
};

// UPDATE an admin by ID
const updateAdmin = async (req, res) => {
  try {
    // check if the logged-in user is a superAdmin
    if (req.user.role !== "superAdmin") {
      return res
        .status(403)
        .json({ error: "Access denied. Only superAdmin can update admins." });
    }

    const { id } = req.params;
    const updateData = { ...req.body };

    // prevent downgrading or promoting role accidentally
    if (updateData.role && !["admin", "superAdmin"].includes(updateData.role)) {
      delete updateData.role;
    }

    const updatedAdmin = await User.findOneAndUpdate(
      { _id: id, role: { $in: ["admin", "superAdmin"] } },
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedAdmin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.status(200).json({ status: "success", data: updatedAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating admin" });
  }
};

// DELETE an admin by ID
const deleteAdmin = async (req, res) => {
  try {
    // only superAdmin can delete
    if (req.user.role !== "superAdmin") {
      return res
        .status(403)
        .json({ error: "Access denied. Only superAdmin can delete admins." });
    }

    const { id } = req.params;

    const deletedAdmin = await User.findOneAndDelete({
      _id: id,
      role: { $in: ["admin"] },
    });

    if (!deletedAdmin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.status(200).json({
      isSuccess: true,
      message: "Admin deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting admin" });
  }
};
const createAdmin = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      phoneNumber,
      role,
      verificationEnd,
      verificationStart,
    } = req.body;

    if (!username || !email || !password || !phoneNumber) {
      return res.status(400).json({
        isSuccess: false,
        message: "All required fields must be provided",
      });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new admin/superAdmin with verified status
    const newUser = await User.create({
      username,
      email,
      companyName: "PVX360",
      password: hashedPassword,
      phoneNumber,
      role,
      agreeTerms: true,
      isVerified: true,
      verificationStart,
      verificationEnd,
    });

    const userObj = newUser.toObject();
    delete userObj.password;

    res.status(201).json({
      isSuccess: true,
      message: "Admin registered successfully",
      responseData: userObj,
    });
  } catch (error) {
    console.error("Create Admin Error:", error);
    res.status(500).json({
      isSuccess: false,
      message: "Error while registering admin",
      error: error.message,
    });
  }
};
module.exports = {
  updateUser,
  deleteUser,
  verifyUser,
  getAllUsers,
  unVerifyUser,
  getAdmins,
  updateAdmin,
  deleteAdmin,
  loginCMS,
  createAdmin,
};
