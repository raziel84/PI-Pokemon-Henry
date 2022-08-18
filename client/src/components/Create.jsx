import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { crear, creado, todosLosTipos } from "../redux/actions.js";
import style from "./Create.module.css";

function Create() {
  const dispatch = useDispatch();
  const tipo = useSelector((state) => state.tipos);

  useEffect(() => {
    dispatch(todosLosTipos());
  }, []);

  const [data, setData] = useState({
    Nombre: "",
    Imagen: "",
    Vida: "",
    Ataque: "",
    Defensa: "",
    Velocidad: "",
    Altura: "",
    Peso: "",
    tipos: [],
  });

  const [controlDatos, setControlDatos] = useState([]);
  const [creado, setCreado] = useState("");

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    //console.log(data);
  };

  const onSelectHandler = (e) => {
    setData({
      ...data,
      tipos: [...data.tipos, e.target.value],
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const datosValidados = validarDatos();
    setControlDatos(datosValidados);
    if (!datosValidados.length) {
      dispatch(crear(data));
      setData({
        Nombre: "",
        Imagen: "",
        Vida: "",
        Ataque: "",
        Defensa: "",
        Velocidad: "",
        Altura: "",
        Peso: "",
        tipos: [],
      });
      setCreado("Pokemon creado con exito!!");
    }
  };

  const validarDatos = () => {
    const camposErroneos = [];

    for (const key in data) {
      if (key === "Nombre") {
        if (!isNaN(data[key])) {
          camposErroneos.push(key);
        }
        continue;
      }

      if (key === "tipos") {
        if (data[key].length < 1) {
          camposErroneos.push(key);
        }
        continue;
      }

      if (key === "Imagen") {
        if (!isNaN(data[key])) {
          if (data[key] === "") continue;
          camposErroneos.push(key);
        }
        continue;
      }

      if (isNaN(data[key]) || data[key] === "") {
        camposErroneos.push(key);
      }
    }
    console.log(camposErroneos);

    return camposErroneos;
  };

  return (
    <div>
      <section className={style.create}>
        <h1>CREA TU PROPIO POKEMON</h1>

        <Link to={"/pokemons"}>
          <button className={style.button}>Inicio</button>
        </Link>
      </section>

      <form className={style.form} onSubmit={(e) => onSubmitHandler(e)}>
        {/* AGREGAR CAMPOR IMAGEN!!! */}
        <section className={style.formCampos}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="Nombre"
              value={data.Nombre}
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
          <div>
            <label>Imagen:</label>
            <input
              type="text"
              name="Imagen"
              value={data.Imagen}
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
          <div>
            <label>Vida:</label>
            <input
              type="text"
              name="Vida"
              value={data.Vida}
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
          <div>
            <label>Ataque:</label>
            <input
              type="text"
              name="Ataque"
              value={data.Ataque}
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
          <div>
            <label>Defensa:</label>
            <input
              type="text"
              name="Defensa"
              value={data.Defensa}
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
          <div>
            <label>Velocidad:</label>
            <input
              type="text"
              name="Velocidad"
              value={data.Velocidad}
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
          <div>
            <label>Altura:</label>
            <input
              type="text"
              name="Altura"
              value={data.Altura}
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
          <div>
            <label>Peso:</label>
            <input
              type="text"
              name="Peso"
              value={data.Peso}
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
          <div>
            <label>Tipos:</label>
            <select onChange={(e) => onSelectHandler(e)}>
              {tipo?.map((t) => {
                return <option value={t}>{t}</option>;
              })}
            </select>
            <label>Tipos seleccionados</label>
            {data.tipos.length !== 0 ? (
              <label>{data.tipos.map((t) => t + ", ")}</label>
            ) : (
              ""
            )}
          </div>
        </section>
        <div>
          <button className={style.button} type="submit">
            Crear Pokemon
          </button>
        </div>
      </form>
      <section>
        {creado !== "" ? (
          <h1 className={style.creado} key={creado}>
            {creado}
          </h1>
        ) : (
          ""
        )}
        {controlDatos.length !== 0 ? (
          <h4>
            Por favor verifque los datos ingresados en los siguientes campos
          </h4>
        ) : (
          ""
        )}
        {controlDatos?.map((d) => {
          return <label key={d}>{d + " "} </label>;
        })}
      </section>
    </div>
  );
}

export default Create;
