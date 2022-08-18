//Importo las acciones
import {
  TODOS,
  TIPOS,
  CREADO,
  //DETALLE,
  BUSQUEDA_POR_NOMBRE,
  ERROR,
  FILTRO_POR_ORIGEN,
  FILTRO_POR_TIPO,
  ORDEN_ASC_DESC,
  ORDEN_POR_ATAQUE,
} from "./actions";
//Declaro los estados iniciales
const initialState = {
  pokemons: [],
  todosLosPk: [],
  tipos: [],
  todosLosTipos: [],
  pkDetalle: [],
  error: [],
};

const casos = {
  [TODOS]: (state, action) => {
    return {
      ...JSON.parse(JSON.stringify(state)),
      pokemons: action.payload,
      todosLosPk: action.payload,
    };
  },
  [TIPOS]: (state, action) => {
    return {
      ...JSON.parse(JSON.stringify(state)),
      tipos: action.payload,
      todosLosTipos: action.payload,
    };
  },
  [ERROR]: (state, action) => {
    return {
      ...JSON.parse(JSON.stringify(state)),
      error: action.payload,
      pokemons: [],
    };
  },
  [CREADO]: (state, action) => {
    return {
      ...JSON.parse(JSON.stringify(state)),
    };
  },
  // [DETALLE]: (state, action) => {
  //   return {
  //     ...JSON.parse(JSON.stringify(state)),
  //     pkDetalle: action.payload,
  //   };
  // },
  [BUSQUEDA_POR_NOMBRE]: (state, action) => {
    //console.log("respuesta " + action.payload);
    return {
      ...JSON.parse(JSON.stringify(state)),
      pokemons: action.payload,
      error: [],
    };
  },
  [ORDEN_ASC_DESC]: (state, action) => {
    const ordenados =
      action.payload === "ascendente"
        ? state.pokemons.sort((el1, el2) => {
            return el1.Nombre.toUpperCase() > el2.Nombre.toUpperCase()
              ? 1
              : el1.Nombre.toUpperCase() < el2.Nombre.toUpperCase()
              ? -1
              : 0;
          })
        : state.pokemons.sort((el1, el2) => {
            return el1.Nombre.toUpperCase() > el2.Nombre.toUpperCase()
              ? -1
              : el1.Nombre.toUpperCase() < el2.Nombre.toUpperCase()
              ? 1
              : 0;
          });

    return {
      ...JSON.parse(JSON.stringify(state)),
      pokemons: ordenados,
    };
  },
  [ORDEN_POR_ATAQUE]: (state, action) => {
    console.log("filtro ataque " + action.payload);
    const ordenados =
      action.payload === "menorAtaque"
        ? state.pokemons.sort((el1, el2) => {
            return el1.Ataque > el2.Ataque
              ? 1
              : el1.Ataque < el2.Ataque
              ? -1
              : 0;
          })
        : state.pokemons.sort((el1, el2) => {
            return el1.Ataque > el2.Ataque
              ? -1
              : el1.Ataque < el2.Ataque
              ? 1
              : 0;
          });

    return {
      ...JSON.parse(JSON.stringify(state)),
      pokemons: ordenados,
    };
  },
  [FILTRO_POR_ORIGEN]: (state, action) => {
    console.log("filtro origen " + action.payload);
    const pkOrigen = state.todosLosPk;
    const pkFiltrados =
      action.payload === "todos"
        ? pkOrigen
        : action.payload === "Creado"
        ? pkOrigen.filter((pk) => pk.hasOwnProperty(action.payload))
        : pkOrigen.filter((pk) => !pk.hasOwnProperty("Creado"));
    return { ...JSON.parse(JSON.stringify(state)), pokemons: pkFiltrados };
  },
  [FILTRO_POR_TIPO]: (state, action) => {
    console.log("filtro tipo " + action.payload);
    const pokemons = state.todosLosPk;
    //console.log("*******--- " + pokemons[0].tipos[0].Nombre);
    const pkFiltrados = pokemons.filter((pk) => {
      //console.log("tipos " + pk.tipos.map((t) => t.Nombre));
      //console.log("Nombre pk " + pk.Nombre);
      const auxComp = pk.tipos.map((t) => {
        //console.log("Tipo nombre " + t.Nombre);
        return t.Nombre === action.payload ? t : undefined;
      });
      //console.log("supuestamente tipos " + auxComp[0]);
      //console.log("contenido aux " + auxComp.map((t) => t === undefined));
      return auxComp[0] !== undefined || auxComp[1] !== undefined;
    });

    return { ...JSON.parse(JSON.stringify(state)), pokemons: pkFiltrados };
  },
};

const reducer = (state = initialState, action) => {
  return casos.hasOwnProperty(action.type)
    ? casos[action.type](state, action)
    : state;
};

export default reducer;
