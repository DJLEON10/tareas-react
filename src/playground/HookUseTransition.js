import { useState, useTransition } from "react";

export default function HookUseTransition() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value); 

    startTransition(() => {
      const newList = [];
      for (let i = 0; i < 5; i++) {
        newList.push(value + " " + i);
      }
      setList(newList);
    });
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        className="border px-2 py-1 rounded"
        placeholder="Escribe algo..."
      />

      {isPending && <p className="text-gray-500"> Cargando...</p>}

      <ul className="mt-2 h-40 overflow-y-auto border p-2">
        {list.map((item, index) => (
          <li key={index} className="text-sm">{item}</li>
        ))}
      </ul>
    </div>
  );
}
