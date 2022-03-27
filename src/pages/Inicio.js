import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export const Inicio = () => {
  return (
    <div className="containerInicio">
      <h1>Welcome!!!</h1>
      <h3>
        ¿Deseas calcular cuál sería el precio de la realización de una página
        web?
      </h3>
      <p>Clicando el siguiente enlace tendrá la estimación del presupuesto</p>
      <h2>
        <Link to="/screenPagWeb">Página web.</Link>
      </h2>
    </div>
  );
};
