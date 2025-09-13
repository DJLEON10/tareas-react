import { useState, useCallback } from "react";

function Child({ onClick }) {
  console.log("Renderizando hijo...");
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white px-3 py-1 rounded"
    >
      Click en hijo
    </button>
  );
}

export default function HookUseCallback() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("click en el hijo");
  }, []);

  return (
    <div className="p-4">
      <p>Contador: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="bg-green-500 text-white px-3 py-1 rounded mr-2"
      >
        Incrementar contador
      </button>
      <Child onClick={handleClick} />

          <a href="/home">
              ir a home</a>
    </div>
  );
}
