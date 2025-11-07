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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError("Por favor, completa ambos campos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage("Tu contraseña ha sido restablecida exitosamente.");
      setError("");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError("El enlace es inválido o ha expirado.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#0d4f4c] via-[#2d7a6b] to-[#a8e6cf] px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col bg-white/90 p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg border border-[#7bc4b8]/30 backdrop-blur-md">
        <h1 className="text-xl sm:text-2xl font-semibold text-center text-[#0d4f4c] mb-6">
          Nueva contraseña
        </h1>

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-[#0d4f4c] font-medium text-sm sm:text-base mb-1">
              Nueva contraseña
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Ingresa tu nueva contraseña"
              className="w-full p-2 sm:p-3 rounded-md border border-[#2d7a6b] focus:outline-none focus:border-[#4a9d8e] focus:ring-1 focus:ring-[#7bc4b8] text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-[#0d4f4c] font-medium text-sm sm:text-base mb-1">
              Repetir contraseña
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirma tu nueva contraseña"
              className="w-full p-2 sm:p-3 rounded-md border border-[#2d7a6b] focus:outline-none focus:border-[#4a9d8e] focus:ring-1 focus:ring-[#7bc4b8] text-sm sm:text-base"
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs sm:text-sm text-center">{error}</p>
          )}
          {message && (
            <p className="text-green-600 text-xs sm:text-sm text-center">{message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#2d7a6b] text-white py-2 sm:py-3 rounded-md hover:bg-[#0d4f4c] transition text-sm sm:text-base font-medium"
          >
            Cambiar contraseña
          </button>
        </form>
      </div>
    </div>
  );
}
