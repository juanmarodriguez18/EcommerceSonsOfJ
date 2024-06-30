import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Menu } from './components/E-commerce/Menu';
import Carrito from "./components/Carrito/Carrito";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import RegisterCliente from "./components/ControlAcceso/RegisterCliente";
import { RutaPrivada } from "./components/ControlAcceso/RutaPrivada";
import SucursalesPage from "./pages/SucursalesPage";



function App() {
  //Rutas de nuestra aplicacion 
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/menu/:sucursalId" element={<Menu />} />
        <Route path="/registerCliente" element={<RegisterCliente />} />
        <Route path="/sucursales/:empresaId" element={<SucursalesPage />} />

        <Route path="/carrito/:sucursalId" element={<RutaPrivada><Carrito /></RutaPrivada>} />
        

      </Routes>
    </BrowserRouter>
  )
}

export default App
