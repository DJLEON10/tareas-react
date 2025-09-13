import React, { useState, useDeferredValue } from "react";

function App() {
  const [text, setText] = useState("");

  const deferredText = useDeferredValue(text);

  const list = Array(2)
    .fill()
    .map((_, i) => <div key={i}>{deferredText}</div>);

  return (
    <div>
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Escribe aquí..."
      />

      <p>Valor inmediato: {text}</p>
      <p>Valor diferido: {deferredText}</p>

      <div>{list}</div>
    </div>
  );
}

export default App;
