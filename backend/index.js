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

app.post("/api/send-email", async (req, res) => {
  const { firstName, lastName, companyName, message, email } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({
      isSuccess: false,
      message: "All required fields must be provided",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com", 
      port: 465, 
      secure: true,
      auth: {
        user: "admin@pvmicrogrid.com",
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: '"PV Microgrid" <admin@pvmicrogrid.com>',
      replyTo: email,
      to: "admin@pvmicrogrid.com",
      subject: "New Contact Form Submission",
      html: `
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Company:</strong> ${companyName || "N/A"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    };


    const info = await transporter.sendMail(mailOptions);

    res.status(200).json({
      isSuccess: true,
      responseData: info,
      message: "Your message was sent successfully!",
    });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    res.status(500).json({
      isSuccess: false,
      message: "Failed to send email. Check server logs.",
      error: error.message,
    });
  }
});

//connect to db
mongoose.connect(process.env.MONGO_URI).then(() => {
  //listen for requests
  app.listen(process.env.PORT, () => {
    console.log("Connect to db & listen to port", process.env.PORT);
  });
});
