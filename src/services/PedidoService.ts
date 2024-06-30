import axios from "axios";
import { Pedido } from "../types/Pedido";
import { Factura } from "../types/Factura";

const urlPedidos = 'http://localhost:8080/pedidos';

// Función para guardar un pedido en la base de datos
export async function guardarPedidoEnBD(pedido: Pedido): Promise<void> {
    try {
        const response = await fetch(urlPedidos, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(pedido) // Enviar el objeto Pedido convertido a JSON
        });
        if (!response.ok) {
            throw new Error('Error al guardar el pedido');
        }
    } catch (error) {
        console.error('Error en guardarPedidoEnBD:', error);
        throw new Error('Error al guardar el pedido. Por favor, inténtalo de nuevo más tarde.');
    }
}

// Función para obtener todos los pedidos desde la base de datos
export async function getAllPedidos(): Promise<Pedido[]> {
    try {
        const response = await fetch(urlPedidos, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        if (!response.ok) {
            throw new Error('Error al obtener los pedidos');
        }
        const data: Pedido[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error en getAllPedidos:', error);
        throw new Error('Error al obtener los pedidos. Por favor, inténtalo de nuevo más tarde.');
    }
}

// Función para obtener un pedido por su ID
export async function getPedidoById(id: number): Promise<Pedido | null> {
    try {
        const response = await fetch(`${urlPedidos}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        if (!response.ok) {
            throw new Error('Pedido no encontrado');
        }
        const pedido: Pedido = await response.json();
        return pedido;
    } catch (error) {
        console.error(`Error al obtener el pedido con ID ${id}:`, error);
        return null;
    }
}

export const actualizarPedido = async (id: number, datosActualizados: any) => {
    try {
      const response = await axios.put(`${urlPedidos}/${id}`, datosActualizados);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar un pedido:", error);
      throw error;
    }
  };

export const facturarPedido = async (pedido: Pedido, email: string) => {
    try {
        const factura: Factura = new Factura(
            0, false, new Date(), pedido.formaPago, pedido.total, pedido
        );

        const response = await fetch(`http://localhost:8080/facturacion/emitir?emailCliente=${email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(factura)
        });

        return response.json;
    } catch(error) {
        console.log(error);
    }
}
  
