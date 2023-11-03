const nodemailer = require("nodemailer");

const sendMailHandler = (senderEmail, recieverEmail, emailSubject, htmlBody) => {
  console.log("senderEmail", senderEmail);
  console.log("recieverEmail", recieverEmail);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: senderEmail,
      pass: "kiufqrtgsiamhlzj",
      // pass: "Wehvs$Project",
    },
  });

  const mailOptions = {
    from: senderEmail,
    to: recieverEmail,
    subject: emailSubject,
    html: htmlBody,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendMailHandler;
