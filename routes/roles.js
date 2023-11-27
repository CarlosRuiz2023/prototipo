const { Router } = require("express");
const { rolesGet } = require("../controllers/roles");

const router = Router();

router.get("/", rolesGet);

module.exports = router;
