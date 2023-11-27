const { response, request } = require("express");
const Usuario = require("../models/usuario");
const sequelize = require("../database/config").sequelize;
const bcryptjs = require("bcryptjs");

const usuariosGet = async (req = request, res = response) => {
  try {
    const [results] = await sequelize.query(
      "SELECT * FROM usuarios WHERE estatus!=2"
    );

    return res.json({
      usuarios: results,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const usuariosPost = async (req, res = response) => {
  try {
    // obtener datos del body
    const { correo, nombre, id_rol } = req.body;
    let { password } = req.body;

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    password = bcryptjs.hashSync(password, salt);

    // llamar procedimiento
    await Usuario.sequelize.query(
      `CALL insertar_usuario(:nombre, :id_rol, :correo, :password)`,
      {
        replacements: {
          nombre,
          id_rol,
          correo,
          password,
        },
      }
    );

    res.json({
      msg: "Usuario registrado",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al insertar usuario" });
  }
};

const usuariosPut = async (req, res = response) => {
  try {
    const { id } = req.params;
    // obtener datos del body
    const { correo, nombre, id_rol, latitud = 0.0, longitud = 0.0 } = req.body;
    let { password } = req.body;

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    password = bcryptjs.hashSync(password, salt);

    // Llamar al procedimiento
    await Usuario.sequelize.query(
      `CALL actualizar_usuario(:id, :correo, :password, :id_rol, :nombre, :latitud, :longitud)`,
      {
        replacements: {
          id,
          correo,
          password,
          id_rol,
          nombre,
          latitud,
          longitud,
        },
      }
    );

    res.json({
      msg: "Usuario actualizado",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar usuario" });
  }
};

const usuariosDelete = async (req, res = response) => {
  try {
    const { id } = req.params;

    const { estatus } = req.body;

    // Llamar al procedimiento almacenado para desactivar el cliente
    await Usuario.sequelize.query(`CALL eliminar_usuario(:id, :estatus)`, {
      replacements: {
        id,
        estatus,
      },
    });

    res.json({ msg: "Estatus del usuario modificado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al cambiar el estatus del usuario" });
  }
};

const cambiarPassPut = async (req, res = response) => {
  try {
    const { id } = req.params;
    // obtener datos del body
    let { password } = req.body;

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    password = bcryptjs.hashSync(password, salt);

    // Llamar al procedimiento
    await sequelize.query(
      `UPDATE usuarios SET password = '${password}' WHERE id_usuario=${id}`
    );

    res.json({
      msg: "Password actualizada",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar password" });
  }
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  cambiarPassPut,
};
