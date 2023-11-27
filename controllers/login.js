const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    //Verificar si el email existe
    const [result] = await Usuario.sequelize.query(
      `SELECT * FROM usuarios WHERE correo = '${correo}';`
    );

    const usuario = result[0];

    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - Correo",
      });
    }

    //Si el usuario esta activo
    if (usuario.estatus === 2) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - estado:false",
      });
    }

    //Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }

    //Generar el JWT
    const token = await generarJWT(usuario.id_usuario);

    //Insertar token
    await Usuario.sequelize.query(
      `UPDATE usuarios SET token = '${token}' WHERE id_usuario = ${usuario.id_usuario};`
    );

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const logout = async (req, res = response) => {
  try {
    const { id } = req.params;

    //Eliminar token
    await Usuario.sequelize.query(
      `UPDATE usuarios SET token = null WHERE id_usuario = ${id};`
    );

    res.json({ msg: "Sesion cerrada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al cerrar la sesion del usuario" });
  }
};

module.exports = {
  login,
  logout,
};
