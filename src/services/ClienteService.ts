// src/services/ClienteService.ts
import axios from 'axios';
import { Pedido } from '../types/Pedido';

const API_URL = 'http://localhost:8080/clientes';

export const getClientes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching clientes:", error);
    throw error;
  }
};

export const getPedidosByClienteId = async (clienteId: number): Promise<Pedido[]> => {
  try {
    const response = await axios.get(`${API_URL}/${clienteId}/pedidos`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching pedidos para cliente con ID ${clienteId}:`, error);
    throw error;
  }
};
