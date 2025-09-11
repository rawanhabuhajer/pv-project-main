const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rawanh.abuhajer@gmail.com",
    pass: "jizt ocbb prnt xfty",
  },
});

const sendVerificationEmail = async (email, username) => {
  const loginLink = `http://localhost:5011/en/login`;
  const mailOptions = {
    from: "info@io-tool.com",
    to: email,
    subject: "Account Verified by Admin",
    text: `Dear ${username},\n\nYour account has been successfully verified by the admin.\n\nThank you! \n\n Login from here : ${loginLink}`,

  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = { sendVerificationEmail };
