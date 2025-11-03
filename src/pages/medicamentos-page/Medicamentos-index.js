import React, { useState, useEffect } from "react";
import {
  Search,
  Package,
  CheckCircle,
  XCircle,
  PencilLine,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";

const MedicamentosIndex = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Estados para modales
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    cantidad: "",
    tipoMedicamento: "",
    formaFarmaceutica: "",
    estado: "Activo",
  });
  const [editId, setEditId] = useState(null);

  // Cargar medicamentos
  useEffect(() => {
    const fetchMedicamentos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "medicamentos"));
        const meds = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMedicamentos(meds);
      } catch (error) {
        console.error(" Error al obtener medicamentos:", error);
      }
    };

    fetchMedicamentos();
  }, []);

  // Filtro de búsqueda
  const filteredMedimentos = medicamentos.filter(
    (med) =>
      med.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.tipoMedicamento?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.formaFarmaceutica?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Estadísticas
  const stats = {
    total: medicamentos.length,
    activo: medicamentos.filter((m) => m.estado === "Activo").length,
    inactivo: medicamentos.filter((m) => m.estado !== "Activo").length,
  };

  // Eliminar
  const eliminarMedicamento = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará el medicamento de forma permanente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (confirm.isConfirmed) {
        await deleteDoc(doc(db, "medicamentos", id));
        setMedicamentos((prev) => prev.filter((med) => med.id !== id));
        Swal.fire("Eliminado", "El medicamento ha sido eliminado.", "success");
      }
    } catch (error) {
      console.error("❌ Error al eliminar medicamento:", error);
      Swal.fire("Error", "No se pudo eliminar el medicamento.", "error");
    }
  };

  // Crear medicamento
  const crearMedicamento = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "medicamentos"), {
        ...formData,
        creado: new Date(),
      });

      Swal.fire("✅ Éxito", "Medicamento creado correctamente", "success");
      setShowCreateModal(false);
      setFormData({
        nombre: "",
        cantidad: "",
        tipoMedicamento: "",
        formaFarmaceutica: "",
        estado: "Activo",
      });

      // Recargar lista
      const querySnapshot = await getDocs(collection(db, "medicamentos"));
      const meds = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMedicamentos(meds);
    } catch (error) {
      console.error("❌ Error al crear medicamento:", error);
      Swal.fire("Error", "No se pudo registrar el medicamento", "error");
    }
  };

  // Abrir modal de edición
  const abrirModalEdicion = async (id) => {
    try {
      const docRef = doc(db, "medicamentos", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
        setEditId(id);
        setShowEditModal(true);
      }
    } catch (error) {
      console.error("❌ Error al obtener medicamento:", error);
      Swal.fire("Error", "No se pudieron cargar los datos", "error");
    }
  };

  // Actualizar medicamento
  const actualizarMedicamento = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "medicamentos", editId);
      await updateDoc(docRef, formData);
      Swal.fire("✅ Éxito", "Medicamento actualizado correctamente", "success");
      setShowEditModal(false);

      // Recargar lista
      const querySnapshot = await getDocs(collection(db, "medicamentos"));
      const meds = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMedicamentos(meds);
    } catch (error) {
      console.error("❌ Error al actualizar medicamento:", error);
      Swal.fire("Error", "No se pudo actualizar el medicamento", "error");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🧱 Modal genérico
  const Modal = ({ visible, onClose, onSubmit, title, isEdit = false }) => {
    if (!visible) return null;
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-[#0d4f4c] mb-4">
            {title}
          </h2>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-[#0d4f4c] font-medium mb-1 flex">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md focus:ring-1 focus:ring-[#7bc4b8]"
              />
            </div>
            <div>
              <label className="text-[#0d4f4c] font-medium mb-1 flex">
                Cantidad
              </label>
              <input
                type="number"
                name="cantidad"
                value={formData.cantidad}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md focus:ring-1 focus:ring-[#7bc4b8]"
              />
            </div>
            <div>
              <label className="text-[#0d4f4c] font-medium mb-1 flex">
                Tipo de Medicamento
              </label>
              <select
                name="tipoMedicamento"
                value={formData.tipoMedicamento}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-1 focus:ring-[#7bc4b8]"
              >
                <option value="">Selecciona un tipo</option>
                <option value="antibióticos">Antibióticos</option>
                <option value="antiparasitarios">Antiparasitarios</option>
                <option value="antiinflamatorios">Antiinflamatorios</option>
                <option value="analgésicos">Analgésicos</option>
                <option value="antifúngicos">Antifúngicos</option>
                <option value="antivirales">Antivirales</option>
                <option value="vacunas">Vacunas</option>
              </select>
            </div>
            {isEdit && (
              <div>
                <label className="text-[#0d4f4c] font-medium mb-1 flex">
                  Estado
                </label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-1 focus:ring-[#7bc4b8]"
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
            )}
            <div>
              <label className="text-[#0d4f4c] font-medium mb-1 flex">
                Forma Farmacéutica
              </label>
              <input
                type="text"
                name="formaFarmaceutica"
                value={formData.formaFarmaceutica}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md focus:ring-1 focus:ring-[#7bc4b8]"
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-[#2d7a6b] text-white px-4 py-2 rounded-md hover:bg-[#0d4f4c]"
              >
                {isEdit ? "Guardar Cambios" : "Registrar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Render principal
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex justify-between items-center">
          <img src="/asset/logo.png" alt="Logo" className="w-[180px]" />
          <div className="flex">
            <button
              onClick={() => setShowCreateModal(true)}
              className="m-2 flex bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            >
              Agregar Medicamento
            </button>
            <Link
              to="/sidebar"
              className="m-2 flex bg-gradient-to-r from-red-900 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            >
              <ArrowLeft />
            </Link>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 text-sm">Total</p>
            <p className="text-4xl font-bold text-green-600">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 text-sm">Activos</p>
            <p className="text-4xl font-bold text-green-600">{stats.activo}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 text-sm">Inactivos</p>
            <p className="text-4xl font-bold text-red-600">{stats.inactivo}</p>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Inventario de Medicamentos
            </h2>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500"
              />
            </div>
          </div>

          <table className="w-full text-sm text-left">
            <thead className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
              <tr>
                <th className="px-6 py-4">Nombre</th>
                <th className="px-6 py-4">Cantidad</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Forma Farmacéutica</th>
                <th className="px-6 py-4">Tipo</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMedimentos.length > 0 ? (
                filteredMedimentos.map((medicamento) => (
                  <tr key={medicamento.id}>
                    <td className="px-6 py-4">{medicamento.nombre}</td>
                    <td className="px-6 py-4">{medicamento.cantidad}</td>
                    <td className="px-6 py-4">{medicamento.estado}</td>
                    <td className="px-6 py-4">
                      {medicamento.formaFarmaceutica}
                    </td>
                    <td className="px-6 py-4">
                      {medicamento.tipoMedicamento}
                    </td>
                    <td className="px-6 py-4">
                      {medicamento.creado?.seconds
                        ? new Date(
                            medicamento.creado.seconds * 1000
                          ).toLocaleString()
                        : "No disponible"}
                    </td>
                    <td className="px-6 py-4 flex gap-3">
                      <button
                        onClick={() => abrirModalEdicion(medicamento.id)}
                        className="text-green-600"
                      >
                        <PencilLine />
                      </button>
                      <button
                        onClick={() => eliminarMedicamento(medicamento.id)}
                        className="text-red-600"
                      >
                        <Trash2 />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-6 text-gray-500"
                  >
                    No se encontraron medicamentos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modales */}
        <Modal
          visible={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={crearMedicamento}
          title="Crear Medicamento"
        />

        <Modal
          visible={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSubmit={actualizarMedicamento}
          title="Editar Medicamento"
          isEdit
        />
      </div>
    </div>
  );
};

export default MedicamentosIndex;
