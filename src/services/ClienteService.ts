// src/services/ClienteService.ts
import axios from 'axios';

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