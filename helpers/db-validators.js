const Candidato = require("../models/candidato");
const Usuario = require("../models/usuario");
const Visita = require("../models/visita");

const emailExiste = async (correo = "") => {
  //Verificar si el correo existe
  const usuario = await Usuario.findOne({
    where: {
      correo: correo,
    },
  });

  if (usuario) {
    throw new Error(`El correo ${correo} ya está registrado`);
  }
};

const emailExistente = async (correo = "") => {
  //Verificar si el correo existe
  const usuario = await Usuario.findOne({
    where: {
      correo: correo,
    },
  });

  if (!usuario) {
    throw new Error(`El correo ${correo} no se encuentra registrado`);
  }
};

const emailInexiste = async (correo = "", id = 0) => {
  //Verificar si el correo existe
  const usuario = await Usuario.findOne({
    where: {
      correo: correo,
    },
  });
  if (usuario) {
    if (usuario.dataValues.id_usuario != `${id}`) {
      throw new Error(
        `El correo ${correo} ya está registrado con otro usuario`
      );
    }
  }
};

const existeUsuarioPorId = async (id) => {
  // Verificar si el usuario existe por su ID
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    throw new Error(`El usuario con ID ${id} no existe`);
  }
};

const existeCandidatoPorId = async (id) => {
  // Verificar si el candidato existe por su ID
  const candidato = await Candidato.findByPk(id);
  if (!candidato) {
    throw new Error(`El candidato con ID ${id} no existe`);
  }
};

const existeVisitaPorId = async (id_visita) => {
  // Verificar si la visita existe por su ID
  const visita = await Visita.findByPk(id_visita);
  if (!visita) {
    throw new Error(`La visita con ID ${id_visita} no existe`);
  }
};

const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
  const incluida = colecciones.includes(coleccion);
  if (!incluida) {
    throw new Error(
      `La coleccion ${coleccion} no es permitida, ${colecciones}`
    );
  }
  return true;
};

module.exports = {
  emailInexiste,
  emailExiste,
  existeUsuarioPorId,
  emailExistente,
  existeCandidatoPorId,
  existeVisitaPorId,
  coleccionesPermitidas,
};
