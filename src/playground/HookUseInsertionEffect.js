import React, { useInsertionEffect, useState } from "react";

export default function HookUseInsertionEffect() {
  const [color, setColor] = useState("blue");

  useInsertionEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      body {
        background-color: ${color};
        transition: background-color 0.5s ease;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [color]);

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>useInsertionEffect Demo</h2>
      <p>El fondo de la página cambia dinámicamente antes de renderizar.</p>

      <button onClick={() => setColor("blue")}>Azul</button>
      <button onClick={() => setColor("green")}>Verde</button>
      <button onClick={() => setColor("red")}>Rojo</button>
    </div>
  );
}
