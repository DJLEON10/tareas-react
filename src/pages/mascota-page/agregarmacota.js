import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AgregarMascota() {
  const [formData, setFormData] = useState({
    foto: "",
    nombre: "",
    especie: "",
    edad: "",
    dueno: "",
    color: "",
    tamanio: "",
    estado: "activo",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const especies = [
    "Perro",
    "Gato",
    "Ave",
    "Conejo",
    "Hamster",
    "Pez",
    "Tortuga",
    "Otro",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!formData.especie) newErrors.especie = "Debes seleccionar una especie";
    if (!formData.edad.trim()) newErrors.edad = "La edad es obligatoria";
    if (!formData.dueno.trim())
      newErrors.dueno = "El nombre del dueño es obligatorio";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await addDoc(collection(db, "mascotas"), {
          ...formData,
          createdAt: new Date(),
        });

        navigate("/mascota");
      } catch (error) {
        console.error("Error al guardar mascota:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            to="/mascota"
            className="bg-red-400 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            Volver al listado
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mt-4">
            Agregar Nueva Mascota
          </h1>
          <p className="text-gray-600 mt-2">
            Completa todos los campos para registrar una nueva mascota
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8 space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg ${
                errors.nombre ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Ej: Max, Luna..."
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm">{errors.nombre}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Especie
            </label>
            <select
              name="especie"
              value={formData.especie}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg ${
                errors.especie ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Selecciona una especie</option>
              {especies.map((esp) => (
                <option key={esp} value={esp}>
                  {esp}
                </option>
              ))}
            </select>
            {errors.especie && (
              <p className="text-red-500 text-sm">{errors.especie}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Edad
            </label>
            <input
              type="text"
              name="edad"
              value={formData.edad}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg ${
                errors.edad ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Ej: 3 años, 6 meses..."
            />
            {errors.edad && (
              <p className="text-red-500 text-sm">{errors.edad}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Dueño
            </label>
            <input
              type="text"
              name="dueno"
              value={formData.dueno}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg ${
                errors.dueno ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Ej: Juan Pérez..."
            />
            {errors.dueno && (
              <p className="text-red-500 text-sm">{errors.dueno}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Estado
            </label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg"
            >
              Guardar Mascota
            </button>
            <Link
              to="/mascota"
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg text-center"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
