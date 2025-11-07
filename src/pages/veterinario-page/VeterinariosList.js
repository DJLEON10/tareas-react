import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function VeterinarioList() {
  const [veterinarios, setVeterinarios] = useState([]);
  const [selectedVet, setSelectedVet] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    especialidad: "",
    telefono: "",
    correo: "",
    estado: "Activo",
  });

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

  const handleEdit = (vet) => {
    setSelectedVet(vet);
    setFormData({
      nombre: vet.nombre,
      especialidad: vet.especialidad,
      telefono: vet.telefono,
      correo: vet.correo,
      estado: vet.estado,
    });
    setEditMode(true);
    setAddMode(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveChanges = async () => {
    if (!selectedVet) return;

    if (
      !formData.nombre.trim() ||
      !formData.especialidad.trim() ||
      !formData.telefono.trim() ||
      !formData.correo.trim() ||
      !formData.estado.trim()
    ) {
      Swal.fire("Campos incompletos", "Todos los campos son obligatorios", "warning");
      return;
    }

    try {
      const vetRef = doc(db, "veterinarios", selectedVet.id);
      await updateDoc(vetRef, formData);

      setVeterinarios(veterinarios.map(v =>
        v.id === selectedVet.id ? { ...v, ...formData } : v
      ));

      Swal.fire("Éxito", "Veterinario actualizado correctamente", "success");

      setEditMode(false);
      setSelectedVet(null);
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el veterinario", "error");
    }
  };

  const addVeterinario = async () => {
    if (
      !formData.nombre.trim() ||
      !formData.especialidad.trim() ||
      !formData.telefono.trim() ||
      !formData.correo.trim()
    ) {
      Swal.fire("Campos incompletos", "Todos los campos son obligatorios", "warning");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "veterinarios"), formData);
      setVeterinarios([...veterinarios, { id: docRef.id, ...formData }]);
      Swal.fire("Éxito", "Veterinario agregado correctamente", "success");
      setAddMode(false);
      setFormData({
        nombre: "",
        especialidad: "",
        telefono: "",
        correo: "",
        estado: "Activo",
      });
    } catch (error) {
      Swal.fire("Error", "No se pudo agregar el veterinario", "error");
    }
  };

  const deleteVeterinario = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar veterinario?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteDoc(doc(db, "veterinarios", id));
      setVeterinarios(veterinarios.filter(v => v.id !== id));
      Swal.fire("Eliminado", "Veterinario eliminado correctamente", "success");
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar el veterinario", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
            Listado de Veterinarios
          </h1>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">

            <button
              onClick={() => {
                setFormData({
                  nombre: "",
                  especialidad: "",
                  telefono: "",
                  correo: "",
                  estado: "Activo",
                });
                setSelectedVet(null);
                setEditMode(false);
                setAddMode(true);
              }}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Agregar nuevo
            </button>

            <Link to="/sidebar" className="w-full sm:w-auto">
              <button className="w-full bg-red-400 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                Volver a Home
              </button>
            </Link>
          </div>
        </div>

        <div className="hidden sm:block bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
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
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{vet.nombre}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{vet.especialidad}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{vet.telefono}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 break-all">{vet.correo}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        vet.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {vet.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium flex gap-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                        onClick={() => setSelectedVet(vet)}
                      >
                        Ver
                      </button>
                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                        onClick={() => handleEdit(vet)}
                      >
                        Editar
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                        onClick={() => deleteVeterinario(vet.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="sm:hidden space-y-4">
          {veterinarios.map(vet => (
            <div key={vet.id} className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-gray-900">{vet.nombre}</h3>
              <p><strong>Especialidad:</strong> {vet.especialidad}</p>
              <p><strong>Teléfono:</strong> {vet.telefono}</p>
              <p><strong>Correo:</strong> {vet.correo}</p>
              <p>
                <strong>Estado:</strong>{" "}
                <span className={`px-2 py-1 rounded-full text-sm ${
                  vet.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                  {vet.estado}
                </span>
              </p>
              <div className="flex flex-col gap-2 mt-3">
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition" onClick={() => setSelectedVet(vet)}>Ver</button>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition" onClick={() => handleEdit(vet)}>Editar</button>
                <button className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition" onClick={() => deleteVeterinario(vet.id)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>

        {selectedVet && !editMode && !addMode && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white w-full max-w-md sm:max-w-2xl p-6 sm:p-8 rounded-3xl shadow-2xl relative">
              <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-2xl font-bold" onClick={() => setSelectedVet(null)}>&times;</button>
              <h2 className="text-2xl font-bold mb-6 text-center">{selectedVet.nombre}</h2>
              <div className="grid grid-cols-1 gap-4 text-base">
                <p><strong>Especialidad:</strong> {selectedVet.especialidad}</p>
                <p><strong>Teléfono:</strong> {selectedVet.telefono}</p>
                <p><strong>Correo:</strong> {selectedVet.correo}</p>
                <p>
                  <strong>Estado:</strong>{" "}
                  <span className={`ml-2 px-4 py-1 rounded-full ${
                    selectedVet.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {selectedVet.estado}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}

        {editMode && (
          <ModalFormulario
            titulo="Editar Veterinario"
            formData={formData}
            handleChange={handleChange}
            onClose={() => { setEditMode(false); setSelectedVet(null); }}
            onSubmit={saveChanges}
          />
        )}

        {addMode && (
          <ModalFormulario
            titulo="Agregar Veterinario"
            formData={formData}
            handleChange={handleChange}
            onClose={() => setAddMode(false)}
            onSubmit={addVeterinario}
          />
        )}
      </div>
    </div>
  );
}

function ModalFormulario({ titulo, formData, handleChange, onClose, onSubmit }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-md sm:max-w-2xl p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-y-auto max-h-[90vh]">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-2xl font-bold" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">{titulo}</h2>
        <div className="grid grid-cols-1 gap-4">
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="border p-2 rounded" placeholder="Nombre" />
          <input type="text" name="especialidad" value={formData.especialidad} onChange={handleChange} className="border p-2 rounded" placeholder="Especialidad" />
          <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} className="border p-2 rounded" placeholder="Teléfono" />
          <input type="email" name="correo" value={formData.correo} onChange={handleChange} className="border p-2 rounded" placeholder="Correo" />
          <select name="estado" value={formData.estado} onChange={handleChange} className="border p-2 rounded">
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
        <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition" onClick={onSubmit}>
          Guardar
        </button>
      </div>
    </div>
  );
}
