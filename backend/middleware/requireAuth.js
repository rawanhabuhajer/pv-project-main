const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select("_id username");

    next();
  } catch (error) {
    res.status(401).json({ error: "Request is not Authorized" });
  }
};

const verifyCmsToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Bearer <token>
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Invalid token format" });
    }

    const decoded = jwt.verify(token, process.env.SECRET);

    // optional: ensure it's a CMS user
    if (!["admin", "superAdmin"].includes(decoded.role)) {
      return res.status(403).json({ error: "Access denied. Not a CMS user." });
    }

    req.user = decoded; // attach decoded token to req.user
    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({ error: "Invalid or expired token" });
  }
};

module.exports = {
  requireAuth,
  verifyCmsToken,
};
