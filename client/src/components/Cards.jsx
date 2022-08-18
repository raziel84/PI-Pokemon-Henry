import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Cards.module.css";
import {
  todos,
  todosLosTipos,
  filtroPorOrigen,
  filtroPorTipo,
  ordenAscDesc,
  ordenPorAtaque,
} from "../redux/actions.js";
import { Link } from "react-router-dom";
import Card from "./Card";
import Footer from "./Footer.jsx";
import SearchBar from "./SearchBar.jsx";

function Cards() {
  const dispatch = useDispatch();

  const pokemons = useSelector((state) => state.pokemons); //El equivalente es MapStateToProps
  const error = useSelector((state) => state.error);
  const tiposPk = useSelector((state) => state.tipos);
  //ESTADOS LOCALES
  const [pagActual, setPagActual] = useState(1);
  const pkPorPag = 12;
  const ultimo = pagActual * pkPorPag;
  const primero = ultimo - pkPorPag;
  const pkAMostrar = pokemons.slice(primero, ultimo);

  const actualizarPagina = (nroPagina) => {
    setPagActual(nroPagina);
  };

  useEffect(() => {
    //Equivalente a mapDispachToProps llamandolo en ComponentDidMount
    dispatch(todos());
    dispatch(todosLosTipos());
  }, []);

  //MANEJADORES
  //RECARGAR PÁGINA
  const resetHandler = (e) => {
    e.preventDefault();
    dispatch(todos());
  };
  //FILTRO POR ORIGEN DE DATOS
  const filtroOrigenHandler = (e) => {
    e.preventDefault();
    console.log("llamada al filtro origen " + e.target.value);
    dispatch(filtroPorOrigen(e.target.value));
  };
  //FILTRO POR TIPO DE POKEMON
  const filtroTipoHandler = (e) => {
    e.preventDefault();

    dispatch(filtroPorTipo(e.target.value));
  };
  //ORDENAMIENTO POR ORDEN ALFABETICO
  const ordenAscDescHandler = (e) => {
    e.preventDefault();

    dispatch(ordenAscDesc(e.target.value));
  };
  //ORDENAMIENTO POR ATAQUE
  const ordenPorAtaqueHandler = (e) => {
    e.preventDefault();

    dispatch(ordenPorAtaque(e.target.value));
  };

  return (
    <div className={style.cardsContenedorPadre} key={pokemons.length}>
      <section>
        <SearchBar />
      </section>

      <section className={style.menu}>
        <Link to="/pokemons/crear">
          <button className={style.btnMenu}>Crea tu pokemon</button>
        </Link>
        <Link to="/pokemons/tipos">
          <button className={style.btnMenu}>Tipos de pokemon</button>
        </Link>
        <button className={style.btnMenu} onClick={(e) => resetHandler(e)}>
          Reiniciar
        </button>
      </section>

      <section className={style.filtros}>
        <select
          className={style.btnMenu}
          onChange={(e) => ordenAscDescHandler(e)}
        >
          <option value="ascendente">A-Z</option>
          <option value="descendente">Z-A</option>
        </select>
        <select
          className={style.btnMenu}
          onChange={(e) => ordenPorAtaqueHandler(e)}
        >
          <option value="mayorAtaque">Mayor ataque</option>
          <option value="menorAtaque">Menor ataque</option>
        </select>
        <select
          className={style.btnMenu}
          onChange={(e) => filtroOrigenHandler(e)}
        >
          <option value="todos">Todos</option>
          <option value="existente">Existente</option>
          <option value="Creado">Creado</option>
        </select>
        <select
          className={style.cardsSelect}
          onChange={(e) => filtroTipoHandler(e)}
        >
          {tiposPk?.map((tipo) => {
            return <option value={tipo}>{tipo}</option>;
          })}
        </select>
      </section>

      <section className={style.contenedorCards}>
        {pkAMostrar?.map((pk) => {
          return (
            <div className={style.cards}>
              <Link className={style.link} to={`/pokemon/${pk.ID}`}>
                <Card
                  Nombre={pk.Nombre}
                  Imagen={pk.Imagen}
                  Tipos={pk.tipos?.map((el) => el.Nombre)} //{pk.tipos} array.map((el) => el.Nombre)
                  key={pk.ID}
                />
              </Link>
            </div>
          );
        })}
      </section>

      {error ? <h1>{error}</h1> : ""}

      <section>
        <Footer
          pkPorPag={pkPorPag}
          totalPk={pokemons.length}
          actualizarPagina={actualizarPagina}
        />
      </section>
    </div>
  );
}

export default Cards;
