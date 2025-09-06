import React from "react";
import { Link } from "react-router-dom";

function HomeHooks() {
  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ejemplos de Hooks</h2>
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Nombre
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Descripción
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Categoría
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  to="/usestate"
                  className="text-[#0d4f4c] font-semibold hover:underline  "
                >
                  UseState
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Hook de React que permite manejar y actualizar el estado en
                componentes.
              </td>
              <td className="border border-gray-300 px-4 py-2">
                React Hook - Estado
              </td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  to="/usenavigate"
                  className="text-[#0d4f4c] font-semibold hover:underline  "
                >
                  Usenavigate
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Hook de React Router que permite navegar entre rutas de la
                aplicación.
              </td>
              <td className="border border-gray-300 px-4 py-2">
                React Router Hook
              </td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  to="/useref"
                  className="text-[#0d4f4c] font-semibold hover:underline  "
                >
                  UseRef
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Hook de React que permite manejar y actualizar el estado en
                componentes sin hacer el cambio en tiempo real 
              </td>
              <td className="border border-gray-300 px-4 py-2">
                React Hook- Referencias
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomeHooks;
