import { useRef, forwardRef, useImperativeHandle, useState } from "react";

const CustomInput = forwardRef((props, ref) => {
  const [value, setValue] = useState("");

  useImperativeHandle(ref, () => ({
    clear: () => setValue(""), 
    setText: (text) => setValue(text), 
  }));

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="border px-2 py-1"
    />
  );
});

export default function HookUseImperativeHandle() {
  const inputRef = useRef();

  return (
    <div className="p-4">
      <CustomInput ref={inputRef} />
      <div className="mt-2 flex gap-2">
        <button
          onClick={() => inputRef.current.clear()}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Limpiar
        </button>
        <button
          onClick={() => inputRef.current.setText("Hola!")}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Escribir "Hola!"
        </button>
      </div>
    </div>
  );
}
