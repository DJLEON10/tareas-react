import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditarMascotaModal({ id, onClose }) {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const ref = doc(db, "mascotas", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setFormData({ id: snap.id, ...snap.data() });
        } else {
          alert("Mascota no encontrada");
          if (onClose) onClose();
        }
      } catch (err) {
        console.error("Error al obtener mascota:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [id, onClose]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, "mascotas", id), formData);
      alert("Mascota actualizada ");
      if (onClose) onClose();
    } catch (err) {
      console.error("Error al actualizar:", err);
    }
  };

  if (!formData) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 w-full max-w-3xl relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6 pr-6">
          Editar Mascota
        </h1>

        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Especie
            </label>
            <select
              name="especie"
              value={formData.especie}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Selecciona una especie</option>
              {especies.map((esp) => (
                <option key={esp} value={esp}>
                  {esp}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Edad
              </label>
              <input
                type="text"
                name="edad"
                value={formData.edad}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Estado
              </label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 pt-3 sm:pt-4">
            <button
              onClick={onClose}
              className="w-full sm:w-auto bg-gray-300 hover:bg-gray-400 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleUpdate}
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-colors"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}