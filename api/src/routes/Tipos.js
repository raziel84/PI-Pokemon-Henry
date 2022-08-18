const { Router } = require("express");

const router = Router();
//Funciones del controlador
const { getTypes, postTipo } = require("../controllers/Tipos-controller.js");

router.get("/", getTypes);
router.post("/crear", postTipo);

module.exports = router;
