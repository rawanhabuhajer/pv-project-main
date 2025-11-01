require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const cors = require("cors");
const bodyParser = require("body-parser");
const categoriesRoutes = require("./routes/categories");
const subCategories = require("./routes/subCategory");
const mvSubCategories = require("./routes/mvSubCategories");
const mvCategories = require("./routes/mvCable");
const dashboard = require("./routes/dashboard");
const CmsManagment = require("./routes/CmsManagment");
const landingContent = require("./routes/landingContent");
const blogRoutes = require("./routes/blogs");
// express app
const app = express();
const nodemailer = require("nodemailer");
// middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  next();
});

//Routes
app.use("/api/categories", categoriesRoutes);
app.use("/api/user", userRoutes);
app.use("/api/CmsManagment", CmsManagment);
app.use("/api/landingContent", landingContent);
app.use("/api/mvCategories", mvCategories);
app.use("/api/subCategories", subCategories);
app.use("/api/mvSubCategories", mvSubCategories);
app.use("/api/dashboard", dashboard);
app.use("/api/blogs", blogRoutes);

app.post("/api/send-email", (req, res) => {
  const { firstName, lastName, companyName, message, email } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    replyTo: email,
    to: "rawanh.abuhajer@gmail.com",
    subject: "New Contact Form Submission",
    text: `Name: ${firstName} ${lastName}
          Company: ${companyName || "N/A"}
          User's Email: ${email}
          Message: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Nodemailer Error:", error);
      return res.status(500).json({
        isSuccess: false,
        message: "Failed to send email. Check server logs.",
        error: error.message,
      });
    }
    res.status(200).json({
      isSuccess: true,
      responseData: info,
      message: "Your message was sent successfully!",
    });
  });
});

//connect to db
mongoose.connect(process.env.MONGO_URI).then(() => {
  //listen for requests
  app.listen(process.env.PORT, () => {
    console.log("Connect to db & listen to port", process.env.PORT);
  });
});
