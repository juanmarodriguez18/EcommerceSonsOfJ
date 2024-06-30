import { useContext } from "react"
import { CartContext } from "./CarritoContext"
import { PedidoDetalle } from "../../types/PedidoDetalle"; // Asegúrate de importar PedidoDetalle

export const useCarrito = () => {
    const context = useContext(CartContext)
  
    if (context === undefined) {
      throw new Error('useCarrito debe ser usado dentro del ámbito de un CartProvider')
    }
  
    // Convertir cart de CartItem[] a PedidoDetalle[]
    const cart = context.cart.map(item => new PedidoDetalle(0, false, item.cantidad, item.articulo.precioVenta * item.cantidad, item.articulo));
  
    return {
      ...context,
      cart,
    }
}
