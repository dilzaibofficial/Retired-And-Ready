const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  console.log(process.env.MAIL_HOST);
  console.log(process.env.MAIL_USER);
  console.log(process.env.MAIL_PASS);
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: "StudyNotion || by Aniruddha Gade",
      to: email,
      subject: title,
      html: body,
    });

    // console.log('Info of sent mail - ', info);
    console.log("Email sent: ", info.messageId);
    return {
      success: true,
      message: "Mail successfully sent",
      messageId: info.messageId,
    };
  } catch (error) {
    console.log("Error while sending mail (mailSender) - ", email);
    console.log("Error while sending mail (mailSender) - ", email);
    console.error("Full error:", error);
  }
};

module.exports = mailSender;
