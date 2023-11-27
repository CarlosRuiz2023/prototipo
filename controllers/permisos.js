const { response, request } = require("express");
const sequelize = require("../database/config").sequelize;

const permisosGet = async (req, res = response) => {
  try {
    const { id_rol } = req.params;
    const [results] = await sequelize.query(
      `SELECT p.nombre FROM permisos AS p INNER JOIN roles_permisos AS r ON p.id_permiso=r.id_permiso WHERE id_rol = ${id_rol};`
    );

    // Mapear nombres para reestructurar
    const permisosSimplificados = results.map((permiso) => {
      const { nombre } = permiso;
      return nombre;
    });

    return res.json({
      permisos: permisosSimplificados,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

module.exports = { permisosGet };
