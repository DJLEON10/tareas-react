import { useSyncExternalStore } from "react";

function subscribe(callback) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  return localStorage.getItem("tema") || "light";
}

function App() {
  const tema = useSyncExternalStore(subscribe, getSnapshot);

  return <h1>Tema actual: {tema}</h1>;
}

export default App;
