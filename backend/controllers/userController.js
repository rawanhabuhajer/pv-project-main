const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendResetEmail } = require("../utils/emailService");
const { sendVerificationEmail } = require("../utils/verifiedEmail");
const { newUserSignup } = require("../utils/newUserSignup");

const validator = require("validator");
const bcrypt = require("bcrypt");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "365d" });
};

const populateCategories = async (userOrUserId) => {
  const userId =
    userOrUserId instanceof Object ? userOrUserId._id : userOrUserId;
  return await User.findById(userId);
};

const getAllUsers = async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
};

// login
const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.login(email, password, role);

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ error: "Your account has not been verified by an admin yet." });
    }

    const token = createToken(user._id);

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
    res.status(400).json({ error: error.message });
  }
};

// signup
const signupUser = async (req, res) => {
  const {
    username,
    email,
    password,
    role,
    companyName,
    phoneNumber,
    agreeTerms,
  } = req.body;
  try {
    const user = await User.signup(
      username,
      email,
      password,
      role,
      companyName,
      phoneNumber,
      agreeTerms
    );
    const token = createToken(user._id);

    const userWithCategories = await populateCategories(user);
    await newUserSignup(
      user.username,
      user.email,
      user.phoneNumber,
      user.companyName
    );
    res.status(200).json({
      isSuccess: true,
      username: userWithCategories.username,
      email: userWithCategories.email,
      role: userWithCategories.role,
      companyName: userWithCategories.companyName,
      phoneNumber: userWithCategories.phoneNumber,
      agreeTerms: userWithCategories.agreeTerms,
      id: user._id,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Authorization token required" });
    }

    const decoded = jwt.verify(token, process.env.SECRET); // use the same `SECRET` as createToken
    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        error: "Your account has not been verified by an admin yet.",
      });
    }

    res.status(200).json({
      isSuccess: true,
      responseData: {
        username: user.username,
        email: user.email,
        role: user.role,
        id: user._id,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { isVerified: true },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await sendVerificationEmail(user.email, user.username);
    res.status(200).json({
      isSuccess: true,
      message: "User verified successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: "Error verifying user" });
  }
};

const getUser = async (req, res) => {
  const user = await populateCategories(req.user);
  if (!user) {
    new AppError("No user found with that ID", 404);
  }

  res.status(200).json({
    status: "success",
    data: {
      id: user._id,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      companyName: user.companyName,
      role: user.role,
      isVerified: user?.isVerified,
    },
  });
};

// };

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
      status: "success",
      data: {
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
      new AppError("No user found with that ID", 404);
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    console.error("Error delete user information:", error);
    res.status(500).json({ error: "Error delete user information" });
  }
};

const generateResetToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "No user found with that email" });
    }

    const token = generateResetToken();
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 30 * 60 * 1000;
    await user.save();

    await sendResetEmail(email, token);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ error: "Error sending password reset email" });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired link" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error resetting password" });
  }
};

module.exports = {
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
};
