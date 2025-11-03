// Login.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  FacebookAuthProvider, 
  GoogleAuthProvider, 
  linkWithPopup 
} from "firebase/auth";
import { auth, githubProvider } from "../../firebase";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Iniciar sesión normal con correo y contraseña
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

  // ✅ Iniciar sesión con GitHub
  const handleGithubLogin = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      navigate("/sidebar");
    } catch (error) {
      console.log(error);
      setError("Error al iniciar sesión con GitHub");
    }
  };

  // ✅ Iniciar sesión con Google
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

  // ✅ Iniciar sesión con Facebook
  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Usuario con Facebook:", user);
      navigate("/sidebar");
    } catch (error) {
      console.error("Error al iniciar sesión con Facebook:", error);
      setError("No se pudo iniciar sesión con Facebook");
    }
  };

  // ✅ Nueva función: Vincular cuentas con distintos proveedores
  const handleLinkAccount = async (providerType) => {
    try {
      let provider;

      switch (providerType) {
        case "google":
          provider = new GoogleAuthProvider();
          break;
        case "facebook":
          provider = new FacebookAuthProvider();
          break;
        case "github":
          provider = githubProvider;
          break;
        default:
          return;
      }

      const result = await linkWithPopup(auth.currentUser, provider);
      console.log("Proveedores vinculados:", result.user.providerData);
      Swal.fire("Cuenta vinculada correctamente!", "", "success");
    } catch (error) {
      if (error.code === "auth/provider-already-linked") {
        Swal.fire("Error", "Tu cuenta ya está vinculada con este proveedor.", "error");
      } else if (error.code === "auth/account-exists-with-different-credential") {
        Swal.fire(
          "Ya existe una cuenta con ese correo",
          "Inicia sesión con ese proveedor y luego vincula el actual.",
          "info"
        );
      } else {
        Swal.fire("Error al vincular cuenta", error.message, "error");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#0d4f4c] via-[#2d7a6b] to-[#a8e6cf] px-4 sm:px-6 py-8">
      <div className="flex flex-col bg-white/90 p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md border border-[#7bc4b8]/30 backdrop-blur-md">
        <h1 className="text-xl sm:text-2xl font-semibold text-center mb-6">Inicio de Sesión</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#0d4f4c] font-medium text-sm sm:text-base mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              className="w-full p-2 sm:p-3 rounded-md border border-[#2d7a6b] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#2d7a6b]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#0d4f4c] font-medium text-sm sm:text-base mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full p-2 sm:p-3 rounded-md border border-[#2d7a6b] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#2d7a6b]"
            />
          </div>

          {error && <p className="text-red-500 text-xs sm:text-sm mb-3">{error}</p>}

          <button
            type="submit"
            className="p-4  w-full bg-[#2d7a6b] text-white py-2 sm:py-3 rounded-md hover:bg-[#0d4f4c] transition text-sm sm:text-base font-medium "
          >
            Iniciar Sesión
          </button>

          <div className="mt-3 sm:mt-4 p-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 py-2 sm:py-3 rounded-md shadow-sm hover:bg-gray-100 transition"
            >
              <span className="text-gray-700 font-medium text-sm sm:text-base">Iniciar con Google</span>
            </button>
          </div>
        </form>

        <div className="mt-3 sm:mt-4 p-4">
          <button
            onClick={handleGithubLogin}
            className="w-full bg-black text-white py-2 sm:py-3 rounded-md hover:bg-gray-800 transition flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <i className="fa-brands fa-github text-lg sm:text-xl"></i>
            Ingresar con GitHub
          </button>
        </div>

        <div className="mt-3 sm:mt-4 p-4">
          <button
            onClick={handleFacebookLogin}
            className="w-full bg-[#1877f2] text-white py-2 sm:py-3 rounded-md hover:bg-[#145dbf] transition flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <i className="fa-brands fa-facebook-f text-base sm:text-lg"></i>
            Iniciar con Facebook
          </button>
        </div>
        
        <p className="text-center mt-4 sm:mt-5 text-xs sm:text-sm">
          <Link to="/forgotpassword" className="text-[#2d7a6b] font-medium hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </p>

        <p className="text-center mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link to="/" className="text-[#0d4f4c] font-semibold hover:underline">
            Regístrate con nosotros
          </Link>
        </p>
      </div>
    </div>
  );
}