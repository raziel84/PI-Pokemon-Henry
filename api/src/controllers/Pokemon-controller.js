const axios = require("axios");
const { Pokemon, Tipo } = require("../db.js");

//FUNCIONES AUXILIARES
async function obtenerDatos(rutasPokemon) {
  let aux = [];

  try {
    await Promise.all(rutasPokemon.map((url) => axios.get(url))).then(
      (response) => {
        response.map((pk) => {
          aux.push({
            Nombre: pk.data.name,
            Imagen: pk.data.sprites.other["official-artwork"].front_default,
            tipos: pk.data.types.map((tipo) => {
              return {
                Nombre: tipo.type.name,
              };
            }),
            ID: pk.data.id,
            //Vida: pk.data.stats[0].base_stat,
            Vida: pk.data.stats.find((estado) => estado.stat.name === "hp")
              .base_stat,
            Ataque: pk.data.stats.find(
              (estado) => estado.stat.name === "attack"
            ).base_stat,
            Defensa: pk.data.stats.find(
              (estado) => estado.stat.name === "defense"
            ).base_stat,
            Velocidad: pk.data.stats.find(
              (estado) => estado.stat.name === "speed"
            ).base_stat,
            Altura: pk.data.height,
            Peso: pk.data.weight,
          });
        });
        //console.log(response[0].data.stats[0].base_stat);
      }
    );

    return aux;
  } catch (error) {
    res.status(404).json({
      message: "Algo fallo al mapear los datos.",
      function: "obtenerDatos",
      error: error,
    });
  }
}

async function getByName(name) {
  aux = [];
  console.log("name: " + name);
  try {
    const pkDB = await Pokemon.findAll({ include: Tipo });

    //console.log("pkDB: " + pkDB);

    let buscado = pkDB.filter(
      (pk) => pk.Nombre.toLowerCase() === name.toLowerCase()
    );

    if (buscado.length) {
      //console.log("buscado: " + !buscado.length);
      return buscado;
    } else {
      aux = await obtenerDatos([
        "https://pokeapi.co/api/v2/pokemon/" + name.toLowerCase(),
      ]);
      return aux === undefined
        ? {
            message: "No se encontro el pokemon solicitado.",
            function: "getByName",
            error: "aux igual a undefined",
          }
        : aux;
    }
  } catch (error) {
    //next(error);
    return {
      message: "No se encontro el pokemon solicitado.",
      function: "getByName",
      error: error,
    };
  }
}

//FUNCIONES CONTROLADORAS
//GET
const getAll = async (req, res, next) => {
  let respuesta = [];

  const { name } = req.query;
  //console.log(name);
  if (name) {
    const aux = await getByName(name);

    if (aux.hasOwnProperty("message")) {
      //console.log("getByName fallo");
      return res.status(400).json(aux);
    }
    res.send(aux);
  } else {
    try {
      //Primera consulta a la API trae 20 pokemon
      const consultaAPI = await axios.get("https://pokeapi.co/api/v2/pokemon/");

      //Segunda consulta para traer otros 20 pokemon
      const segundaConsultaApi = consultaAPI.data.next
        ? await axios.get(consultaAPI.data.next)
        : [];

      //Consulta a la BD
      const consultaBD = await Pokemon.findAll({
        include: [
          {
            model: Tipo,
            through: { attributes: [] },
            attributes: ["Nombre"],
          },
        ],
      });
      //res.send(consultaBD);

      if (consultaAPI || consultaBD) {
        //signo ? (optional chaining) para verificar si results existe antes de formatear los datos
        let rutasPokemon = consultaAPI.data.results?.map((pokemon) => {
          return pokemon.url;
        });

        respuesta = await obtenerDatos(rutasPokemon);

        rutasPokemon = [];

        rutasPokemon = segundaConsultaApi.data.results?.map((pokemon) => {
          return pokemon.url;
        });

        if (rutasPokemon) {
          respuesta = respuesta.concat(await obtenerDatos(rutasPokemon));
        }

        //spread operator para unir datos de la APi con los de la BD
        let datosCompletados = [...respuesta, ...consultaBD];
        //   console.log(datos);
        res.send(datosCompletados);
      } else {
        res.json({ message: "Datos no encontrados" });
      }
    } catch (error) {
      res.send({
        message: "No se encontro el pokemon solicitado.",
        function: "getAll",
        error: error,
      });
    }
  }
};

const getByID = async (req, res, next) => {
  const { id } = req.params;
  const aux = [];

  console.log("ID:******* " + id);

  if (id.length === 36) {
    const pkDB = await Pokemon.findByPk(id, { include: Tipo });
    //console.log("respuesta BD" + pkDB);
    if (pkDB) {
      //console.log("buscado: " + id.length);
      res.send([pkDB]);
    } else {
      res.json({ message: "No se encuentra ningún pokemon con el id " + id });
    }
  } else {
    try {
      if (isNaN(id)) {
        console.log("ID incorrecto " + id);
        res.status(400).json({ message: "ID incorrecto " + id });
      }

      //https://pokeapi.co/api/v2/pokemon/{id}
      const pk = await axios.get("https://pokeapi.co/api/v2/pokemon/" + id);
      //console.log(consultaAPI.data);
      //console.log("statusCode: " + pk.status);
      if (pk.status === 200) {
        aux.push({
          Nombre: pk.data.name,
          Imagen: pk.data.sprites.other["official-artwork"].front_default,
          Tipos: pk.data.types.map((tipo) => tipo.type.name),
          ID: pk.data.id,
          //Vida: pk.data.stats[0].base_stat,
          Vida: pk.data.stats.find((estado) => estado.stat.name === "hp")
            .base_stat,
          Ataque: pk.data.stats.find((estado) => estado.stat.name === "attack")
            .base_stat,
          Defensa: pk.data.stats.find(
            (estado) => estado.stat.name === "defense"
          ).base_stat,
          Velocidad: pk.data.stats.find(
            (estado) => estado.stat.name === "speed"
          ).base_stat,
          Altura: pk.data.height,
          Peso: pk.data.weight,
        });

        res.send(aux);
      } else {
        res.json({ message: "No se encuentra ningún pokemon con el id " + id });
      }
    } catch (error) {
      //next(error);
      res.status(404).json({
        message: "Pokemon no encontrado.",
        function: "getByID",
        error: error,
      });
    }
  }
};

//POST
const post = async (req, res, next) => {
  const {
    Nombre,
    Imagen,
    Vida,
    Ataque,
    Defensa,
    Velocidad,
    Altura,
    Peso,
    tipos,
  } = req.body;

  console.log({
    Nombre,
    Imagen,
    Vida,
    Ataque,
    Defensa,
    Velocidad,
    Altura,
    Peso,
    tipos,
  });

  try {
    let nuevo = await Pokemon.create({
      Nombre,
      Imagen,
      Vida,
      Ataque,
      Defensa,
      Velocidad,
      Altura,
      Peso,
    });

    // console.log({ nuevo });

    const consultaBD = await Tipo.findAll({});

    let aux = [];

    for (let index = 0; index < tipos.length; index++) {
      const i = consultaBD.find((t) => t.Nombre === tipos[index]).id;

      console.log("indice tipo" + i);
      aux[index] = await nuevo.addTipo(i);
    }

    if (nuevo && aux.length)
      res.json({ message: "Pokemon creado exitosamente", data: nuevo });
    else
      res.json({
        message:
          "Error al crear nuevo pokemon. Por favor revise los datos enviados",
      });
  } catch (error) {
    res.status(404).json({
      message: "No se pudo crear. Revise los datos enviados",
      function: "post",
      error: error,
    });
  }
};

module.exports = {
  getAll,
  getByID,
  post,
};
