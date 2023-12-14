const path = require("path");
const fs = require("fs");
const { response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");
const Visita = require("../models/visita");
const Candidato = require("../models/candidato");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const cargarArchivo = async (req, res = response) => {
  try {
    //txt, md
    //const nombre = await subirArchivo(req.files, ["txt", "md"], "textos");
    const nombre = await subirArchivo(req.files, undefined, "imgs");
    res.json({ nombre });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const actualizarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "candidatos":
      modelo = await Candidato.findOne({
        where: {
          id_candidato: id,
        },
      });
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un usuario con el id ${id}` });
      }
      break;
    case "visitas":
      modelo = await Visita.findOne({
        where: {
          id_visita: id,
        },
      });
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un producto con el id ${id}` });
      }
      break;
    default:
      return res.status(500).json({ msg: "Se me olvido validar esto" });
  }
  //Limpiar imagenes previas
  if (modelo.fotografia) {
    const pathImagen = path.join(
      __dirname,
      "../uploads/",
      coleccion,
      modelo.fotografia
    );
    if (fs.existsSync(pathImagen)) {
      try {
        fs.unlinkSync(pathImagen);
      } catch (error) {
        console.error("Error al borrar la imagen previa:", error);
      }
    }
  }

  const nombre = await subirArchivo(req.files, undefined, coleccion);
  modelo.fotografia = nombre;

  await modelo.save();

  res.json(modelo);
};

const mostrarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params;
  let modelo;

  switch (coleccion) {
    case "candidatos":
      modelo = await Candidato.findOne({
        where: {
          id_candidato: id,
        },
      });
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un candidato con el id ${id}` });
      }
      break;
    case "visitas":
      modelo = await Visita.findOne({
        where: {
          id_visita: id,
        },
      });
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe una visita con el id ${id}` });
      }
      break;
    default:
      return res.status(500).json({ msg: "Se me olvido validar esto" });
  }
  //Limpiar imagenes previas
  if (modelo.fotografia) {
    const pathImagen = path.join(
      __dirname,
      "../uploads/",
      coleccion,
      modelo.fotografia
    );
    if (fs.existsSync(pathImagen)) {
      try {
        return res.sendFile(pathImagen);
      } catch (error) {
        console.error("Error al borrar la imagen previa:", error);
      }
    }
  }

  const pathImagen = path.join(__dirname, "../assets/no-image.jpg");
  res.sendFile(pathImagen);
};

const actualizarImagenCloudinary = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "candidatos":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un usuario con el id ${id}` });
      }
      break;
    case "visitas":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un producto con el id ${id}` });
      }
      break;
    default:
      return res.status(500).json({ msg: "Se me olvido validar esto" });
  }
  //Limpiar imagenes previas
  if (modelo.fotografia) {
    const nombreArr = modelo.fotografia.split("/");
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split(".");
    await cloudinary.uploader.destroy(public_id);
  }
  const { tempFilePath } = req.files.archivo;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  //const nombre = await subirArchivo(req.files, undefined, coleccion);
  modelo.fotografia = secure_url;

  await modelo.save();

  res.json(modelo);
};

module.exports = {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen,
  actualizarImagenCloudinary,
};
