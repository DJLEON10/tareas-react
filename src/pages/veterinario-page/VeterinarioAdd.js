import { useState } from "react";
import Swal from "sweetalert2";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function VeterinariosAdd() {
  const [formData, setFormData] = useState({
    nombre: "",
    especialidad: "",
    telefono: "",
    correo: "",
  });

  const crearVeterinario = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "veterinarios"), {
        nombre: formData.nombre,
        especialidad: formData.especialidad,
        telefono: formData.telefono,
        correo: formData.correo,
        estado: "Activo",
        creado: new Date(),
      });

      Swal.fire("Éxito", "Veterinario registrado correctamente", "success");

      setFormData({
        nombre: "",
        especialidad: "",
        telefono: "",
        correo: "",
      });
    } catch (error) {
      console.error("Error al crear veterinario:", error);
      Swal.fire("Error", "No se pudo registrar el veterinario", "error");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#e8f5f2] to-[#cde7e2] p-4">
      <div
        className="
          w-full max-w-md
          bg-white/90 
          p-10 
          rounded-2xl 
          border border-[#7bc4b8]/30 
          backdrop-blur-md 
          shadow-[0_8px_30px_rgba(0,0,0,0.15)] 
          hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)] 
          transition-all 
          duration-300 
          transform 
          hover:scale-[1.02] 
          hover:-translate-y-1
        "
      >
        <div className="flex flex-col items-center text-center">
          <img src="/asset/logo.png" alt="Logo" className="w-[180px] mb-4" />
          <h1 className="text-2xl font-bold text-[#0d4f4c] mb-6">
            Registrar Veterinario
          </h1>

          <form onSubmit={crearVeterinario} className="w-full space-y-4">
            <div>
              <label className="flex text-[#0d4f4c] font-medium mb-1">Nombre</label>
              <input
                type="text"
                required
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre del veterinario"
                className="w-full p-2 rounded-md border border-[#2d7a6b] focus:outline-none focus:border-[#4a9d8e] focus:ring-1 focus:ring-[#7bc4b8]"
              />
            </div>

            <div>
              <label className="flex text-[#0d4f4c] font-medium mb-1">Especialidad</label>
              <input
                type="text"
                required
                name="especialidad"
                value={formData.especialidad}
                onChange={handleChange}
                placeholder="Especialidad"
                className="w-full p-2 rounded-md border border-[#2d7a6b] focus:outline-none focus:border-[#4a9d8e] focus:ring-1 focus:ring-[#7bc4b8]"
              />
            </div>

            <div>
              <label className="flex text-[#0d4f4c] font-medium mb-1">Teléfono</label>
              <input
                type="tel"
                required
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
                className="w-full p-2 rounded-md border border-[#2d7a6b] focus:outline-none focus:border-[#4a9d8e] focus:ring-1 focus:ring-[#7bc4b8]"
              />
            </div>

            <div>
              <label className="flex text-[#0d4f4c] font-medium mb-1">Correo</label>
              <input
                type="email"
                required
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                placeholder="Correo electrónico"
                className="w-full p-2 rounded-md border border-[#2d7a6b] focus:outline-none focus:border-[#4a9d8e] focus:ring-1 focus:ring-[#7bc4b8]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#2d7a6b] text-white py-2 rounded-md hover:bg-[#0d4f4c] transition duration-300"
            >
              Registrar Veterinario
            </button>

            <Link
              to="/veterinarios"
              className="bg-red-700 py-2 w-full transition duration-300 mt-1 flex justify-center content-center items-center rounded-md text-white"
            >
              Regresar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
