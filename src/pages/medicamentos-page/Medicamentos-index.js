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
import {  db } from "../../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import Swal from "sweetalert2";


const MedicamentosIndex = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredMedimentos = medicamentos.filter(
    (med) =>
      med.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.tipoMedicamento?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.formaFarmaceutica?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 📊 Estadísticas
  const stats = {
    total: medicamentos.length,
    activo: medicamentos.filter((m) => m.estado === "Activo").length,
    inactivo: medicamentos.filter((m) => m.estado !== "Activo").length,
  };

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

        // Actualizar lista en el estado
        setMedicamentos((prev) => prev.filter((med) => med.id !== id));

        Swal.fire("Eliminado", "El medicamento ha sido eliminado.", "success");
      }
    } catch (error) {
      console.error("❌ Error al eliminar medicamento:", error);
      Swal.fire("Error", "No se pudo eliminar el medicamento.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex justify-between items-center">

          <img src="/asset/logo.png" alt="Logo" className="w-[180px]" />
          <div className="flex ">
          <Link
            to="/medicamentos-create"
            className=" m-2 flex bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            Agregar Medicamentos
          </Link>

          <Link to="/sidebar"
            className="m-2 flex bg-gradient-to-r from-red-900 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">

          <ArrowLeft />
          </Link>
          </div>

        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 hover:-translate-y-1 transition-transform duration-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-2">
                  Total Medicamentos
                </p>
                <p className="text-4xl font-bold text-green-600">
                  {stats.total}
                </p>
              </div>
              <Package className="text-gray-300" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:-translate-y-1 transition-transform duration-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-2">
                  Activos
                </p>
                <p className="text-4xl font-bold text-green-600">
                  {stats.activo}
                </p>
              </div>
              <CheckCircle className="text-gray-300" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:-translate-y-1 transition-transform duration-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-2">
                  Inactivos
                </p>
                <p className="text-4xl font-bold text-red-600">
                  {stats.inactivo}
                </p>
              </div>
              <XCircle className="text-gray-300" size={40} />
            </div>
          </div>
        </div>

        {/* Tabla principal */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b-2 border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800">
              Inventario de Medicamentos
            </h2>

            <div className="relative w-full md:w-96">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Buscar medicamento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                <tr>
                  <th className="px-6 py-4">Nombre</th>
                  <th className="px-6 py-4">Cantidad</th>
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4">Forma Farmacéutica</th>
                  <th className="px-6 py-4">Tipo</th>
                  <th className="px-6 py-4">Fecha Creación</th>
                  <th className="px-6 py-4">Accion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredMedimentos.length > 0 ? (
                  filteredMedimentos.map((medicamento) => (
                    <tr
                      key={medicamento.id}
                      className="hover:bg-green-50 transition-colors"
                    >
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
                      <td className="px-6 py-4 flex justify-between ">
                        {" "}
                        <Link
                          to={`/medicamentos-edit/${medicamento.id}`}
                          className="text-green-500 "
                        >
                          <PencilLine />
                        </Link>
                        <button
                          onClick={() => eliminarMedicamento(medicamento.id)}
                          className="text-red-500"
                        >
                          <Trash2 />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-500">
                      No se encontraron medicamentos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicamentosIndex;
