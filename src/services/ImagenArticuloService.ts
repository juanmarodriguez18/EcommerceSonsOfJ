// src/services/api.ts
import axios from 'axios';
import { ImagenArticulo } from '../types/ImagenArticulo';

const API_URL = 'http://localhost:8080/imagen-articulo';

export const crearImagenArticulo = async (nuevaImagen: any): Promise<ImagenArticulo> => {
  try {
      const response = await axios.post<ImagenArticulo>(API_URL, nuevaImagen);
      return response.data;
  } catch (error) {
      console.error("Error al crear una imagen:", error);
      throw error;
  }
};

export const getImagenesArticulo = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching imagenes:", error);
    throw error;
  }
};

export const getImagenArticuloById = async (id: number) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching imagen articulo con ID ${id}:`, error);
      throw error;
    }
  };
  
  
  
  export const eliminarImagenArticulo = async (id: number) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, { eliminado: true });
      return response.data;
    } catch (error) {
      console.error("Error al eliminar lógicamente una imagen articulo:", error);
      throw error;
    }
  };
  
  export const actualizarImagenArticulo = async (id: number, datosActualizados: any) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, datosActualizados);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar una imagen articulo:", error);
      throw error;
    }
  };