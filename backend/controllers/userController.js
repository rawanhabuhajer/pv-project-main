const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendResetEmail, sendRegisterEmail } = require("../utils/emailService");
const { sendVerificationEmail } = require("../utils/verifiedEmail");
const { newUserSignup } = require("../utils/newUserSignup");

const bcrypt = require("bcrypt");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "365d" });
};

const populateCategories = async (userOrUserId) => {
  const userId =
    userOrUserId instanceof Object ? userOrUserId._id : userOrUserId;
  return await User.findById(userId);
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

    if (user.verificationEnd && new Date() > new Date(user.verificationEnd)) {
      return res.status(403).json({
        error:
          "Your verification period has expired. Please contact the admin to renew your access.",
      });
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
    res.status(400).json({ isSuccess: false, error: error.message });
  }
};

// signup
const signupUser = async (req, res) => {
  try {
    const {
      username,
      email,
      companyName,
      password,
      phoneNumber,
      role,
      agreeTerms,
    } = req.body;

    if (!username || !email || !companyName || !password || !phoneNumber) {
      return res.status(400).json({
        isSuccess: false,
        message: "All required fields must be provided",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      companyName,
      password: hashedPassword,
      phoneNumber,
      role,
      agreeTerms,
    });

    const userObj = newUser.toObject();
    delete userObj.password;

    res.status(201).json({
      isSuccess: true,
      message: "User registered successfully",
      data: userObj,
    });

    sendRegisterEmail(username, email, companyName, phoneNumber).catch((err) =>
      console.error("Failed to send registration email:", err)
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({
      isSuccess: false,
      message: "Error while registering user",
      error: error.message,
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Authorization token required" });
    }

    const decoded = jwt.verify(token, process.env.SECRET);
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
        id: user._id,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        companyName: user.companyName,
        role: user.role,
        isVerified: user.isVerified,
        verificationStart: user.verificationStart,
        verificationEnd: user.verificationEnd,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select(
        "-password -resetPasswordToken -resetPasswordExpires -categories -mvCategories -agreeTerms"
      )
      .lean(); // optional: يجعل النتيجة كـ plain object

    if (!user) {
      return res.status(404).json({ error: "No user found with that ID" });
    }

    res.status(200).json({
      isSuccess: true,
      responseData: {
        id: user._id,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        companyName: user.companyName,
        role: user.role,
        isVerified: user.isVerified,
        verificationStart: user.verificationStart,
        verificationEnd: user.verificationEnd,
      },
    });
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: error.message });
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

    res.status(200).json({
      isSuccess: true,
      responseData: "Password reset email sent",
      message: "Reset password link has been sent to your email",
    });
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

    res
      .status(200)
      .json({ isSuccess: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error resetting password" });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getUser,
  requestPasswordReset,
  resetPassword,
  getUserProfile,
};
