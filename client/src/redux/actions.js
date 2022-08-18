import axios from "axios";

//ACCIONES
export const TODOS = "TODOS";
export const TIPOS = "TIPOS";
//export const DETALLE = "DETALLE";
export const BUSQUEDA_POR_NOMBRE = "BUSQUEDA POR NOMBRE";
export const ERROR = "ERROR";
export const CREADO = "CREADO";

export const ORDEN_ASC_DESC = "ORDEN ASC DESC";
export const ORDEN_POR_ATAQUE = "ORDEN POR ATAQUE";
export const FILTRO_POR_TIPO = "FILTRO POR TIPO";
export const FILTRO_POR_ORIGEN = "FILTRO POR ORIGEN";

//RUTAS
const RUTA_GET = "http://localhost:3001/pokemons";
// const RUTA_POST = "http://localhost:3001/pokemons"
const RUTA_TIPOS = "http://localhost:3001/pokemons/tipos";

//ACTION CREATOR
//CONSULTAS
const todos = () => {
  return async (dispatch) => {
    let datos = await axios.get(RUTA_GET);
    return dispatch({
      type: TODOS,
      payload: datos.data,
    });
  };
};

const crear = (payload) => {
  return async () => {
    let datos = await axios.post(RUTA_GET, payload);
    return datos.data;
  };
};

const creado = () => {
  return (dispatch) => {
    return dispatch({
      type: CREADO,
    });
  };
};

// const detalle = (id) => {
//   return async (dispatch) => {
//     let datos = await axios.get(RUTA_GET + "/" + id);
//     //console.log("respuesta server " + datos.data);
//     return dispatch({
//       type: DETALLE,
//       payload: datos.data,
//     });
//   };
// };

const nombre = (nombrePK) => {
  return async (dispatch) => {
    try {
      let datos = await axios.get(`${RUTA_GET}?name=${nombrePK}`);
      //console.log("respuesta server " + datos.data);
      return dispatch({
        type: BUSQUEDA_POR_NOMBRE,
        payload: datos.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: `No se encontro un pokemon con el nombre ${nombrePK}.`,
      });
    }
  };
};

const todosLosTipos = () => {
  return async (dispatch) => {
    let datos = await axios.get(RUTA_TIPOS);
    return dispatch({
      type: TIPOS,
      payload: datos.data,
    });
  };
};

//FILTROS
const filtroPorOrigen = (filtro) => {
  return {
    type: FILTRO_POR_ORIGEN,
    payload: filtro,
  };
};

const filtroPorTipo = (tipo) => {
  return {
    type: FILTRO_POR_TIPO,
    payload: tipo,
  };
};

//ORDENAMIENTOS
const ordenAscDesc = (orden) => {
  return {
    type: ORDEN_ASC_DESC,
    payload: orden,
  };
};

const ordenPorAtaque = (ataque) => {
  return {
    type: ORDEN_POR_ATAQUE,
    payload: ataque,
  };
};

export {
  todos,
  todosLosTipos,
  //detalle,
  nombre,
  crear,
  creado,
  filtroPorOrigen,
  filtroPorTipo,
  ordenAscDesc,
  ordenPorAtaque,
};

// export default function todos() {
//   return async (dispatch) => {
//     let datos = await axios.get(RUTA_GET);

//     return dispatch({
//       type: TODOS,
//       payload: datos.data,
//     });
//   };
// }

//VERSION FETCH

// const todosFetch = async (dispatch) => {
//   await fetch
//     .get(RUTA_GET)
//     .then((response) => response.json())
//     .then((response) => dispatch({ type: TODOS, payload: response }));
// };
