const { response } = require("express");
const nodemailer = require("nodemailer");
const sequelize = require("../database/config").sequelize;
const bcryptjs = require("bcryptjs");

// Configuración del transporter para Gmail
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "charlyxbox360nuevo@gmail.com",
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

transporter.verify().then(() => {
  console.log("Ready for send emails");
});

const soporteCorreoPost = async (req, res = response) => {
  try {
    const { correo } = req.params;

    // Construye el enlace de activación (cambia por tu lógica real)
    const activationLink = `https://prototipo2023-d6240700184c.herokuapp.com/api/soporte/contrasenia/${correo}`;

    const mailOptions = {
      from: '"Soporte" <charlyxbox360nuevo@gmail.com>',
      to: "juancarlosruizgomez2000@gmail.com", // Cambia esto por el correo del destinatario
      subject: "Solicitud de cambio de contraseña",
      text: `Hola,\n\nSe ha solicitado un cambio de contraseña. Por favor, haz clic en el siguiente enlace para activar:\n\n${activationLink}\n\nAtentamente,\nCharly`,
    };
    await transporter.sendMail(mailOptions);
    res.json({
      ok: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error.toString());
  }
};

const soporteCorreoPost1 = async (req, res = response) => {
  try {
    const { correo } = req.params;

    // Se construye el formulario
    const resetForm = `
  <form style="
          max-width: 500px;  
          margin: 0 auto;
          border: 2px solid #ccc; 
          padding: 20px;
        " 
        method="GET" 
        action="http://localhost:8080/api/usuarios/cambiarPass/${correo}">

    <h1 style="text-align: center;">Restablecer contraseña</h1>  

    <label style="display:block; margin-bottom: 10px;" 
           for="password">Nueva contraseña:</label>
           
    <input style="display: block; 
                  padding: 10px;
                  width: 95%;  
                  border-radius: 4px;           
                  border: 1px solid #aaa;"
           type="password" 
           id="password" 
           name="password"
           placeholder="New Password">
    
           <label style="display:block; margin-bottom: 10px;" 
           for="password">Confirma tu contraseña:</label>
           
    <input style="display: block; 
                  padding: 10px;
                  width: 95%;  
                  border-radius: 4px;           
                  border: 1px solid #aaa;"
           type="password" 
           id="passwordConfim" 
           name="passwordConfirm"
           placeholder="New Password">
           
    <button style="display: block;
                   margin: 20px auto 0;
                   padding: 10px;                 
                   background-color: #1565C0; 
                   color: #fff;
                   border-radius: 4px;
                   border: none;" 
            type="submit">
      Cambiar contraseña
    </button>  

  </form>

`;

    const html = `
<div style="">
  <table width="500" align="center" style="border-collapse: collapse;">

    <tr>
      <td style="padding: 15px; background-color: #1565C0; color: white; text-align: center;">
        <h1 style="margin:0;">Cambio de Contraseña</h1>  
      </td>
    </tr>

    <tr>
      <td style="padding: 20px; line-height: 1.5; ">    
        <p style="font-size: 18px;">
          Buenos Días<br><br>
          Usted ha solicitado restablecer su contraseña.
          Por favor ingresa y confirma tu nueva contraseña en el siguiente formulario:
        </p>

        ${resetForm}

        <p style="font-size: 18px;">
          Saludos cordiales, <br>
          Equipo de Soporte
        </p>
        
      </td>
    </tr>

  </table>
`;

    const mailOptions = {
      from: '"Soporte" <soporte@midominio.com>',
      to: correo,
      subject: "Solicitud de cambio de contraseña",
      html: html,
      headers: {
        "Content-Type": "text/html",
      },
    };

    await transporter.sendMail(mailOptions);

    res.json({ ok: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error.toString());
  }
};

const soportePasswordPost = async (req, res) => {
  try {
    const { correo } = req.params;

    // Generar contraseña aleatoria
    const newPassword = generateRandomPassword();

    // Opciones de correo
    const mailOptions = {
      from: '"Soporte" <charlyxbox360nuevo@gmail.com>',
      to: correo,
      subject: "Nueva contraseña",
      text: `Hola, 
                 Tu nueva contraseña es: ${newPassword}
                 Por favor cámbiala después de iniciar sesion.`,
    };

    // Enviar Correo
    await transporter.sendMail(mailOptions);

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    const password = bcryptjs.hashSync(newPassword, salt);

    // Llamar al procedimiento
    await sequelize.query(
      `UPDATE usuarios SET password = '${password}' WHERE correo='${correo}'`
    );

    res.json({
      ok: true,
      msg: "Que revise su correo para ver su nueva contraseña",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Error al enviar contraseña. Intente más tarde" });
  }
};

function generateRandomPassword() {
  return Math.random().toString(36).slice(-8);
}

module.exports = { soporteCorreoPost1, soportePasswordPost };
