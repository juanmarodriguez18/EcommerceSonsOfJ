import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Menu } from "./components/E-commerce/Menu";
import Carrito from "./components/Carrito/Carrito";
import HomePage from "./pages/HomePage";
import RegisterCliente from "./components/ControlAcceso/RegisterCliente";
import { RutaPrivada } from "./components/ControlAcceso/RutaPrivada";
import SucursalesPage from "./pages/SucursalesPage";
import Layout from "./components/Layout/Layout";
import PedidosCliente from "./components/Pedidos/PedidosCliente";



function App() {
  //Rutas de nuestra aplicacion
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/menu/:sucursalId" element={<Menu />} />
          <Route path="/registerCliente" element={<RegisterCliente />} />
          <Route path="/sucursales/:empresaId" element={<SucursalesPage />} />
          
          <Route path="/pedidosCliente" element={<RutaPrivada><PedidosCliente /></RutaPrivada>} />
          <Route path="/carrito/:sucursalId" element={<RutaPrivada><Carrito /></RutaPrivada>}/></Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
