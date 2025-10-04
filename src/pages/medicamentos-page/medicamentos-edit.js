import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function MedicamentosEdit() {
  const [formData, setFormData] = useState({
    nombre: "",
    cantidad: "",
    tipoMedicamento: "",
    formaFarmaceutica: "",
    estado:""
  });

  console.log("aca estoy hpta")
  const { id } = useParams(); // 👈 Obtener ID del medicamento desde la URL
  const navigate = useNavigate();

  // 🔄 Cargar datos del medicamento al montar el componente
  useEffect(() => {
    const obtenerMedicamento = async () => {
      try {
        const docRef = doc(db, "medicamentos", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFormData(docSnap.data());
        } else {
          Swal.fire("Error", "Medicamento no encontrado", "error");
          navigate("/medicamentos-index");
        }
      } catch (error) {
        console.error("❌ Error al obtener medicamento:", error);
        Swal.fire("Error", "No se pudieron cargar los datos", "error");
      }
    };

    obtenerMedicamento();
  }, [id, navigate]);

  // 📤 Actualizar medicamento en Firebase
  const actualizarMedicamento = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, "medicamentos", id);
      await updateDoc(docRef, {
        nombre: formData.nombre,
        cantidad: formData.cantidad,
        tipoMedicamento: formData.tipoMedicamento,
        formaFarmaceutica: formData.formaFarmaceutica,
        estado : formData.estado
      });

      Swal.fire("✅ Éxito", "Medicamento actualizado correctamente", "success");
      navigate("/medicamentos-index");
    } catch (error) {
      console.error("❌ Error al actualizar medicamento:", error);
      Swal.fire("Error", "No se pudo actualizar el medicamento", "error");
    }
  };

  // ✏️ Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#e8f5f2] to-[#cde7e2] p-4">
      <div
        className="
          w-full max-w-md
          bg-white/90 
          p-10 
          rounded-2xl 
          border border-[#7bc4b8]/30 
          backdrop-blur-md 
          shadow-[0_8px_30px_rgba(0,0,0,0.15)] 
          hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)] 
          transition-all 
          duration-300 
          transform 
          hover:scale-[1.02] 
          hover:-translate-y-1
        "
      >
        <div className="flex flex-col items-center text-center">
          <img
            src="/asset/logo.png"
            alt="Logo"
            className="w-[180px] mb-4"
          />
          <h1 className="text-2xl font-bold text-[#0d4f4c] mb-6">
            Editar Medicamento
          </h1>

          <form onSubmit={actualizarMedicamento} className="w-full space-y-4">
            <div>
              <label className="flex text-[#0d4f4c] font-medium mb-1">Nombre</label>
              <input
                type="text"
                required
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                className="w-full p-2 rounded-md border border-[#2d7a6b] focus:outline-none focus:border-[#4a9d8e] focus:ring-1 focus:ring-[#7bc4b8]"
              />
            </div>

            <div>
              <label className="flex text-[#0d4f4c] font-medium mb-1">Cantidad</label>
              <input
                type="number"
                required
                name="cantidad"
                value={formData.cantidad}
                onChange={handleChange}
                placeholder="Cantidad"
                className="w-full p-2 rounded-md border border-[#2d7a6b] focus:outline-none focus:border-[#4a9d8e] focus:ring-1 focus:ring-[#7bc4b8]"
              />
            </div>

            <div>
              <label className="flex text-[#0d4f4c] font-medium mb-1">Tipo de Medicamento</label>
              <select
                name="tipoMedicamento"
                value={formData.tipoMedicamento}
                onChange={handleChange}
                className="w-full p-2 rounded-md border border-[#2d7a6b] focus:outline-none focus:border-[#4a9d8e] focus:ring-1 focus:ring-[#7bc4b8]"
              >
                <option value="">Selecciona un tipo</option>
                <option value="antibióticos">Antibióticos</option>
                <option value="antiparasitarios">Antiparasitarios</option>
                <option value="antiinflamatorios">Antiinflamatorios</option>
                <option value="analgésicos">Analgésicos</option>
                <option value="antifúngicos">Antifúngicos</option>
                <option value="antivirales">Antivirales</option>
                <option value="vacunas">Vacunas</option>
                <option value="vitaminas/suplementos">Vitaminas y suplementos</option>
                <option value="sedantes/anestésicos">Sedantes y anestésicos</option>
                <option value="inmunoestimulantes">Inmunoestimulantes</option>
                <option value="cardiovasculares">Cardiovasculares</option>
                <option value="respiratorios">Respiratorios</option>
                <option value="gastrointestinales">Gastrointestinales</option>
                <option value="hormonales/reproductivos">Hormonales y reproductivos</option>
                <option value="dermatológicos">Dermatológicos</option>
                <option value="Oftálmicos/óticos">Oftálmicos y óticos</option>
                <option value="Suero/fluidoterapia">Suero y fluidoterapia</option>
              </select>
            </div>
            <div>
              <label className="flex text-[#0d4f4c] font-medium mb-1">Estado</label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="w-full p-2 rounded-md border border-[#2d7a6b] focus:outline-none focus:border-[#4a9d8e] focus:ring-1 focus:ring-[#7bc4b8]"
              >
                <option value="">Selecciona un tipo</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
                
              </select>
            </div>

            <div>
              <label className="flex text-[#0d4f4c] font-medium mb-1">Forma Farmacéutica</label>
              <input
                type="text"
                required
                name="formaFarmaceutica"
                value={formData.formaFarmaceutica}
                onChange={handleChange}
                placeholder="Forma Farmacéutica"
                className="w-full p-2 rounded-md border border-[#2d7a6b] focus:outline-none focus:border-[#4a9d8e] focus:ring-1 focus:ring-[#7bc4b8]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#2d7a6b] text-white py-2 rounded-md hover:bg-[#0d4f4c] transition duration-300"
            >
              Guardar Cambios
            </button>

            <Link
              to="/medicamentos-index"
              className="bg-red-700 py-2 w-full transition duration-300 mt-1 flex justify-center items-center rounded-md text-white"
            >
              Regresar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
