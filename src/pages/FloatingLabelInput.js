import { useState } from "react";

export default function FloatingLabelInput({ label, type = "text" }) {
  const [value, setValue] = useState("");

  return (
    <div className="relative w-64">
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="peer w-full border border-gray-400 rounded-md px-3 pt-5 pb-2 focus:outline-none focus:border-blue-500"
        placeholder=" "
      />
      <label
        className="absolute left-3 top-2.5 text-gray-500 text-sm transition-all 
        peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
        peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
      >
        {label}
      </label>
    </div>
  );
}
