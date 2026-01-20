import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/global.css";

const rootEl = document.getElementById("root");

if (!rootEl) {
  // Fail loudly if the preview environment doesn't provide #root.
  // This prevents a "blank screen" with no signal.
  // eslint-disable-next-line no-console
  console.error("Asistente Mia: no se encontró el elemento #root para montar la app.");
  const fallback = document.createElement("div");
  fallback.style.padding = "16px";
  fallback.style.fontFamily = "system-ui, -apple-system, Segoe UI, Roboto, Arial";
  fallback.innerText = "Error: no se encontró el contenedor #root para montar la app.";
  document.body.appendChild(fallback);
} else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootEl
  );
}
