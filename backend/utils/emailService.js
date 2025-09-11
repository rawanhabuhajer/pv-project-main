const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rawanh.abuhajer@gmail.com",
    pass: "jizt ocbb prnt xfty",
  },
});

const sendResetEmail = async (to, token) => {
  const resetLink = `http://localhost:3000/reset-password/${token}`;
  const mailOptions = {
    from: "info@io-tool.com",
    to,
    subject: "Password Reset Request",
    text: `You requested a password reset. Use the following link to reset your password: ${resetLink}`,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = { sendResetEmail };
