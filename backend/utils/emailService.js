const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: "admin@pvmicrogrid.com",
    pass: process.env.EMAIL_PASS,
  },
});

const sendResetEmail = async (to, token) => {
  const resetLink = `https://pvmicrogrid.com/reset-password/${token}`;

  const mailOptions = {
    from: '"PV Microgrid" <admin@pvmicrogrid.com>',
    to,
    subject: "Password Reset Request",
    html: `
      <p>Hello,</p>
      <p>You requested a password reset. Click the link below:</p>
      <p><a href="${resetLink}">Reset Password</a></p>
      <p>If you did not request this, ignore this email.</p>
      <p>Thanks,<br/>PV Microgrid Team</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Reset email sent:", info.response);
  } catch (error) {
    console.error("Error sending reset email:", error);
    throw error;
  }
};

const sendVerifyEmail = async (to) => {
  const loginLink = `https://pvmicrogrid.com/login`;

  const mailOptions = {
    from: '"PV Microgrid" <admin@pvmicrogrid.com>',
    to,
    subject: "Account Verification Successful",
    html: `
      <p>Dear User,</p>
      <p>Your request to join PV Microgrid has been approved, and your account has been successfully verified.</p>
      <p>You can now log in to your account using the following link:</p>
      <p ><a href="${loginLink}">Access Your Account</a></p>
      <p>If you did not request this action, please contact our support team immediately.</p>
      <p>Best regards,<br/>PV Microgrid Team</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent:", info.response);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};

const sendUnVerifyEmail = async (to) => {
  const loginLink = `https://pvmicrogrid.com/login`;

  const mailOptions = {
    from: '"PV Microgrid" <admin@pvmicrogrid.com>',
    to,
    subject: "Account Status Update",
    html: `
      <p>Dear User,</p>
      <p>We would like to inform you that your account with PV Microgrid has been  unverified by our administration team.</p>
      <p>If you believe this was done in error or have any questions regarding your account status, please contact our support team for assistance.</p>
      <p>You may still access your account for limited purposes via the following link:</p>
      <p>We apologize for any inconvenience and appreciate your understanding.</p>
      <p>Best regards,<br/>PV Microgrid Team</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Unverified email sent:", info.response);
  } catch (error) {
    console.error("Error sending unverified email:", error);
    throw error;
  }
};

const sendRegisterEmail = async (username, email, companyName, phoneNumber) => {
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
      subject: "New User Registered",
      html: `
        <p><strong>Name:</strong> ${username}</p>
        <p><strong>Company:</strong> ${companyName || "N/A"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Register email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Nodemailer Error:", error);
    throw error;
  }
};

module.exports = {
  sendResetEmail,
  sendRegisterEmail,
  sendVerifyEmail,
  sendUnVerifyEmail,
};
