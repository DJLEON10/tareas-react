import React from "react";

function HomeHooks() {
  return (
    <div className="container justify-content-center aling-content-center vh-100%">
      <div className="text-center">
        <h2>Ejemplos de Hooks</h2>
        <div className="list-group">
          <a href="/useState" className="list-gruop-item">
            ir a usestate
          </a>
          <a href="/useNavigate">ir a usenavigate</a>
        </div>
      </div>
    </div>
  );
}

export default HomeHooks;
