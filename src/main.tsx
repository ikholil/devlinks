import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@tabler/icons-webfont/dist/tabler-icons.min.css";
import { SnackbarProvider } from "notistack";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </StrictMode>
);
