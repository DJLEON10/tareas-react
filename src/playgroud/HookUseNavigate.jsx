import React from "react"; // ✔ este sí
import { Link, useNavigate } from "react-router-dom";

function HookUseNavigate() {
     
    const navigate = useNavigate();

function GoRoute() {
    navigate('/useState')
}

  return (
    <div className="container justify-content-center aling-content-center vh-100%">
      <div className="text-center">
        <h2>Ejemplos de Hooks</h2>
        <div className="list-group">
            <button onClick={GoRoute} className="btn btn-secundary">ruta navigate a useState</button>
          <Link to="/name-route">ruta de ejemplo</Link>
          <a href="/">ir a home</a>
        </div>
      </div>
    </div>
  );
}

export default HookUseNavigate;