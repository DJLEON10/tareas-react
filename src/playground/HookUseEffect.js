import { useState, useEffect } from "react";

function App() {
  const [hora, setHora] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setHora(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1> Reloj en vivo</h1>
      <h2>{hora}</h2>
    </div>
  );
}

export default App;
