import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
//import { detalle } from "../redux/actions.js";
import { Link } from "react-router-dom";
import axios from "axios";
import style from "./Details.module.css";

const RUTA_GET = "http://localhost:3001/pokemons";

function Details(props) {
  const dispatch = useDispatch();
  //   console.log(props);

  //Utilizo un estado local para buscar el detalle y mostrarlo evitando así utilizar el estado global
  const [pkDetalle, setPkDetalle] = useState([]);

  useEffect(() => {
    dispatch(detalle(props.match.params.id));
  }, [props.match.params.id]);

  const detalle = (id) => {
    return async () => {
      let datos = await axios.get(RUTA_GET + "/" + id);
      //console.log("respuesta server " + datos.data);
      return setPkDetalle(datos.data);
    };
  };
  //const pkDetalle = useSelector((state) => state.pkDetalle);

  return (
    <section className={style.sectionDetails}>
      <div key={pkDetalle.length}>
        <Link to={"/pokemons"}>
          <button className={style.button}>Inicio</button>
        </Link>
      </div>

      {pkDetalle?.map((pk) => {
        return (
          <section className={style.divDetails}>
            <label>{pk.Nombre}</label>
            <img
              src={pk.Imagen}
              alt="Imagen no encontrada"
              width="200px"
              height="200px"
            />
            <h4>Nro ID: {pk.ID}</h4>
            <h4>Vida: {pk.Vida}</h4>
            <h4>Ataque: {pk.Ataque}</h4>
            <h4>Defensa: {pk.Defensa}</h4>
            <h4>Velocidad: {pk.Velocidad}</h4>
            <h4>Altura: {pk.Altura}</h4>
            <h4>Peso: {pk.Peso}</h4>
          </section>
        );
      })}
    </section>
  );
}

export default Details;
