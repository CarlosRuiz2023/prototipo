const { Router } = require("express");
const { check } = require("express-validator");
const { validarArchivoSubir } = require("../middlewares/validar-archivo");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  cargarArchivo,
  mostrarImagen,
  actualizarImagenCloudinary,
  actualizarImagen,
} = require("../controllers/uploads");
const { coleccionesPermitidas } = require("../helpers/db-validators");

const router = Router();

router.post("/", validarArchivoSubir, cargarArchivo);

router.put(
  "/:coleccion/:id",
  [
    validarArchivoSubir,
    check("id", "El id es obligatorio").not().isEmpty(),
    check("id", "La id debe ser un numero").isNumeric(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["candidatos", "visitas"])
    ),
    validarCampos,
  ],
  //actualizarImagenCloudinary
  actualizarImagen
);

router.get(
  "/:coleccion/:id",
  [
    check("id", "El id es obligatorio").not().isEmpty(),
    check("id", "La id debe ser un numero").isNumeric(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["candidatos", "visitas"])
    ),
    validarCampos,
  ],
  mostrarImagen
);

module.exports = router;
