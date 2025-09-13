import React from "react";
import { useFormStatus } from "react-dom";

function BotonEnviar() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Enviando..." : "Enviar"}
    </button>
  );
}

export default function HookUseFormStatus() {
  async function handleSubmit(formData) {
    await new Promise((r) => setTimeout(r, 2000));
    console.log("Formulario enviado:", Object.fromEntries(formData));
  }

  return (
    <form action={handleSubmit}>
      <input name="nombre" placeholder="Escribe tu nombre" />
      <BotonEnviar />
    </form>
  );
}
