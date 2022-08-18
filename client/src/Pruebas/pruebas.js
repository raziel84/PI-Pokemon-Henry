//----------PAGINADO---------- Cards.jsx
//Problema, no renderiza al recibir los pokemons
//VARIABLES
const pkPorPagina = 12;
//ESTADOS LOCALES
const [respuestaBack, setRespuestaBack] = pokemons;

const [paginaActual, setPaginaActual] = useState(1);
const [cantPokemon, setCantPokemon] = useState(
  [...pokemons].splice(0, pkPorPagina)
);

//MANEJADORES

const nextHandler = (e) => {
  e.preventDefault();
  const siguiente = paginaActual + 1;

  const indice = paginaActual * pkPorPagina;

  if (indice >= pokemons.length) return;

  setCantPokemon([...pokemons].splice(indice, pkPorPagina));
  setPaginaActual(siguiente);
};
const prevHandler = (e) => {
  e.preventDefault();
  const anterior = paginaActual - 1;
  if (anterior < 1) return;
  const indice = (anterior - 1) * pkPorPagina;
  setCantPokemon([...pokemons].splice(indice, pkPorPagina));
  setPaginaActual(anterior);
};

<div>
  <button onClick={prevHandler}>{"<<"}</button>
  <h1>{paginaActual}</h1>
  <button onClick={nextHandler}>{">>"}</button>
</div>;
