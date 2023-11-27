const { Router } = require("express");
const { check } = require("express-validator");
const { login, logout } = require("../controllers/login");
const { validarCampos } = require("../middlewares/validar-campos");
const { existeUsuarioPorId } = require("../helpers/db-validators");

const router = Router();

router.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").not().isEmpty(),
    check("correo", "El correo no es valido").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  login
);

router.post(
  "/logout/:id",
  [
    check("id", "El id es obligatorio").not().isEmpty(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  logout
);

module.exports = router;
