import nodemailer from "nodemailer";

const emailRegistro = async ( datos ) => {
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
        subject: "Comprueba tu cuenta en APV",
        html: `<p>Hola: ${nombre}, te has registrado correctamente en APV. El siguiente paso es
            comprobar tu cuenta </p>
            <p>Haz click en el siguiente enlace para confirmar: 
            <a href="http://localhost:3000/confirmar/${token}">Comprobar cuenta</a></p>
            <p>Si no has creado esta cuenta ignora este mensaje </p>
        `
      });
      console.log("Mensaje enviado: %s", info.messageId)
}

export default emailRegistro;