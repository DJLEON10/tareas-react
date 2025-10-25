import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, confirmPasswordReset } from "firebase/auth";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();

  const queryParams = new URLSearchParams(location.search);
  const oobCode = queryParams.get("oobCode");

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      setError("Por favor, ingresa una nueva contraseña.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage("Tu contraseña ha sido restablecida exitosamente.");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError("El enlace es inválido o ha expirado.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#0d4f4c] via-[#2d7a6b] to-[#a8e6cf]">
      <div className="flex flex-col bg-white/90 p-10 rounded-2xl shadow-xl w-full max-w-md border border-[#7bc4b8]/30 backdrop-blur-md">
        <h1 className="text-2xl font-semibold text-center">Nueva contraseña</h1>

        <form onSubmit={handleReset}>
          <div className="mb-4">
            <label className="block text-[#0d4f4c] font-medium">
              Nueva contraseña
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Ingresa tu nueva contraseña"
              className="w-full p-2 rounded-md border border-[#2d7a6b] focus:outline-none focus:border-[#4a9d8e] focus:ring-1 focus:ring-[#7bc4b8]"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-600 text-sm">{message}</p>}

          <button
            type="submit"
            className="w-full bg-[#2d7a6b] text-white py-2 rounded-md hover:bg-[#0d4f4c] transition"
          >
            Cambiar contraseña
          </button>
        </form>
      </div>
    </div>
  );
}
