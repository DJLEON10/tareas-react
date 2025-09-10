import { useState, useRef, useLayoutEffect } from "react";

function App() {
  const [big, setBig] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const boxRef = useRef(null);
  useLayoutEffect(() => {
    if (boxRef.current) {
      setSize({
        width: boxRef.current.offsetWidth,
        height: boxRef.current.offsetHeight,
      });
    }
  }, [big]);

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => setBig(!big)}>
        {big ? "Hacer pequeño" : "Hacer grande"}
      </button>

      <div
        ref={boxRef}
        style={{
          marginTop: "20px",
          width: big ? "300px" : "150px",
          height: big ? "200px" : "100px",
          background: "skyblue",
          transition: "all 0.3s ease",
        }}
      ></div>

      <p>
       Tamaño actual: {size.width}px x {size.height}px
      </p>
    </div>
  );
}

export default App;
