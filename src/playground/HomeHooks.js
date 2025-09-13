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

            <tr className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  to="/useDebug"
                  className="text-[#0d4f4c] font-semibold hover:underline  "
                >
                  Usedebug
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                useDebugValue es un hook de React que se usa dentro de custom
                hooks para mostrar información de depuración en React DevTools
                sin afectar la lógica del código. en otras paralabras sirve para
                depurar nuestro codigo
              </td>
              <td className="border border-gray-300 px-4 py-2">
              hooks de desarrollo/depuración
              </td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  to="/usereduce"
                  className="text-[#0d4f4c] font-semibold hover:underline  "
                >
                  UseReduce
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
              Maneja estado con lógica compleja usando un reducer
              </td>
              <td className="border border-gray-300 px-4 py-2">
                React Hook- Estado
              </td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  to="/useimperativehandle"
                  className="text-[#0d4f4c] font-semibold hover:underline  "
                >
                  UseImperativeReduce
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
              Controla qué expone un ref hacia el padre
              </td>
              <td className="border border-gray-300 px-4 py-2">
                React Hook- Referencias
              </td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  to="/usememo"
                  className="text-[#0d4f4c] font-semibold hover:underline  "
                >
                  UseMemo
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
              Memoriza valores para evitar cálculos innecesarios
              </td>
              <td className="border border-gray-300 px-4 py-2">
                React Hook- Rendimiento
              </td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  to="/usecallback"
                  className="text-[#0d4f4c] font-semibold hover:underline  "
                >
                  UseCallback
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
              Memoriza funciones para evitar recrearlas en renders
              </td>
              <td className="border border-gray-300 px-4 py-2">
                React Hook- Rendimiento
              </td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  to="/usetransmition"
                  className="text-[#0d4f4c] font-semibold hover:underline  "
                >
                  UseTransmition
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
              Marca actualizaciones como no urgentes
              </td>
              <td className="border border-gray-300 px-4 py-2">
                React Hook- Concurrente
              </td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  to="/usedeferredvalue"
                  className="text-[#0d4f4c] font-semibold hover:underline  "
                >
                  UseDeferredValue
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
              Retrasa un valor para no trabar la UI
              </td>
              <td className="border border-gray-300 px-4 py-2">
                React Hook- Concurrente
              </td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  to="/useeffect"
                  className="text-[#0d4f4c] font-semibold hover:underline  "
                >
                  UseEffect
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
              Ejecuta efectos secundarios tras render , en otras palabras hace los cambios sin renderizar la pagina
              </td>
              <td className="border border-gray-300 px-4 py-2">
                React Hook- Efectos
              </td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  to="/uselayouteffect"
                  className="text-[#0d4f4c] font-semibold hover:underline  "
                >
                  UseLayoutEffect
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
              Igual que useEffect pero antes del repintado
              </td>
              <td className="border border-gray-300 px-4 py-2">
                React Hook- Efectos
              </td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  to="/useonlinestatus"
                  className="text-[#0d4f4c] font-semibold hover:underline  "
                >
                  UseOnlineStatus
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
              Custom hook para saber si estás online/offline
              </td>
              <td className="border border-gray-300 px-4 py-2">
                React Hook- Custom (Estado + Efectos)
              </td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  to="/useinsertioneffect"
                  className="text-[#0d4f4c] font-semibold hover:underline  "
                >
                  UseUseInsetionEffect
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
              Se ejecuta justo antes de insertar el DOM, útil para librerías de estilos
              </td>
              <td className="border border-gray-300 px-4 py-2">
                React Hook- Efectos
              </td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  to="/usecontext"
                  className="text-[#0d4f4c] font-semibold hover:underline  "
                >
                  UseContext
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
              Permite consumir valores de un contexto
              </td>
              <td className="border border-gray-300 px-4 py-2">
                React Hook- Contexto
              </td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  to="/usesynkexternalstore"
                  className="text-[#0d4f4c] font-semibold hover:underline  "
                >
                  UseSyncExternalStore
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
              conecta React con stores externos asegurando actualizaciones sincronizadas
              </td>
              <td className="border border-gray-300 px-4 py-2">
                React Hook- Estado (externo)
              </td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  to="/useid"
                  className="text-[#0d4f4c] font-semibold hover:underline  "
                >
                  UseId
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
              Genera IDs únicos estables para accesibilidad y formularios
              </td>
              <td className="border border-gray-300 px-4 py-2">
                React Hook- Utilidad
              </td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  to="/useoptimistic"
                  className="text-[#0d4f4c] font-semibold hover:underline  "
                >
                  UseOptimistic
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
              Permite mostrar un estado “optimista” antes de confirmar cambios
              </td>
              <td className="border border-gray-300 px-4 py-2">
                React Hook- Estado concurrente
              </td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  to="/useformstatus"
                  className="text-[#0d4f4c] font-semibold hover:underline  "
                >
                  UseFormStatus
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
              Da información del estado de un formulario dentro de form
              </td>
              <td className="border border-gray-300 px-4 py-2">
                React Hook- Formularios/Estado
              </td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  to="/useactionstate"
                  className="text-[#0d4f4c] font-semibold hover:underline  "
                >
                  UseActionState
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
              Maneja el estado de acciones asíncronas en formularios              </td>
              <td className="border border-gray-300 px-4 py-2">
                React Hook- Formularios/Estado
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomeHooks;
