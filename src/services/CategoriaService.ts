// src/services/api.ts
import axios from 'axios';
import { Categoria } from '../types/Categoria';

const API_URL = 'http://localhost:8080/categorias';

// Función para obtener todas las categorías
export const getCategorias = async (): Promise<Categoria[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching categorias:", error);
    throw error;
  }
};

// Función para obtener una categoría por su ID
export const getCategoriaById = async (id: number): Promise<Categoria> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching categoria con ID ${id}:`, error);
    throw error;
  }
};

// Función para crear una nueva categoría
export const crearCategoria = async (nuevaCategoria: any): Promise<Categoria> => {
  try {
    const response = await axios.post<Categoria>(API_URL, nuevaCategoria);
    return response.data;
  } catch (error) {
    console.error("Error al crear una categoria:", error);
    throw error;
  }
};

// Función para eliminar lógicamente una categoría
export const eliminarCategoria = async (id: number): Promise<void> => {
  try {
    const response = await axios.patch(`${API_URL}/${id}/eliminar`, { eliminado: true });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar lógicamente una categoria:", error);
    throw error;
  }
};

export const recuperarCategoria = async (id: number) => {
  try {
      const response = await axios.patch(`${API_URL}/${id}/recuperar`, { eliminado: false });
      return response.data;
  } catch (error) {
      console.error("Error al recuperar una categoria:", error);
      throw error;
  }
};

// Función para actualizar una categoría
export const actualizarCategoria = async (id: number, datosActualizados: any): Promise<Categoria> => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, datosActualizados);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar una categoria:", error);
    throw error;
  }
};

