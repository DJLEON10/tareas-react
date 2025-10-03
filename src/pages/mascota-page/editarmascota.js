import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditarMascota() {
  const { id } = useParams();
  const navigate = useNavigate();
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
          navigate("/mascota");
        }
      } catch (err) {
        console.error("Error al obtener mascota:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [id, navigate]);

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
      alert("Mascota actualizada ✅");
      navigate("/mascota");
    } catch (err) {
      console.error("Error al actualizar:", err);
    }
  };

  if (!formData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Editar Mascota 
          </h1>
          <Link
            to="/mascota"
            className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg shadow"
          >
            Volver al listado
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre de la mascota
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
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
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Selecciona una especie</option>
              {especies.map((esp) => (
                <option key={esp} value={esp}>
                  {esp}
                </option>
              ))}
            </select>
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
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
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
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
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
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={() => navigate("/mascota")}
              className="bg-gray-300 hover:bg-gray-400 transition text-gray-800 px-6 py-3 rounded-lg shadow"
            >
              Cancelar
            </button>
            <button
              onClick={handleUpdate}
              className="bg-green-500 hover:bg-green-600 transition text-white px-6 py-3 rounded-lg shadow"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
