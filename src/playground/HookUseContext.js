import React, { createContext, useContext } from "react";

const UserContext = createContext();

function App() {
  return (
    <UserContext.Provider value={{ nombre: "Pedro", edad: 25 }}>
      <Perfil />
    </UserContext.Provider>
  );
}

function Perfil() {
  const usuario = useContext(UserContext); // accede al contexto
  return <h2>{usuario.nombre} tiene {usuario.edad} años</h2>;
}

export default App;
