import { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AgregarMascota({ onClose }) {
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
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!formData.especie) newErrors.especie = "Debes seleccionar una especie";
    if (!formData.edad.trim()) newErrors.edad = "La edad es obligatoria";
    if (!formData.dueno.trim()) newErrors.dueno = "El nombre del dueño es obligatorio";
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

        if (onClose) onClose();
      } catch (error) {
        console.error("Error al guardar mascota:", error);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
          Agregar Nueva Mascota
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
          Completa todos los campos para registrar una nueva mascota
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg text-sm sm:text-base ${errors.nombre ? "border-red-500" : "border-gray-300"}`}
            placeholder="Ej: Max, Luna..."
          />
          {errors.nombre && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.nombre}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Especie
          </label>
          <select
            name="especie"
            value={formData.especie}
            onChange={handleInputChange}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg text-sm sm:text-base ${errors.especie ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="">Selecciona una especie</option>
            {especies.map((esp) => (
              <option key={esp} value={esp}>{esp}</option>
            ))}
          </select>
          {errors.especie && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.especie}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Edad
            </label>
            <input
              type="text"
              name="edad"
              value={formData.edad}
              onChange={handleInputChange}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg text-sm sm:text-base ${errors.edad ? "border-red-500" : "border-gray-300"}`}
              placeholder="Ej: 3 años, 6 meses..."
            />
            {errors.edad && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.edad}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Estado
            </label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base"
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
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
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg text-sm sm:text-base ${errors.dueno ? "border-red-500" : "border-gray-300"}`}
            placeholder="Ej: Juan Pérez..."
          />
          {errors.dueno && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.dueno}</p>}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
          <button 
            type="submit" 
            className="w-full sm:flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-colors"
          >
            Guardar Mascota
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}