const { Router } = require("express");
const { check } = require("express-validator");
const {
  soporteCorreoPost1,
  soportePasswordPost,
} = require("../controllers/soporte");
const { validarCampos } = require("../middlewares/validar-campos");
const { emailExistente } = require("../helpers/db-validators");

const router = Router();

router.post(
  "/correo/:correo",
  [
    check("correo", "El correo es obligatorio").not().isEmpty(),
    check("correo").custom(emailExistente),
    validarCampos,
  ],
  soporteCorreoPost1
);

router.get(
  "/contrasenia/:correo",
  [
    check("correo", "El correo es obligatorio").not().isEmpty(),
    check("correo").custom(emailExistente),
    validarCampos,
  ],
  soportePasswordPost
);

module.exports = router;
