import React from "react";
import style from "./Footer.module.css";

export default function Footer({ pkPorPag, totalPk, actualizarPagina }) {
  const nrosPag = [];

  console.log(
    "pkpopag " +
      pkPorPag +
      " totalPk " +
      totalPk +
      " math.ceil " +
      Math.ceil(totalPk / pkPorPag)
  );

  for (let index = 0; index < Math.ceil(totalPk / pkPorPag); index++) {
    nrosPag.push(index + 1);
  }

  return (
    <nav key={nrosPag.length} className={style.pag}>
      <ul>
        {nrosPag?.map((nro) => (
          <li>
            <label onClick={() => actualizarPagina(nro)}>{nro}</label>
          </li>
        ))}
      </ul>
    </nav>
  );
}
