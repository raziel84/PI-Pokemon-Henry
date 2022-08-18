const { Router } = require("express");
//Funciones del controlador
const {
  post,
  getAll,
  getByID,
} = require("../controllers/Pokemon-controller.js");

const router = Router();

router.get("/", getAll);
router.get("/:id", getByID);
router.post("/", post);

module.exports = router;
