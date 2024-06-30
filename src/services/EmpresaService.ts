import axios from 'axios';
import { Empresa } from '../types/Empresa';

const API_URL = 'http://localhost:8080/empresas';

export const getEmpresas = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching empresas:", error);
    throw error;
  }
};

export const getEmpresaById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching empresa con ID ${id}:`, error);
    throw error;
  }
};

export const crearEmpresa = async (nuevaEmpresa: Empresa) => {
  try {
    const response = await axios.post(API_URL, nuevaEmpresa);
    return response.data;
  } catch (error) {
    console.error("Error al crear una empresa:", error);
    throw error;
  }
};

export const eliminarEmpresa = async (id: number) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}/eliminar`, { eliminado: true });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar lógicamente una empresa:", error);
    throw error;
  }
};

export const actualizarEmpresa = async (id: number, datosActualizados: Empresa) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, datosActualizados);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar una empresa:", error);
    throw error;
  }
};

export const recuperarEmpresa = async (id: number) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}/recuperar`, { eliminado: false });
    return response.data;
  } catch (error) {
    console.error("Error al recuperar una empresa:", error);
    throw error;
  }
};

export const subirImagenEmpresa = async (id: number, imagen: File) => {
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
    console.error(`Error al subir imagen para la empresa con ID ${id}:`, error);
    throw error;
  }
};
  
export const eliminarImagenEmpresa = async (id: number, imagenId: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}/imagen/${imagenId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar imagen para la empresa con ID ${id}:`, error);
    throw error;
  }
};
