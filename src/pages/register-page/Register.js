import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();

  // Estados para mostrar/ocultar contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { nombre, apellido, email, password, confirmPassword } = formData;
  const [error, setError] = useState("");

  useEffect(() => {
    if (confirmPassword.length > 0) {
      if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden");
      } else {
        setError("");
      }
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !apellido || !email || !password || !confirmPassword) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      Swal.fire("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      const emaillower = email.toLowerCase();
      const userMethod = await createUserWithEmailAndPassword(
        auth,
        emaillower,
        password
      );
      const user = userMethod.user;

      await setDoc(doc(db, "usuarios", user.uid), {
        uid: user.uid,
        nombre,
        apellido,
        email: emaillower,
        estado: "pendiente",
        rol: "visitante",
        creado: new Date(),
        metodo: "password",
      });

      Swal.fire("Usuario registrado con éxito 🎉");
      navigate("/login");
    } catch (error) {
      console.error("Error de registro", error);

      if (error.code === "auth/email-already-in-use") {
        Swal.fire("Correo en uso", "Debes ingresar otro correo", "error");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#0d4f4c] via-[#2d7a6b] to-[#a8e6cf] p-4">
      <div className="flex flex-col bg-white/90 p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md border border-[#7bc4b8]/30 backdrop-blur-md transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl">
        <h1 className="text-xl sm:text-2xl font-semibold text-center mb-4 sm:mb-6">
          Crear una cuenta
        </h1>
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="relative">
              <label className="block text-[#0d4f4c] font-medium text-sm mb-1">
                Nombre
              </label>
              <input
                type="text"
                required
                value={nombre}
                name="nombre"
                onChange={handleChange}
                placeholder="Tu nombre"
                className="w-full p-2 text-sm sm:text-base rounded-md border border-[#2d7a6b] focus:outline-none focus:border-[#4a9d8e] focus:ring-1 focus:ring-[#7bc4b8]"
              />
            </div>

            <div className="relative">
              <label className="block text-[#0d4f4c] font-medium text-sm mb-1">
                Apellido
              </label>
              <input
                type="text"
                required
                value={apellido}
                name="apellido"
                onChange={handleChange}
                placeholder="Tu apellido"
                className="w-full p-2 text-sm sm:text-base rounded-md border border-[#2d7a6b] focus:outline-none focus:border-[#4a9d8e] focus:ring-1 focus:ring-[#7bc4b8]"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-[#0d4f4c] font-medium text-sm mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              required
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              className="w-full p-2 text-sm sm:text-base rounded-md border border-[#2d7a6b] focus:outline-none focus:border-[#4a9d8e] focus:ring-1 focus:ring-[#7bc4b8]"
            />
          </div>

          <div className="relative">
            <label className="block text-[#0d4f4c] font-medium text-sm mb-1">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Contraseña"
                className="w-full p-2 pr-10 text-sm sm:text-base rounded-md border border-[#2d7a6b] focus:outline-none focus:border-[#4a9d8e] focus:ring-1 focus:ring-[#7bc4b8]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          <div className="relative">
            <label className="block text-[#0d4f4c] font-medium text-sm mb-1">
              Confirmar contraseña
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                placeholder="Confirmar contraseña"
                className={`w-full p-2 pr-10 text-sm sm:text-base rounded-md border focus:outline-none ${
                  error
                    ? "border-red-500"
                    : confirmPassword
                    ? "border-green-500"
                    : "border-[#2d7a6b]"
                } focus:border-[#4a9d8e] focus:ring-1 focus:ring-[#7bc4b8]`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-xs sm:text-sm bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#2d7a6b] text-white py-2.5 sm:py-3 rounded-md hover:bg-[#0d4f4c] transition-colors font-medium text-sm sm:text-base"
          >
            Registrarse
          </button>
        </form>

        <div className="mt-4 sm:mt-6 space-y-2">
          <p className="text-center text-xs sm:text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to="/login"
              className="text-[#0d4f4c] font-semibold hover:underline"
            >
              Inicia sesión
            </Link>
          </p>

          <p className="text-center text-xs sm:text-sm text-gray-600">
            Ir a sidebar{" "}
            <Link
              to="/sidebar"
              className="text-[#0d4f4c] font-semibold hover:underline"
            >
              Sidebar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}