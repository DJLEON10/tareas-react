// Login.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, githubProvider } from "../../firebase";
import { GoogleAuthProvider } from "firebase/auth";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/sidebar");
    } catch (err) {
      console.log(err);
      setError("Correo o contraseña incorrectos");
    }
  };

  const handleGithubLogin = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      navigate("/sidebar");
    } catch (error) {
      console.log(error);
      setError("Error al iniciar sesión con GitHub");
    }
  };
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Usuario con Google:", user);
      navigate("/sidebar");
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      setError("No se pudo iniciar sesión con Google");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#0d4f4c] via-[#2d7a6b] to-[#a8e6cf]">
      <div className="flex flex-col bg-white/90 p-10 rounded-2xl shadow-xl w-full max-w-md border border-[#7bc4b8]/30 backdrop-blur-md">
        <h1 className="text-2xl font-semibold text-center">Inicio de Sesión</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#0d4f4c] font-medium">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              className="w-full p-2 rounded-md border border-[#2d7a6b]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#0d4f4c] font-medium">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full p-2 rounded-md border border-[#2d7a6b]"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#2d7a6b] text-white py-2 rounded-md hover:bg-[#0d4f4c] transition"
          >
            Iniciar Sesión
          </button>
          <div className="mt-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 py-2 rounded-md shadow-sm hover:bg-gray-100 transition"
            >
             
              <span className="text-gray-700 font-medium">Iniciar con Google</span>
            </button>
          </div>
        </form>

        <div className="mt-4">
          <button
            onClick={handleGithubLogin}
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition flex items-center justify-center gap-2"
          >
            <i className="fa-brands fa-github text-xl"></i> Ingresar con GitHub
          </button>
        </div>

        <p className="text-center mt-4 text-sm">
          <Link to="/forgotpassword" className="text-[#2d7a6b] font-medium">
            ¿Olvidaste tu contraseña?
          </Link>
        </p>

        <p className="text-center mt-4 text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link to="/" className="text-[#0d4f4c] font-semibold">
            Regístrate con nosotros
          </Link>
        </p>
      </div>
    </div>
  );
}
