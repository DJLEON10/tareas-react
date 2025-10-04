import { Link } from "react-router-dom";
import { useState } from "react";
import { resetPassword } from "../../firebase"; 

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("El correo es obligatorio");
      return;
    }

    setError("");
    setMessage("");

    const result = await resetPassword(email);

    if (result.success) {
      setMessage(result.message);
      setEmail("");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#0d4f4c] via-[#2d7a6b] to-[#a8e6cf]">
      <div className="flex flex-col bg-white/90 p-10 rounded-2xl shadow-xl w-full max-w-md border border-[#7bc4b8]/30 backdrop-blur-md">
        <h1 className="text-2xl font-semibold text-center">Recuperar contraseña</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#0d4f4c] font-medium">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo"
              className="w-full p-2 rounded-md border border-[#2d7a6b] focus:outline-none focus:border-[#4a9d8e] focus:ring-1 focus:ring-[#7bc4b8]"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-600 text-sm">{message}</p>}

          <button
            type="submit"
            className="w-full bg-[#2d7a6b] text-white py-2 rounded-md hover:bg-[#0d4f4c] transition"
          >
            Enviar enlace
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          <Link to="/login" className="text-[#2d7a6b] font-medium hover:underline">
            Volver al login
          </Link>
        </p>
      </div>
    </div>
  );
}
