import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  return (
    <div className=" justify-left p-8">
      <div className="flex justify-between items-center p-4">
        <img src="/asset/logo.png" alt="Logo" className="w-[180px]" />

        <div className="flex gap-x-4">
          <button className="hover:bg-red-400">
            <Link
              to="/mascota"
              className="text-[#0d4f4c] font-semibold p-4 text-[20px]"
            >
              Mascotas
            </Link>
          </button>

          <button className="hover:bg-red-400">
            <Link
              to="/medicamentos"
              className="text-[#0d4f4c] font-semibold p-4 text-[20px]"
            >
              Medicamentos
            </Link>
          </button>

          <button className="hover:bg-red-400">
            <Link
              to="/medicamentos-index"
              className="text-[#0d4f4c] font-semibold p-4 text-[20px]"
            >
              Medicamentoss
            </Link>
          </button>

          <button className="hover:bg-red-400">
            <Link
              to="/Veterinarios"
              className="text-[#0d4f4c] font-semibold p-4 text-[20px]"
            >
              Veterinarios
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
