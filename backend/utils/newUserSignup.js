const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rawanh.abuhajer@gmail.com",
    pass: "jizt ocbb prnt xfty",
  },
});

const newUserSignup = async (username, email, phoneNumber, company) => {
  const mailOptions = {
    from: "info@io-tool.com",
    to: "rawanh.abuhajer@gmail.com",
    subject: "Request For Register",
    text: `user name : ${username},\n email : ${email},\n phone number : ${phoneNumber} ,\n company : ${company} \n\n is request to sign up  `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = { newUserSignup };
