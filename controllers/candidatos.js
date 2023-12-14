const { response, request } = require("express");
const Candidato = require("../models/candidato");
const Visita = require("../models/visita");
const sequelize = require("../database/config").sequelize;

const candidatosGet = async (req = request, res = response) => {
  try {
    const [results] = await sequelize.query("SELECT * FROM candidatos;");

    return res.json({
      candidatos: results,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const candidatosPost = async (req, res = response) => {
  try {
    // obtener datos del body
    const {
      nombre,
      edad,
      estado,
      municipio,
      colonia,
      calle,
      entre_calles,
      no_int = "",
      no_ext,
      institucion,
      grado_escolaridad,
      fotografia = "",
      id_tipo_apoyo,
      id_estatus,
      latitud,
      longitud,
    } = req.body;

    const candidato = await Candidato.findOne({
      where: {
        nombre,
      },
      requires: true,
    });

    if (candidato) {
      return res.status(400).json({
        msg: `El candidato ${candidato.nombre}, ya existe`,
      });
    }

    // llamar procedimiento
    await Candidato.sequelize.query(
      `CALL insertar_candidato(:nombre, :edad, :estado, :municipio, :colonia, :calle, :entre_calles, :no_int, :no_ext, :institucion, :grado_escolaridad, :fotografia, :id_tipo_apoyo, :id_estatus, :latitud, :longitud)`,
      {
        replacements: {
          nombre,
          edad,
          estado,
          municipio,
          colonia,
          calle,
          entre_calles,
          no_int,
          no_ext,
          institucion,
          grado_escolaridad,
          fotografia,
          id_tipo_apoyo,
          id_estatus,
          latitud,
          longitud,
        },
      }
    );

    res.json({
      msg: "Candidato registrado",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al insertar candidato" });
  }
};

const candidatosPut = async (req, res = response) => {
  try {
    const { id } = req.params;
    // obtener datos del body
    const {
      nombre,
      edad,
      estado,
      municipio,
      colonia,
      calle,
      entre_calles,
      no_int = "",
      no_ext,
      institucion,
      grado_escolaridad,
      fotografia = "",
      id_tipo_apoyo,
      id_estatus,
      latitud = 0.0,
      longitud = 0.0,
      pregunta1 = 0,
      pregunta2 = "",
      pregunta3 = "",
      pregunta4 = "",
      pregunta5 = "",
      pregunta6 = "",
      pregunta7 = "",
      pregunta8 = "",
      pregunta9 = "",
    } = req.body;

    const candidatoActual = await Candidato.findByPk(id);

    if (!candidatoActual.nombre === nombre) {
      const candidato = await Candidato.findOne({
        where: {
          nombre,
        },
        requires: true,
      });

      if (candidato) {
        return res.status(400).json({
          msg: `El candidato ${candidato.nombre}, ya existe`,
        });
      }
    }

    const pregunta10 = JSON.stringify({
      a1: req.body.pregunta10.a1,
      a2: req.body.pregunta10.a2,
    });

    // Llamar al procedimiento
    await Candidato.sequelize.query(
      `CALL actualizar_candidato(:id, :nombre, :edad, :estado, :municipio, :colonia, :calle, :entre_calles, :no_int, :no_ext, :institucion, :grado_escolaridad, :fotografia, :id_tipo_apoyo, :id_estatus, :latitud, :longitud, :pregunta1, :pregunta2, :pregunta3, :pregunta4, :pregunta5, :pregunta6, :pregunta7, :pregunta8, :pregunta9, :pregunta10)`,
      {
        replacements: {
          id,
          nombre,
          edad,
          estado,
          municipio,
          colonia,
          calle,
          entre_calles,
          no_int,
          no_ext,
          institucion,
          grado_escolaridad,
          fotografia,
          id_tipo_apoyo,
          id_estatus,
          latitud,
          longitud,
          pregunta1,
          pregunta2,
          pregunta3,
          pregunta4,
          pregunta5,
          pregunta6,
          pregunta7,
          pregunta8,
          pregunta9,
          pregunta10,
        },
      }
    );

    res.json({
      msg: "Candidato actualizado",
      id, // Respondemos con el ID actualizado
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar candidato" });
  }
};
const candidatosApoyoPut = async (req, res = response) => {
  try {
    const { id } = req.params;
    // obtener datos del body
    const { id_estatus_apoyo } = req.body;
    // Llamar al procedimiento
    await sequelize.query(
      `UPDATE candidatos SET id_estatus=${id_estatus_apoyo}`
    );
    res.json({
      msg: "Estatus del candidato actualizado",
      id, // Respondemos con el ID actualizado
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Error al actualizar el estatus del candidato" });
  }
};

const visitasPost = async (req, res = response) => {
  try {
    const { id_candidato } = req.params;
    // obtener datos del body
    const {
      id_usuario,
      razon = "",
      id_estatus_encuesta = 0,
      fotografia = "",
      latitud = 0.0,
      longitud = 0.0,
    } = req.body;
    // llamar procedimiento
    await Visita.sequelize.query(
      `CALL insertar_visita(:id_candidato, :id_usuario, :razon, :id_estatus_encuesta, :fotografia, :latitud, :longitud)`,
      {
        replacements: {
          id_candidato,
          id_usuario,
          razon,
          id_estatus_encuesta,
          fotografia,
          latitud,
          longitud,
        },
      }
    );
    res.json({
      msg: "Visita registrada",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al insertar candidato" });
  }
};

const visitasGet = async (req, res = response) => {
  try {
    const { id_visita } = req.params;
    // llamar procedimiento
    const [result] = await sequelize.query(
      `SELECT v.id_visita,v.id_candidato,v.id_usuario,v.razon,v.id_estatus_encuesta,v.fotografia AS fotografia_visita,v.latitud,v.longitud,v.created_at AS date_visita,c.nombre,c.edad,c.estado,c.municipio,c.colonia,c.calle,c.entre_calles,c.no_int,c.no_ext,c.institucion,c.grado_escolaridad,c.fotografia AS fotografia_candidato,c.id_tipo_apoyo,c.id_estatus,c.pregunta1,c.pregunta2,c.pregunta3,c.pregunta4,c.pregunta5,c.pregunta6,c.pregunta7,c.pregunta8,c.pregunta9,c.pregunta10,c.created_at AS date_candidato,u.nombre AS nombre_usuario, u.correo, u.password,u.id_rol FROM visitas AS v INNER JOIN candidatos AS c ON v.id_candidato=c.id_candidato INNER JOIN usuarios AS u ON u.id_usuario=v.id_usuario WHERE id_visita=${id_visita};`
    );
    res.json({
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al insertar candidato" });
  }
};

module.exports = {
  candidatosGet,
  candidatosPost,
  candidatosPut,
  visitasPost,
  candidatosApoyoPut,
  visitasGet,
};
