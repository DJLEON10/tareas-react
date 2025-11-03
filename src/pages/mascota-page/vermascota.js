import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function VerMascotaModal({ id, onClose }) {
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const snap = await getDoc(doc(db, "mascotas", id));
        if (snap.exists()) {
          setPet({ id: snap.id, ...snap.data() });
        } else {
          alert("Mascota no encontrada ");
          if (onClose) onClose();
        }
      } catch (err) {
        console.error("Error al obtener mascota:", err);
      }
    };
    fetchPet();
  }, [id, onClose]);

  if (!pet) return null;

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-2xl relative">
        <button
          className="absolute top-3 right-3 text-gray-500 text-xl font-bold hover:text-gray-800"
          onClick={onClose}
        >
          ×
        </button>

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
