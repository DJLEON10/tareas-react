import React from "react";
import { useActionState } from "react";

async function sendForm(prevState, formData) {
  await new Promise((r) => setTimeout(r, 1500));
  const nombre = formData.get("nombre");
  if (!nombre) {
    return " Debes escribir un nombre";
  }
  return ` Hola ${nombre}, formulario enviado con éxito!`;
}

export default function HookUseActionState() {
  const [mensaje, formAction] = useActionState(sendForm, null);

  return (
    <form action={formAction}>
      <input name="nombre" placeholder="Escribe tu nombre" />
      <button type="submit">Enviar</button>
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
}
