import axios from 'axios';
import { Sucursal } from '../types/Sucursal';

const API_URL = 'http://localhost:8080/sucursales';

export const getSucursales = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching sucursales:", error);
    throw error;
  }
};

export const getSucursalById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching sucursal con ID ${id}:`, error);
    throw error;
  }
};

export const getManufacturadosBySucursalId = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}/articulosManufacturados`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching manufacturados de sucursal: ${id}:`, error);
    throw error;
  }
};

export const getInsumosBySucursalId = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}/articulosInsumos`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching insumos de sucursal: ${id}:`, error);
    throw error;
  }
};

export const crearSucursal2 = async (nuevaSucursal: Sucursal) => {
  try {
    const response = await axios.post(API_URL, nuevaSucursal);
    return response.data;
  } catch (error) {
    console.error("Error al crear una sucursal:", error);
    throw error;
  }
};

export const crearSucursal = async (sucursal: Sucursal): Promise<Sucursal> => {
  try {
      const response = await axios.post<Sucursal>(API_URL, sucursal);
      return response.data;
  } catch (error) {
      console.error('Error al crear una sucursal:', error);
      throw error;
  }
};

export const eliminarSucursal = async (id: number) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}/eliminar`, { eliminado: true });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar lógicamente una sucursal:", error);
    throw error;
  }
};

export const actualizarSucursal = async (id: number, datosActualizados: Sucursal) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, datosActualizados);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar una sucursal:", error);
    throw error;
  }
};

export const recuperarSucursal = async (id: number) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}/recuperar`, { eliminado: false });
    return response.data;
  } catch (error) {
    console.error("Error al recuperar una sucursal:", error);
    throw error;
  }
};

export const subirImagenSucursal = async (id: number, imagen: File) => {
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
    console.error(`Error al subir imagen para la sucursal con ID ${id}:`, error);
    throw error;
  }
};
  
export const eliminarImagenSucursal = async (id: number, imagenId: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}/imagen/${imagenId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar imagen para la sucursal con ID ${id}:`, error);
    throw error;
  }
};
