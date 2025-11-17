import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const user = auth.currentUser;
      
      if (user) {
        const ahora = new Date().toISOString();
        
        // Actualizar la sesión en Firestore
        await setDoc(doc(db, "usuarios", user.uid), {
          horaSalida: ahora,
          estadoSesion: "Cerrada"
        }, { merge: true });
        
      }
      
      // Cerrar sesión de Firebase Auth
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      navigate('/login');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center">
        <img src="/asset/logo.png" alt="Logo" className="w-[120px] md:w-[180px]" />

        {/* Menú Hamburguesa - Solo visible en móvil */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-[#0d4f4c] transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-[#0d4f4c] transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-[#0d4f4c] transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Menú Desktop - Oculto en móvil */}
        <div className="hidden md:flex gap-x-4 items-center">
          <button className="hover:bg-red-400 rounded-lg transition-colors">
            <Link
              to="/mascota"
              className="text-[#0d4f4c] font-semibold p-4 text-[20px] block"
            >
              Mascotas
            </Link>
          </button>

          <button className="hover:bg-red-400 rounded-lg transition-colors">
            <Link
              to="/medicamentos-index"
              className="text-[#0d4f4c] font-semibold p-4 text-[20px] block"
            >
              Medicamentos
            </Link>
          </button>

          <button className="hover:bg-red-400 rounded-lg transition-colors">
            <Link
              to="/Veterinarios"
              className="text-[#0d4f4c] font-semibold p-4 text-[20px] block"
            >
              Veterinarios
            </Link>
          </button>

          <Link
            to="/historial"
            className="text-[#0d4f4c] font-semibold p-4 text-[20px] hover:bg-red-400 hover:text-white rounded-lg transition-colors"
          >
            Historial
          </Link>

          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Menú Móvil - Desplegable */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="flex flex-col gap-2 bg-white rounded-lg shadow-lg p-4">
          <Link
            to="/mascota"
            onClick={closeMenu}
            className="text-[#0d4f4c] font-semibold p-3 text-lg hover:bg-red-400 hover:text-white rounded-lg transition-colors"
          >
            Mascotas
          </Link>

          <Link
            to="/medicamentos-index"
            onClick={closeMenu}
            className="text-[#0d4f4c] font-semibold p-3 text-lg hover:bg-red-400 hover:text-white rounded-lg transition-colors"
          >
            Medicamentos
          </Link>

          <Link
            to="/Veterinarios"
            onClick={closeMenu}
            className="text-[#0d4f4c] font-semibold p-3 text-lg hover:bg-red-400 hover:text-white rounded-lg transition-colors"
          >
            Veterinarios
          </Link>

          <Link
            to="/historial"
            onClick={closeMenu}
            className="text-[#0d4f4c] font-semibold p-3 text-lg hover:bg-red-400 hover:text-white rounded-lg transition-colors"
          >
            Historial
          </Link>

          <button 
            onClick={() => {
              closeMenu();
              handleLogout();
            }}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors mt-2"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}