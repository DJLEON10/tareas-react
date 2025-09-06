import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Register() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password ) {
      setError("todos los campos son obligatorios");
      return;

    }

    setError("");
    alert("Inicio de Sesion Exitoso");

    
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#0d4f4c] via-[#2d7a6b] to-[#a8e6cf]">
      <div className="flex flex-col bg-white/90 p-10 rounded-2xl shadow-xl w-full max-w-md border border-[#7bc4b8]/30 backdrop-blur-md transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl ">
        <h1 className="text-2xl font-semibold text-center">Inicio de Sesion</h1>

        <form onSubmit={handleSubmit}>
        

        

          <div className="mb-25px relative">
            <label className="block text-[#0d4f4c] font-medium">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              className="w-full p-2 rounded-md border border-[#2d7a6b] focus:outline-none focus:border-[#4a9d8e] focus:ring-1 focus:ring-[#7bc4b8]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#0d4f4c] font-medium">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full p-2 rounded-md border border-[#2d7a6b] focus:outline-none focus:border-[#4a9d8e] focus:ring-1 focus:ring-[#7bc4b8]"
            />
          </div>

        

          {error && <p className="text-red-500 text-sm">{error}</p>}

          
            <button
              type="submit"
              className="w-full bg-[#2d7a6b] text-white py-2 rounded-md hover:bg-[#0d4f4c] transition"
            >
              Iniciar Sesion
            </button>
          
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link to="/" className="text-[#0d4f4c] font-semibold hover:underline">
            Registrate con nosotros
          </Link>
        </p>
      </div>
    </div>
  );
}
