import React from "react";
import { Link } from "react-router-dom";
import Portada from "../portada.jpg";
import style from "./Main.module.css";

function Main() {
  return (
    <section className={style.main} keys={"main"}>
      <div>
        <label>BIENVENIDOS A LA MEJOR POKE API</label>
      </div>
      <div>
        <img
          className={style.img}
          src={Portada}
          alt=""
          width="65%"
          height="65%"
        />
      </div>
      <div>
        <Link to="/pokemons">
          <button className={style.button}>Ingresar</button>
        </Link>
      </div>
    </section>
  );
}

export default Main;
