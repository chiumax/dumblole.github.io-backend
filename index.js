const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

const emailName = functions.config().gmail.email;
const passName = functions.config().gmail.pass;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailName,
    pass: passName
  }
});
exports.sendMail = functions.https.onCall(data => {
  let mailOptions = {
    from: "dumblole.noreply@gmail.com",
    to: "dumblole@gmail.com",
    subject: `${data.subject}`,
    text: `Name:${data.name} \nEmail: ${data.email} \nMessage:${data.message}`
  };
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log("NO WORK");
      return false;
    } else {
      console.log("success 1/2");
      mailOptions = {
        from: "dumblole.noreply@gmail.com",
        to: `${data.email}`,
        subject: "Thanks!",
        text:
          "Thank you for reaching out! \nPlease expect me to get back to you within 1-2 business days. \nMake sure to not reply/email this email since this is an automated service. \nLooking forward to talking with you, \nMax"
      };
      transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
          console.log("NO WORK 2 ");
          return false;
        } else {
          console.log("success 2/2");
          return true;
        }
      });
    }

    //return `${data.email} ${data.name} ${data.subject} ${data.message} ESHKETIT`;
  });
});
