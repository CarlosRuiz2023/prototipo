const { response, request } = require("express");
const sequelize = require("../database/config").sequelize;

const apoyosGet = async (req, res = response) => {
  try {
    const [results] = await sequelize.query(`SELECT * FROM tipos_apoyo;`);

    // Mapear nombres para reestructurar
    const apoyosSimplificados = results.map((apoyo) => {
      const { nombre } = apoyo;
      return nombre;
    });

    return res.json({
      apoyo: apoyosSimplificados,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const apoyosEstatusGet = async (req, res = response) => {
  try {
    const [results] = await sequelize.query(`SELECT * FROM estatus_apoyo;`);

    // Mapear nombres para reestructurar
    const apoyosSimplificados = results.map((apoyo) => {
      const { nombre } = apoyo;
      return nombre;
    });

    return res.json({
      apoyo_estatus: apoyosSimplificados,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

module.exports = { apoyosEstatusGet, apoyosGet };
