// src/hooks/HookUseOptimistic.jsx
import React, { useOptimistic, useState } from "react";

export default function HookUseOptimistic() {
  const [comentarios, setComentarios] = useState(["Hola!"]);

  // estado optimista
  const [optimisticComentarios, addOptimisticComentario] = useOptimistic(
    comentarios,
    (state, nuevo) => [...state, nuevo]
  );

  const handleSubmit = async () => {
    const nuevo = "Nuevo comentario";
    addOptimisticComentario(nuevo);

    // simulamos delay del servidor
    await new Promise((r) => setTimeout(r, 1500));
    setComentarios((prev) => [...prev, nuevo]);
  };

  return (
    <div>
      <h2>Comentarios</h2>
      <ul>
        {optimisticComentarios.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Agregar comentario</button>
    </div>
  );
}
