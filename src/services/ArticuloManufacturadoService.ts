// src/services/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:8080/articulos-manufacturados';

export const getArticulosManufacturados = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching artículos manufacturados:", error);
    throw error;
  }
};

export const getArticuloManufacturadoById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching artículo manufacturado con ID ${id}:`, error);
    throw error;
  }
};

export const crearArticuloManufacturado = async (nuevoArticulo: any) => {
  try {
    const response = await axios.post(API_URL, nuevoArticulo);
    return response.data;
  } catch (error) {
    console.error("Error al crear un artículo manufacturado:", error);
    throw error;
  }
};

export const eliminarArticuloManufacturado = async (id: number) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}/eliminar`, { eliminado: true });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar lógicamente un artículo manufacturado:", error);
    throw error;
  }
};

export const actualizarArticuloManufacturado = async (id: number, datosActualizados: any) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, datosActualizados);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar un artículo manufacturado:", error);
    throw error;
  }
};

export const recuperarManufacturado = async (id: number) => {
  try {
      const response = await axios.patch(`${API_URL}/${id}/recuperar`, { eliminado: false });
      return response.data;
  } catch (error) {
      console.error("Error al recuperar un artículo manufacturado:", error);
      throw error;
  }
};

export const actualizarManufacturado = async (id: number, datosActualizados: any) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, datosActualizados);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar un artículo manufacturado:", error);
    throw error;
  }
};


