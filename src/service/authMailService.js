const nodemailer = require("nodemailer");

async function main(email, url, token, route) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "deonysd@gmail.com",
        pass: process.env.G_PASS
      },
      tls: {
        rejectUnauthorised: false
      }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"URL Shortner" <deonysd.gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Account Activation", // Subject line
      html: `<b>Please Click the link below  :</b>
             <a href="${url}${route}${token}">${url}${route}${token}</a>` // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    return info.messageId;
  } catch (e) {
    // create reusable transporter object using the default SMTP transport

    console.log(e);
  }
}
module.exports = main;
