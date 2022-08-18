import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import style from "./Tipos.module.css";

const RUTA_TIPOS = "http://localhost:3001/pokemons/tipos";

function Tipos() {
  const dispatch = useDispatch();

  //Utilizo un estado local para buscar los tipos de pokemon y mostrarlo evitando así utilizar el estado global
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    dispatch(consultarTipos());
  }, []);

  const consultarTipos = () => {
    return async () => {
      let datos = await axios.get(RUTA_TIPOS);
      //console.log("respuesta server " + datos.data);
      return setTipos(datos.data);
    };
  };
  //const pkDetalle = useSelector((state) => state.pkDetalle);

  return (
    <section className={style.sectionTipos}>
      <h1 className={style.titulo}>Tipos de pokemon</h1>
      <div>
        <Link to={"/pokemons"}>
          <button className={style.button}>Inicio</button>
        </Link>
      </div>

      <div className={style.divTipos}>
        {tipos?.map((t) => {
          return <label>{t}</label>;
        })}
      </div>
    </section>
  );
}

export default Tipos;
