const { Router } = require("express");
const { check } = require("express-validator");
const {
  estadosGet,
  municipiosGet,
  coordenadasPost,
  conexionGet,
} = require("../controllers/services");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", estadosGet);

router.get("/verificarConexion", conexionGet);

router.get(
  "/:estado",
  [check("estado", "El estado es obligatorio").not().isEmpty(), validarCampos],
  municipiosGet
);

router.post(
  "/:tipo_busqueda",
  [
    check("tipo_busqueda", "El tipo_busqueda es obligatorio").not().isEmpty(),
    check("tipo_busqueda", "El tipo_busqueda debe ser un numero entre 0 y 1")
      .isNumeric()
      .isInt({ min: 0, max: 1 }),
    validarCampos,
  ],
  coordenadasPost
);

module.exports = router;
