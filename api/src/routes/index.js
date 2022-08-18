const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const Pokemons = require("./Pokemons.js");
const Tipos = require("./Tipos.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/pokemons/tipos", Tipos);
router.use("/pokemons", Pokemons);

module.exports = router;
