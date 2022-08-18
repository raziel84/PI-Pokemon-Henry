import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { MdCatchingPokemon } from "react-icons/md";
import { nombre } from "../redux/actions.js";
import { useDispatch } from "react-redux";

import style from "./SearchBar.module.css";

function SearchBar({ actualizarPagina }) {
  const dispatch = useDispatch();

  //MANEJADORES
  const buscarHandler = (e) => {
    e.preventDefault();
    const input = document.getElementById("buscado");
    dispatch(nombre(input.value));
    input.value = "";
    actualizarPagina(1);
  };

  return (
    <form
      className={style.searchBar}
      onSubmit={(e) => {
        buscarHandler(e);
      }}
    >
      <MdCatchingPokemon className={style.icon} />
      <input
        type="text"
        id="buscado"
        placeholder="Buscar..."
        className={style.input}
      />
      <button type="submit" className={style.submit}>
        <BiSearchAlt />
      </button>
    </form>
  );
}

export default SearchBar;
