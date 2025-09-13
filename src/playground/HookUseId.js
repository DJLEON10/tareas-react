import { useId } from "react";

function Formulario() {
  const idEmail = useId();
  const idPassword = useId();

  return (
    <form>
      <label htmlFor={idEmail}>Correo:</label>
      <input id={idEmail} type="email" />

      <label htmlFor={idPassword}>Contraseña:</label>
      <input id={idPassword} type="password" />
    </form>
  );
}

export default Formulario;
