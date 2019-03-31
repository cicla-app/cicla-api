const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});

module.exports.sendConfirmEmail = (to, token) => {
  const url = `http://localhost:3001/users/confirm/${token}`

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: to,
    subject: 'Confirma tu cuenta',
    text: 'Contenido del email',
    html: `<h2>Hola</h2> <br/>
          <h3>Te damos la bienvenida a Cicla</h3><br/>
          <p>Muchas gracias por registrarte en CICLA</p><br/>
          <p>Para poder finalizar el registro pulsa en el siguiente botón</p><br/>
          <button href="${url}">CONFIRMAR CUENTA</button></p><br/> 
          <p>Puedes confirmar el registro hasta 24 horas después de haber recibido este correo electrónico, pasado ese tiempo dejará de ser válido<p>`
  };

  transporter.sendMail(mailOptions, function(error){
    if (error){
      console.log(error);
    } else {
      console.log(`confirmation email sent to ${to}`);
    }
});
}