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
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-xl w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-2 sm:top-3 right-2 sm:right-3 text-gray-500 text-xl font-bold hover:text-gray-800 transition-colors"
          onClick={onClose}
        >
          ×
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6 pr-6">
          Detalles de la Mascota
        </h1>

        <div className="space-y-3 sm:space-y-4">
          <Info label="Nombre" value={pet.nombre} />
          <Info label="Especie" value={pet.especie} />
          <Info label="Edad" value={pet.edad} />
          <Info label="Dueño" value={pet.dueno} />
          <Info
            label="Estado"
            value={
              <span
                className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
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

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full sm:w-auto sm:float-right bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-2 sm:pb-3 gap-1 sm:gap-2">
      <span className="text-sm sm:text-base text-gray-500 font-medium">{label}:</span>
      <span className="text-sm sm:text-base text-gray-800 font-semibold break-words">{value}</span>
    </div>
  );
}