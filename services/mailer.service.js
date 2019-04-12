const nodemailer = require('nodemailer');
const emailTemplate = require('./../data/email-template.js');

 const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});

 module.exports.sendConfirmEmail = (to, token, alias) => {
  const url = `http://localhost:3001/users/confirm/${token}`;

   const mailOptions = {
    from: process.env.MAIL_USER,
    to: to,
    subject: 'Confirma tu cuenta Cicla',
    text: 'Contenido del email',
    html: emailTemplate.render(alias, url)
  };

    console.log(`Sending email to ${to}...`)

   transporter.sendMail(mailOptions, function(error){
    if (error){
      console.log(error);
    } else {
      console.log(`confirmation email sent to ${to}`);
    }
  });
} 