const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const {
  emailExiste,
  existeUsuarioPorId,
  emailInexiste,
} = require("../helpers/db-validators");

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  cambiarPassPut,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "El email es obligatorio").not().isEmpty(),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(emailExiste),
    check("password", "La contrasenia es obligatoria").not().isEmpty(),
    check("id_rol", "El id_rol es obligatorio").not().isEmpty(),
    check("id_rol").isNumeric().isInt({ min: 1, max: 3 }),
    validarCampos,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    check("id", "El id es obligatorio").not().isEmpty(),
    check("id", "EL id debe ser un numero").isNumeric(),
    check("id").custom(existeUsuarioPorId),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "El email es obligatorio").not().isEmpty(),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom((correo, { req }) => {
      const id = req.params.id; // Obtén el ID de los parámetros de la ruta
      return emailInexiste(correo, id);
    }),
    check("password", "La contrasenia es obligatoria").not().isEmpty(),
    check("id_rol", "El id_rol es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  usuariosPut
);

router.get(
  "/cambiarPass/:correo",
  [
    check("correo", "El id es obligatorio").not().isEmpty(),
    check("password", "La contrasenia es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  cambiarPassPut
);

router.delete(
  "/:id",
  [
    check("id", "El id es obligatorio").not().isEmpty(),
    check("id", "EL id debe ser un numero").isNumeric(),
    check("id").custom(existeUsuarioPorId),
    check("estatus", "El estatus es obligatorio").not().isEmpty(),
    check("estatus").isNumeric().isInt({ min: 1, max: 3 }),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
