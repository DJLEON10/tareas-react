import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";

export default function VerMascota() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const ref = doc(db, "mascotas", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setPet({ id: snap.id, ...snap.data() });
        } else {
          alert("Mascota no encontrada ❌");
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

  const handleDelete = async () => {
    if (window.confirm(`¿Seguro que quieres eliminar a ${pet.nombre}?`)) {
      try {
        await deleteDoc(doc(db, "mascotas", id));
        alert("Mascota eliminada ✅");
        navigate("/mascota");
      } catch (err) {
        console.error("Error al eliminar:", err);
      }
    }
  };

  

  if (!pet) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
        <Link
            to="/mascota"
            className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg shadow"
          >
            Volver al listado
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Detalles de la Mascota
        </h1>

        <div className="space-y-4">
          <Info label="Nombre" value={pet.nombre} />
          <Info label="Especie" value={pet.especie} />
          <Info label="Edad" value={pet.edad} />
          <Info label="Dueño" value={pet.dueno} />
          <Info
            label="Estado"
            value={
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  pet.estado === "activo"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {pet.estado}
              </span>
            }
          />
        </div>

        
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex justify-between items-center border-b pb-2">
      <span className="text-gray-500 font-medium">{label}:</span>
      <span className="text-gray-800 font-semibold">{value}</span>
    </div>
  );
}
