import { useState, useMemo } from "react";

export default function HookUseMemo() {
  const [numbers, setNumbers] = useState([1, 5, 7, 10, 2]);
  const [count, setCount] = useState(0);


  const maxNumber = useMemo(() => {
    console.log("Calculando el número más grande...");
    return Math.max(...numbers);
  }, [numbers]); 

  return (
    <div className="p-4">
      <p>Lista: {numbers.join(", ")}</p>
      <p>Número más grande: <strong>{maxNumber}</strong></p>

      <button
        onClick={() => setCount(count + 1)}
        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
      >
        Re-renderizar ({count})
      </button>

      <button
        onClick={() => setNumbers([...numbers, Math.floor(Math.random() * 1000)])}
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        Agregar número
      </button>
      <a href="/home">ir a home</a>
    </div>
  );
}
