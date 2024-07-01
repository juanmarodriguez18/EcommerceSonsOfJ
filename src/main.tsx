import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CarritoContextProvider } from "./components/Carrito/CarritoContext.tsx";
import { AuthProvider } from "./components/ControlAcceso/AuthContext.tsx";
import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <CarritoContextProvider>
        <CssBaseline>
          <App />
        </CssBaseline>
      </CarritoContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
