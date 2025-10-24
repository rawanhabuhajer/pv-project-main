const multer = require("multer");

// Use memory storage to directly send file buffer to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
