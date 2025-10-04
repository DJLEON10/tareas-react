import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";



const PetListDemo = () => {
  const [pets, setPets] = useState([]);

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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Listado de Mascotas
          </h1>
          <div className="flex gap-4">
            <Link
              to="/agregarmascota"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Agregar nueva mascota
            </Link>
            <Link
              to="/sidebar"
              className="bg-red-400 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Volver a Home
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
                    <Link
                      to={`/vermascota/${pet.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    >
                      Ver
                    </Link>
                    <Link
                      to={`/editarmascota/${pet.id}`} 
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Editar
                    </Link>
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
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    No hay mascotas registradas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PetListDemo;
