const { Router } = require("express");
const { check } = require("express-validator");
const { permisosGet } = require("../controllers/permisos");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get(
  "/:id_rol",
  [
    check("id_rol", "El id_rol es obligatorio").not().isEmpty(),
    check("id_rol", "El id_rol debe ser un numero entre 1 y 3")
      .isNumeric()
      .isInt({ min: 1, max: 3 }),
    validarCampos,
  ],
  permisosGet
);

module.exports = router;
