import axios from 'axios';
import { Promocion } from '../types/Promocion';

const API_URL = 'http://localhost:8080/promociones';

export const getPromociones = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching promociones:", error);
    throw error;
  }
};

export const getPromocionById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching promocion con ID ${id}:`, error);
    throw error;
  }
};

export const crearPromocion = async (nuevaPromocion: Promocion) => {
  try {
    const response = await axios.post(API_URL, nuevaPromocion);
    return response.data;
  } catch (error) {
    console.error("Error al crear una promoción:", error);
    throw error;
  }
};

export const eliminarPromocion = async (id: number) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}/eliminar`, { eliminado: true });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar lógicamente una promoción:", error);
    throw error;
  }
};

export const actualizarPromocion = async (id: number, datosActualizados: Promocion) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, datosActualizados);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar una promoción:", error);
    throw error;
  }
};

export const recuperarPromocion = async (id: number) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}/recuperar`, { eliminado: false });
    return response.data;
  } catch (error) {
    console.error("Error al recuperar una promoción:", error);
    throw error;
  }
};

export const subirImagenPromocion = async (id: number, imagen: File) => {
  try {
    const formData = new FormData();
    formData.append('imagen', imagen);
    const response = await axios.post(`${API_URL}/${id}/imagen`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al subir imagen para la promoción con ID ${id}:`, error);
    throw error;
  }
};

export const eliminarImagenPromocion = async (id: number, imagenId: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}/imagen/${imagenId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar imagen para la promoción con ID ${id}:`, error);
    throw error;
  }
};
