import { ReactNode, createContext, useEffect, useState } from 'react';
import { ArticuloManufacturado } from '../../types/ArticuloManufacturado';
import { Cliente } from '../../types/Cliente';
import { Empleado } from '../../types/Empleado';
import { Sucursal } from '../../types/Sucursal';
import { PedidoDetalle } from '../../types/PedidoDetalle'; // Asegúrate de importar PedidoDetalle
import { ArticuloInsumo } from '../../types/ArticuloInsumo';

interface CartContextType {
  cart: PedidoDetalle[]; // Cambiar el tipo a PedidoDetalle
  addCarrito: (product: ArticuloManufacturado | ArticuloInsumo) => void;
  removeCarrito: (product: ArticuloManufacturado | ArticuloInsumo) => void;
  removeItemCarrito: (product: ArticuloManufacturado | ArticuloInsumo) => void;
  limpiarCarrito: () => void;
  updateCarrito: (articulo: ArticuloManufacturado | ArticuloInsumo, cantidad: number) => void;
  totalPedido?: number;
  cliente?: Cliente | null;
  empleado?: Empleado | null;
  sucursal?: Sucursal | null;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addCarrito: () => {},
  removeCarrito: () => {},
  removeItemCarrito: () => {},
  limpiarCarrito: () => {},
  updateCarrito: () => {},
  totalPedido: 0,
  cliente: null,
  empleado: null,
  sucursal: null,
});

export function CarritoContextProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<PedidoDetalle[]>([]);
  const [totalPedido, setTotalPedido] = useState<number>(0);
  const [cliente, ] = useState<Cliente | null>(null);
  const [empleado, ] = useState<Empleado | null>(null);
  const [sucursal, ] = useState<Sucursal | null>(null);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    calcularTotalCarrito();
  }, [cart]);

  const addCarrito = (product: ArticuloManufacturado | ArticuloInsumo) => {
    const existingItemIndex = cart.findIndex(item => item.articulo.id === product.id);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].cantidad += 1;
      setCart(updatedCart);
    } else {
      setCart(prevCart => [...prevCart, new PedidoDetalle(0, false, 1, product.precioVenta, product)]);
    }
  };

  const updateCarrito = (articulo: ArticuloManufacturado | ArticuloInsumo, cantidad: number) => {
    setCart(prevCarrito => {
      if (cantidad <= 0) {
        return prevCarrito.filter(item => item.articulo.id !== articulo.id);
      }
      return prevCarrito.map(item =>
        item.articulo.id === articulo.id ? new PedidoDetalle(0, false, cantidad, articulo.precioVenta * cantidad, articulo) : item
      );
    });
  };

  const removeCarrito = (product: ArticuloManufacturado | ArticuloInsumo) => {
    setCart(prevCart => prevCart.filter(item => item.articulo.id !== product.id));
  };

  const removeItemCarrito = (product: ArticuloManufacturado | ArticuloInsumo) => {
    const existingItem = cart.find(item => item.articulo.id === product.id);
    if (existingItem) {
      if (existingItem.cantidad > 1) {
        const updatedCart = cart.map(item => {
          if (item.articulo.id === product.id) {
            return new PedidoDetalle(0, false, item.cantidad - 1, item.articulo.precioVenta * (item.cantidad - 1), item.articulo);
          }
          return item;
        });
        setCart(updatedCart);
      } else {
        setCart(prevCart => prevCart.filter(item => item.articulo.id !== product.id));
      }
    }
  };

  const limpiarCarrito = () => {
    setCart([]);
  };

  const calcularTotalCarrito = () => {
    let total = 0;
    cart.forEach(item => {
      total += item.articulo.precioVenta * item.cantidad;
    });
    setTotalPedido(total);
  };

  return (
    <CartContext.Provider value={{ cart, addCarrito, updateCarrito, limpiarCarrito, removeCarrito, removeItemCarrito, totalPedido, cliente, empleado, sucursal }}>
      {children}
    </CartContext.Provider>
  );
}
