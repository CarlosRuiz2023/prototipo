const { response, request } = require("express");
const sequelize = require("../database/config").sequelize;

const rolesGet = async (req, res = response) => {
  try {
    const [results] = await sequelize.query("SELECT nombre FROM roles;");

    // Mapear nombres para remover el ID
    const rolesSimplificados = results.map((rol) => {
      const { id, nombre } = rol;
      return nombre;
    });

    return res.json({
      roles: rolesSimplificados,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

module.exports = { rolesGet };
