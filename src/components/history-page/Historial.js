import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Ajusta la ruta según tu proyecto
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function UserHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // -------------------------------------------------
  // EXPORTAR EXCEL
  // -------------------------------------------------
  const exportToExcel = () => {
    import("xlsx").then((xlsx) => {
      const dataToExport = filteredUsers.map((u) => ({
        Nombre: u.nombre,
        Email: u.email,
        Métodos: u.metodosAuth.join(", "),
        HoraEntrada: formatearFecha(u.horaEntrada),
        HoraSalida: u.horaSalida ? formatearFecha(u.horaSalida) : "En sesión",
        Duración: u.duracionSesion,
        EstadoSesion: u.estadoSesion
      }));

      const worksheet = xlsx.utils.json_to_sheet(dataToExport);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      xlsx.writeFile(workbook, "usuarios_historial.xlsx");
    });
  };

  // -------------------------------------------------
  // EXPORTAR PDF
  // -------------------------------------------------
const exportToPDF = () => {
  const doc = new jsPDF();

  autoTable(doc, {
    head: [
      [
        "Nombre",
        "Email",
        "Métodos",
        "Entrada",
        "Salida",
        "Duración",
        "Estado",
      ],
    ],
    body: filteredUsers.map((u) => [
      u.nombre,
      u.email,
      u.metodosAuth.join(", "),
      formatearFecha(u.horaEntrada),
      u.horaSalida ? formatearFecha(u.horaSalida) : "En sesión",
      u.duracionSesion,
      u.estadoSesion,
    ]),
    startY: 20,
  });

  doc.text("Historial de Usuarios", 14, 15);
  doc.save("usuarios_historial.pdf");
};



  // -------------------------------------------------
  // Calcular duración
  // -------------------------------------------------
  const calcularDuracionSesion = (horaEntrada, horaSalida) => {
    if (!horaEntrada) return "Sin entrada";
    
    try {
      let entrada;

      if (typeof horaEntrada === 'string') entrada = new Date(horaEntrada);
      else if (horaEntrada?.seconds) entrada = new Date(horaEntrada.seconds * 1000);
      else entrada = new Date(horaEntrada);

      let salida;
      if (!horaSalida) salida = new Date();
      else if (typeof horaSalida === 'string') salida = new Date(horaSalida);
      else if (horaSalida?.seconds) salida = new Date(horaSalida.seconds * 1000);
      else salida = new Date(horaSalida);

      if (isNaN(entrada.getTime()) || isNaN(salida.getTime())) {
        return "Fecha inválida";
      }

      const diff = salida - entrada;
      if (diff < 0) return "N/A";

      const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diff % (1000 * 60)) / 1000);

      if (dias > 0) return `${dias}d ${horas}h ${minutos}m`;
      if (horas > 0) return `${horas}h ${minutos}m`;
      if (minutos > 0) return `${minutos}m ${segundos}s`;
      return `${segundos}s`;

    } catch (error) {
      return "Error";
    }
  };

  // -------------------------------------------------
  // Formatear fechas
  // -------------------------------------------------
  const formatearFecha = (fecha) => {
    if (!fecha) return "N/A";
    try {
      let fechaObj;
      
      if (typeof fecha === 'string') fechaObj = new Date(fecha);
      else if (fecha?.seconds) fechaObj = new Date(fecha.seconds * 1000);
      else fechaObj = new Date(fecha);

      if (isNaN(fechaObj.getTime())) return "Fecha inválida";

      return fechaObj.toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch {
      return "Error";
    }
  };

  // -------------------------------------------------
  // Obtener usuarios
  // -------------------------------------------------
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "usuarios"));

        const usersData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            nombre: data.nombre || "N/A",
            email: data.email || "N/A",
            metodosAuth: data.metodosAuth || [],
            metodoAutenticacion: data.metodoAutenticacion || data.metodo || "Email/Password",
            horaEntrada: data.horaEntrada || null,
            horaSalida: data.horaSalida || null,
            duracionSesion: calcularDuracionSesion(data.horaEntrada, data.horaSalida),
            estadoSesion: data.estadoSesion || data.estado || "Cerrada",
            fechaRegistro: data.fechaRegistro || data.creado || "N/A"
          };
        });

        setUsers(usersData);
        setError(null);
      } catch (err) {
        setError("Error al cargar los usuarios. Intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    const interval = setInterval(() => {
      setUsers(prevUsers => 
        prevUsers.map(user => ({
          ...user,
          duracionSesion: calcularDuracionSesion(user.horaEntrada, user.horaSalida)
        }))
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // -------------------------------------------------
  // Filtro
  // -------------------------------------------------
  const filteredUsers = users.filter(user => {
    return (
      user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0d4f4c] mb-2">
            Historial de Usuarios
          </h1>
          <p className="text-gray-600">
            Gestiona y visualiza el historial de todos los usuarios registrados
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#0d4f4c]"></div>
            <p className="mt-4 text-gray-600">Cargando usuarios...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* CONTENIDO */}
        {!loading && !error && (
          <>
            {/* Filtros */}
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
              <div className="flex flex-col gap-4">

                {/* Buscador */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buscar Usuario
                  </label>
                  <input
                    type="text"
                    placeholder="Buscar por nombre o email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d4f4c] focus:border-transparent outline-none"
                  />
                </div>

                {/* BOTONES EXPORTAR */}
                <div className="flex flex-wrap gap-3 mt-4">
                  <button
                    onClick={exportToExcel}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Exportar Excel
                  </button>

                  <button
                    onClick={exportToPDF}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Exportar PDF
                  </button>
                </div>

              </div>

              {/* Estadísticas Rápidas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Total Usuarios</p>
                  <p className="text-2xl font-bold text-blue-600">{users.length}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Sesiones Activas</p>
                  <p className="text-2xl font-bold text-green-600">
                    {users.filter(u => u.estadoSesion === "Activa").length}
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Sesiones Cerradas</p>
                  <p className="text-2xl font-bold text-red-600">
                    {users.filter(u => u.estadoSesion === "Cerrada" || u.estadoSesion === "pendiente").length}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Con Google Auth</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {users.filter(u => u.metodosAuth?.includes("google")).length}
                  </p>
                </div>
              </div>
            </div>

            {/* Tabla Desktop */}
            <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0d4f4c] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Nombre</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Métodos Auth</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Hora Entrada</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Hora Salida</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Duración</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Estado Sesión</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.nombre}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {user.metodosAuth.length > 0 ? (
                                user.metodosAuth.map((metodo, index) => (
                                  <span
                                    key={index}
                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                      metodo === "google"
                                        ? "bg-blue-100 text-blue-800"
                                        : metodo === "github"
                                        ? "bg-gray-800 text-white"
                                        : metodo === "facebook"
                                        ? "bg-blue-600 text-white"
                                        : metodo === "password"
                                        ? "bg-gray-100 text-gray-800"
                                        : "bg-gray-100 text-gray-800"
                                    }`}
                                  >
                                    {metodo}
                                  </span>
                                ))
                              ) : (
                                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                                  {user.metodoAutenticacion}
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="px-6 py-4 text-sm text-gray-600">
                            {formatearFecha(user.horaEntrada)}
                          </td>

                          <td className="px-6 py-4 text-sm text-gray-600">
                            {user.horaSalida ? formatearFecha(user.horaSalida) : (
                              <span className="text-green-600 font-medium">En sesión</span>
                            )}
                          </td>

                          <td className="px-6 py-4 text-sm font-medium">
                            <span className={user.estadoSesion === "Activa" ? "text-green-600 font-semibold" : "text-gray-900"}>
                              {user.duracionSesion}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              user.estadoSesion === "Activa"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}>
                              {user.estadoSesion}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                          No se encontraron usuarios
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cards Mobile */}
            <div className="md:hidden space-y-4">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div key={user.id} className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{user.nombre}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.estadoSesion === "Activa"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {user.estadoSesion}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600 block mb-1">Métodos de Autenticación:</span>
                        <div className="flex flex-wrap gap-1">
                          {user.metodosAuth.length > 0 ? (
                            user.metodosAuth.map((metodo, index) => (
                              <span
                                key={index}
                                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                  metodo === "google"
                                    ? "bg-blue-100 text-blue-800"
                                    : metodo === "github"
                                    ? "bg-gray-800 text-white"
                                    : metodo === "facebook"
                                    ? "bg-blue-600 text-white"
                                    : metodo === "password"
                                    ? "bg-gray-100 text-gray-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {metodo}
                              </span>
                            ))
                          ) : (
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                              {user.metodoAutenticacion}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Hora Entrada:</span>
                        <span className="font-medium text-xs">
                          {formatearFecha(user.horaEntrada)}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Hora Salida:</span>
                        <span className="font-medium text-xs">
                          {user.horaSalida ? formatearFecha(user.horaSalida) : (
                            <span className="text-green-600">En sesión</span>
                          )}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Duración:</span>
                        <span className={`font-medium ${user.estadoSesion === "Activa" ? "text-green-600" : ""}`}>
                          {user.duracionSesion}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
                  No se encontraron usuarios
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
