import { useRef, useState } from "react";

export default function App() {
  const [contador, setContador] = useState(0);
  const ref = useRef(0);

  console.log("El componente se renderizó");

  const aumentarRef = () => {
    ref.current++;
    console.log("Valor en ref:", ref.current);
  };

  return (
    <div>
      <p>Contador (useState): {contador}</p>
      <p>Ref (useRef): {ref.current}</p>
      <button onClick={() => setContador(contador + 1)}>Aumentar con useState</button>
      <button onClick={aumentarRef}>Aumentar con useRef</button>
    </div>
  );
}
