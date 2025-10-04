import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function VeterinarioList() {
  const [veterinarios, setVeterinarios] = useState([]);
  const [selectedVet, setSelectedVet] = useState(null);

  useEffect(() => {
    const fetchVeterinarios = async () => {
      const querySnapshot = await getDocs(collection(db, "veterinarios"));
      const vets = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVeterinarios(vets);
    };

    fetchVeterinarios();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Listado de Veterinarios</h1>
          <div className="flex gap-2">
            <Link to="/veterinarios/add">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Agregar nuevo veterinario
              </button>
            </Link>
            <Link to="/sidebar">
              <button className="bg-red-400 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                Volver a Home
              </button>
            </Link>
          </div>
        </div>

        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Especialidad</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {veterinarios.map(vet => (
                  <tr key={vet.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vet.nombre}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vet.especialidad}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vet.telefono}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vet.correo}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        vet.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {vet.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                        onClick={() => setSelectedVet(vet)}
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        
        {selectedVet && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white w-full max-w-2xl p-8 rounded-3xl shadow-2xl relative">
              <button
                className="absolute top-6 right-6 text-gray-500 hover:text-gray-900 text-3xl font-bold"
                onClick={() => setSelectedVet(null)}
              >
                &times;
              </button>
              <h2 className="text-3xl font-bold mb-6 text-center">{selectedVet.nombre}</h2>
              <div className="grid grid-cols-1 gap-4 text-lg">
                <p><strong>Especialidad:</strong> {selectedVet.especialidad}</p>
                <p><strong>Teléfono:</strong> {selectedVet.telefono}</p>
                <p><strong>Correo:</strong> {selectedVet.correo}</p>
                <p>
                  <strong>Estado:</strong>
                  <span className={`ml-2 inline-block px-4 py-2 text-lg rounded-full ${
                    selectedVet.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {selectedVet.estado}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
