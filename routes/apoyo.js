const { Router } = require("express");
const { apoyosGet, apoyosEstatusGet } = require("../controllers/apoyo");

const router = Router();

router.get("/", apoyosGet);

router.get("/estatus/", apoyosEstatusGet);

module.exports = router;
