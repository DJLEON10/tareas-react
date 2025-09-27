import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    nombres: "",
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
        setError(""); // si son iguales se limpia
      }
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
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
    Swal.fire("Usuario registrado con éxito 🎉");
    navigate("/login");

    if (password.length < 6) {
      return Swal.fire("al menos tener 6 caracteres");
    }
    try {
      const emaillower = email.toLocaleLowerCase();
      //crea usuario en servicio de autenticacion en firestore
      const userMethod = await createUserWithEmailAndPassword(
        auth,
        emaillower,
        password
      );
      const user = userMethod.user;

      //guardar datos en firestore

      await setDoc(doc(db, "usuarios", user.uid), {
        uid: user.uid,
        nombre,
        apellido,
        emaillower,
        password,
        estado: "pendiente",
        rol: "visitante",
        creado: new Date(),
        metodo: "password",
      });
    } catch (error) {
      console.error("error de registro ", error);

      if (error.code === "auth/email_already-in-use") {
        Swal.fire("correo en uso ", "debe ingresar otro correo ", "error ");
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
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#0d4f4c] via-[#2d7a6b] to-[#a8e6cf]">
      <div className="flex flex-col bg-white/90 p-10 rounded-2xl shadow-xl w-full max-w-md border border-[#7bc4b8]/30 backdrop-blur-md transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl ">
        <h1 className="text-2xl font-semibold text-center">Crear una cuenta</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-25px relative">
            <label className="block text-[#0d4f4c] font-medium">Nombre</label>
            <input
              type="text"
              required
              value={formData.nombre}
              name="nombre"
              onChange={handleChange}
              placeholder="Tu nombre"
              className="w-full p-2 rounded-md border border-[#2d7a6b] focus:outline-none focus:border-[#4a9d8e] focus:ring-1 focus:ring-[#7bc4b8]"
            />
          </div>

          <div className="mb-25px relative">
            <label className="block text-[#0d4f4c] font-medium">Apellido</label>
            <input
              type="text"
              required
              value={formData.apellido}
              name="apellido"
              onChange={handleChange}
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
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              className="w-full p-2 rounded-md border border-[#2d7a6b] focus:outline-none focus:border-[#4a9d8e] focus:ring-1 focus:ring-[#7bc4b8]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#0d4f4c] font-medium">
              Contraseña
            </label>
            <input
              type={showPassword ? "text" : "password"}
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
              className="w-full p-2 rounded-md border border-[#2d7a6b] focus:outline-none focus:border-[#4a9d8e] focus:ring-1 focus:ring-[#7bc4b8]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} 
              className="px-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-[#0d4f4c] font-medium">
              Confirmar contraseña
            </label>
            <input
              type="password"
              required
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
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
        <p className="text-center mt-4 text-sm text-gray-600">
          ir a HomeHooks{" "}
          <Link
            to="/home"
            className="text-[#0d4f4c] font-semibold hover:underline  "
          >
            home
          </Link>
        </p>{" "}
      </div>
    </div>
  );
}
