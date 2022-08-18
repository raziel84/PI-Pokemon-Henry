const axios = require("axios");
const { Tipo } = require("../db.js");

const getTypes = async (req, res, next) => {
  let consulta = await Tipo.findAll();
  consulta = consulta.map((type) => type.Nombre);

  if (!consulta.length) {
    try {
      const tiposAPI = await axios.get("https://pokeapi.co/api/v2/type/");
      console.log(tiposAPI.data.results);
      const tipos = tiposAPI.data.results?.map((tipo) => {
        return tipo.name;
      });

      tipos.forEach((el) => {
        Tipo.findOrCreate({ where: { Nombre: el } });
      });

      res.send({ message: "se cargaron los tipos ok" });
    } catch (error) {
      res.status(404).json({
        message: "No se pudieron cargar los tipos de pokemon.",
        function: "getTypes",
        error: error,
      });
    }
  } else {
    res.send(consulta);
  }
};

module.exports = {
  getTypes,
};
