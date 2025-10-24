const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "landing_content" }, // you can change folder name
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    const result = await streamUpload(req.file.buffer);

    res.status(200).json({
      isSuccess: true,
      message: "Image uploaded successfully",
      responseData: {
        path: result.secure_url, // match your frontend usage
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Image upload failed",
      details: error.message,
    });
  }
};
