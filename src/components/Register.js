import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Register() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (confirmPassword.length > 0) {
      if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden");
      } else {
        setError(""); // si son iguales se limpia
      }
    }
  }, [password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !apellido || !email || !password || !confirmPassword) {
      setError("todos los campos son obligatorios");
      return;
    }

    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setError("");
    alert("Usuario registrado con éxito 🎉");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#0d4f4c] via-[#2d7a6b] to-[#a8e6cf]">
      <div className="flex flex-col bg-white/90 p-10 rounded-2xl shadow-xl w-full max-w-md border border-[#7bc4b8]/30 backdrop-blur-md transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl ">
        <h1 className="text-2xl font-semibold text-center">Crear una cuenta</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-25px relative">
            <label className="block text-[#0d4f4c] font-medium">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
              className="w-full p-2 rounded-md border border-[#2d7a6b] focus:outline-none focus:border-[#4a9d8e] focus:ring-1 focus:ring-[#7bc4b8]"
            />
          </div>
    
          <div className="mb-25px relative">
            <label className="block text-[#0d4f4c] font-medium">Apellido</label>
            <input
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              placeholder="Tu apellido"
              className="w-full p-2 rounded-md border border-[#2d7a6b] focus:outline-none focus:border-[#4a9d8e] focus:ring-1 focus:ring-[#7bc4b8]"
            />
          </div>

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

          <div className="mb-4">
            <label className="block text-[#0d4f4c] font-medium">
              Confirmar contraseña
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar contraseña"
              className={`w-full p-2 rounded-md border focus:outline-none ${
                error
                  ? "border-red-500"
                  : confirmPassword
                  ? "border-green-500"
                  : "border-[#2d7a6b]"
              } focus:border-[#4a9d8e] focus:ring-1 focus:ring-[#7bc4b8]`}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {!error && (
            <button
              type="submit"
              className="w-full bg-[#2d7a6b] text-white py-2 rounded-md hover:bg-[#0d4f4c] transition"
            >
              Registrarse
            </button>
          )}
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/login"
            className="text-[#0d4f4c] font-semibold hover:underline  "
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
