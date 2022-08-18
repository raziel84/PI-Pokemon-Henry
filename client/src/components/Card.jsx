import React from "react";
import style from "./Card.module.css";

function Card({ Nombre, Imagen, Tipos }) {
  //Destructuring de las props
  return (
    <div className={style.card}>
      <span className={style.cardName}>{Nombre}</span>
      <section>
        <img
          src={Imagen}
          alt="Imagen no encontrada"
          width="200px"
          height="200px"
        />
      </section>
      <span className={style.cardType}>{Tipos.join(" ")}</span>
    </div>
  );
}

export default Card;
