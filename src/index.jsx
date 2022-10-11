import react from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <react.StrictMode>
    <App />
  </react.StrictMode>
);
