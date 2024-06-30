// src/services/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:8080/articulos-detalle';

export const crearArticuloManufacturadoDetalle = async (nuevoDetalle: any) => {
  try {
    const response = await axios.post(API_URL, nuevoDetalle);
    return response.data;
  } catch (error) {
    console.error("Error al crear un Detalle:", error);
    throw error;
  }
};

export const getArticulosManufacturadosDetalle = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching Detalles:", error);
    throw error;
  }
};

export const getArticuloManufacturadoDetalleById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Detalle con ID ${id}:`, error);
    throw error;
  }
};



export const eliminarArticuloManufacturadoDetalle = async (id: number) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, { eliminado: true });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar lógicamente un artículo manufacturado:", error);
    throw error;
  }
};

export const actualizarArticuloManufacturadoDetalle = async (id: number, datosActualizados: any) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, datosActualizados);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar un artículo manufacturado:", error);
    throw error;
  }
};

export async function obtenerUltimoId(): Promise<number> {
  try {
      const response = await axios.get<number>(`${API_URL}/ultimoId`);
      return response.data;
  } catch (error) {
      console.error('Error al obtener el último id:', error);
      throw error;
  }
}

