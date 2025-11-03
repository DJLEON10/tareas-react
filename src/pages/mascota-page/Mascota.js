import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import AgregarMascota from "../../pages/mascota-page/agregarmacota";
import VerMascotaModal from "../../pages/mascota-page/vermascota";
import EditarMascotaModal from "../../pages/mascota-page/editarmascota";

const PetListDemo = () => {
  const [pets, setPets] = useState([]);
  const [openModalAgregar, setOpenModalAgregar] = useState(false);
  const [openModalVer, setOpenModalVer] = useState(false);
  const [openModalEditar, setOpenModalEditar] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "mascotas"), (snapshot) => {
      const petsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPets(petsData);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta mascota?")) {
      try {
        await deleteDoc(doc(db, "mascotas", id));
      } catch (error) {
        console.error("Error al eliminar mascota:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Listado de Mascotas</h1>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={() => setOpenModalAgregar(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm sm:text-base whitespace-nowrap"
            >
              Agregar nueva mascota
            </button>
            <Link
              to="/sidebar"
              className="bg-red-400 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-center text-sm sm:text-base"
            >
              Volver a Home
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Vista de tabla para pantallas grandes */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3">Nombre</th>
                  <th className="px-6 py-3">Especie</th>
                  <th className="px-6 py-3">Edad</th>
                  <th className="px-6 py-3">Dueño</th>
                  <th className="px-6 py-3">Estado</th>
                  <th className="px-6 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pets.map((pet) => (
                  <tr key={pet.id}>
                    <td className="px-6 py-4">{pet.nombre}</td>
                    <td className="px-6 py-4">{pet.especie}</td>
                    <td className="px-6 py-4">{pet.edad}</td>
                    <td className="px-6 py-4">{pet.dueno}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          pet.estado === "activo"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {pet.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedPetId(pet.id);
                          setOpenModalVer(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                      >
                        Ver
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPetId(pet.id);
                          setOpenModalEditar(true);
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(pet.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
                {pets.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      No hay mascotas registradas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Vista de tarjetas para móviles */}
          <div className="md:hidden divide-y divide-gray-200">
            {pets.map((pet) => (
              <div key={pet.id} className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{pet.nombre}</h3>
                    <p className="text-sm text-gray-600">{pet.especie}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      pet.estado === "activo"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {pet.estado}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Edad:</span>
                    <span className="ml-1 text-gray-900">{pet.edad}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Dueño:</span>
                    <span className="ml-1 text-gray-900">{pet.dueno}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      setSelectedPetId(pet.id);
                      setOpenModalVer(true);
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm"
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPetId(pet.id);
                      setOpenModalEditar(true);
                    }}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(pet.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
            {pets.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No hay mascotas registradas
              </div>
            )}
          </div>
        </div>
      </div>

      {openModalAgregar && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 w-full max-w-3xl relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-500 text-xl font-bold hover:text-gray-700"
              onClick={() => setOpenModalAgregar(false)}
            >
              ×
            </button>
            <AgregarMascota onClose={() => setOpenModalAgregar(false)} />
          </div>
        </div>
      )}

      {openModalVer && selectedPetId && (
        <VerMascotaModal
          id={selectedPetId}
          onClose={() => setOpenModalVer(false)}
        />
      )}

      {openModalEditar && selectedPetId && (
        <EditarMascotaModal
          id={selectedPetId}
          onClose={() => setOpenModalEditar(false)}
        />
      )}
    </div>
  );
};

export default PetListDemo;