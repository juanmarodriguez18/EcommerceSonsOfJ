import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CarritoContextProvider } from './components/Carrito/CarritoContext.tsx'
import { AuthProvider } from './components/ControlAcceso/AuthContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <CarritoContextProvider>
        <App />
      </CarritoContextProvider>
    </AuthProvider>
  </React.StrictMode>,
)
