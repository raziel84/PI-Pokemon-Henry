const { Router } = require("express");

const router = Router();
//Funciones del controlador
const { getTypes } = require("../controllers/Tipos-controller.js");

router.get("/", getTypes);

module.exports = router;
