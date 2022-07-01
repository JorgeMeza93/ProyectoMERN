import nodemailer from "nodemailer";

const emailOlvidePassword = async ( datos ) => {
    var transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      const { email, nombre, token} = datos;
      //enviar el email
      const info = await transporter.sendMail( {
        from: "APV - Administrador de Pacientes de Veterinaria", 
        to: email,
        subject: "Restablece tu password",
        html: `<p>Hola: ${nombre}, has solicitado restablecer tu password </p>
            <p>Haz click en el siguiente enlace para confirmar y generar un nuevo password: 
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer Password</a></p>
            <p>Si no has creado esta cuenta ignora este mensaje </p>
        `
      });
      console.log("Mensaje enviado: %s", info.messageId)
}

export default emailOlvidePassword;