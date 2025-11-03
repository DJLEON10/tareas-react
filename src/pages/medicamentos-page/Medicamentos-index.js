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
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-[#0d4f4c] mb-4 sm:mb-6">
            {title}
          </h2>

          <form onSubmit={onSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <label className="text-[#0d4f4c] font-medium mb-1 flex text-sm sm:text-base">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full p-2 sm:p-3 border rounded-md focus:ring-1 focus:ring-[#7bc4b8] text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="text-[#0d4f4c] font-medium mb-1 flex text-sm sm:text-base">
                Cantidad
              </label>
              <input
                type="number"
                name="cantidad"
                value={formData.cantidad}
                onChange={handleChange}
                required
                className="w-full p-2 sm:p-3 border rounded-md focus:ring-1 focus:ring-[#7bc4b8] text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="text-[#0d4f4c] font-medium mb-1 flex text-sm sm:text-base">
                Tipo de Medicamento
              </label>
              <select
                name="tipoMedicamento"
                value={formData.tipoMedicamento}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border rounded-md focus:ring-1 focus:ring-[#7bc4b8] text-sm sm:text-base"
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
                <label className="text-[#0d4f4c] font-medium mb-1 flex text-sm sm:text-base">
                  Estado
                </label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 border rounded-md focus:ring-1 focus:ring-[#7bc4b8] text-sm sm:text-base"
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
            )}
            <div>
              <label className="text-[#0d4f4c] font-medium mb-1 flex text-sm sm:text-base">
                Forma Farmacéutica
              </label>
              <input
                type="text"
                name="formaFarmaceutica"
                value={formData.formaFarmaceutica}
                onChange={handleChange}
                required
                className="w-full p-2 sm:p-3 border rounded-md focus:ring-1 focus:ring-[#7bc4b8] text-sm sm:text-base"
              />
            </div>

            <div className="flex justify-between mt-6 gap-3">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-600 text-sm sm:text-base"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-[#2d7a6b] text-white px-4 py-2 rounded-md hover:bg-[#0d4f4c] text-sm sm:text-base"
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="bg-white rounded-2xl shadow-lg p-3 sm:p-6 mb-4 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <img src="/asset/logo.png" alt="Logo" className="w-[120px] sm:w-[150px] md:w-[180px]" />
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex-1 sm:flex-none flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
              >
                Agregar Medicamento
              </button>
              <Link
                to="/sidebar"
                className="flex-none flex bg-gradient-to-r from-red-900 to-red-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <p className="text-gray-500 text-xs sm:text-sm">Total</p>
            <p className="text-3xl sm:text-4xl font-bold text-green-600">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <p className="text-gray-500 text-xs sm:text-sm">Activos</p>
            <p className="text-3xl sm:text-4xl font-bold text-green-600">{stats.activo}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <p className="text-gray-500 text-xs sm:text-sm">Inactivos</p>
            <p className="text-3xl sm:text-4xl font-bold text-red-600">{stats.inactivo}</p>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 border-b pb-4 gap-3">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
              Inventario de Medicamentos
            </h2>
            <div className="relative w-full sm:w-auto">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          {/* Tabla responsive - columnas ocultas en móvil */}
          <div className="w-full overflow-x-hidden">
            <table className="w-full text-xs sm:text-sm text-left table-auto">
              <thead className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                <tr>
                  <th className="px-1 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">Nombre</th>
                  <th className="px-1 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">Cant.</th>
                  <th className="px-1 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm hidden md:table-cell">Estado</th>
                  <th className="px-1 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm hidden lg:table-cell">Forma</th>
                  <th className="px-1 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm hidden sm:table-cell">Tipo</th>
                  <th className="px-1 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm hidden xl:table-cell">Fecha</th>
                  <th className="px-1 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredMedimentos.length > 0 ? (
                  filteredMedimentos.map((medicamento) => (
                    <tr key={medicamento.id} className="hover:bg-gray-50">
                      <td className="px-1 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">
                        <div>
                          <div className="font-medium truncate max-w-[100px] sm:max-w-none">{medicamento.nombre}</div>
                          <div className="text-[10px] sm:text-xs text-gray-500 md:hidden">
                            {medicamento.estado}
                          </div>
                        </div>
                      </td>
                      <td className="px-1 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">{medicamento.cantidad}</td>
                      <td className="px-1 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm hidden md:table-cell">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          medicamento.estado === 'Activo' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {medicamento.estado}
                        </span>
                      </td>
                      <td className="px-1 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm hidden lg:table-cell">
                        {medicamento.formaFarmaceutica}
                      </td>
                      <td className="px-1 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm hidden sm:table-cell">
                        {medicamento.tipoMedicamento}
                      </td>
                      <td className="px-1 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm hidden xl:table-cell">
                        {medicamento.creado?.seconds
                          ? new Date(
                              medicamento.creado.seconds * 1000
                            ).toLocaleDateString('es-ES')
                          : "N/A"}
                      </td>
                      <td className="px-1 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
                        <div className="flex gap-1 sm:gap-2">
                          <button
                            onClick={() => abrirModalEdicion(medicamento.id)}
                            className="text-green-600 hover:text-green-800 p-1"
                            title="Editar"
                          >
                            <PencilLine size={14} className="sm:w-5 sm:h-5" />
                          </button>
                          <button
                            onClick={() => eliminarMedicamento(medicamento.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Eliminar"
                          >
                            <Trash2 size={14} className="sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-6 sm:py-8 text-gray-500 text-sm"
                    >
                      No se encontraron medicamentos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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