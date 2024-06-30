// src/services/api.ts
import axios from 'axios';
//import { ArticuloInsumo } from '../types/ArticuloInsumo';

const API_URL = 'http://localhost:8080/insumos';

export const getInsumos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching insumos:", error);
    throw error;
  }
};

export const getInsumoById = async (id: number) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching artículo manufacturado con ID ${id}:`, error);
      throw error;
    }
  };
  
export const crearInsumo = async (nuevoInsumo: any) => {
    try {
      const response = await axios.post(API_URL, nuevoInsumo);
      return response.data;
    } catch (error) {
      console.error("Error al crear un insumo:", error);
      throw error;
    }
  }; 
  
  export const eliminarInsumo = async (id: number) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}/eliminar`, { eliminado: true });
      return response.data;
    } catch (error) {
      console.error("Error al eliminar lógicamente un artículo manufacturado:", error);
      throw error;
    }
  };

  export const recuperarInsumo = async (id: number) => {
    try {
        const response = await axios.patch(`${API_URL}/${id}/recuperar`, { eliminado: false });
        return response.data;
    } catch (error) {
        console.error("Error al recuperar un insumo:", error);
        throw error;
    }
};
  
  export const actualizarInsumo = async (id: number, datosActualizados: any) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, datosActualizados);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar un insumo:", error);
      throw error;
    }
  };

 /* export const crearInsumo = async (nuevoInsumo: any) => {
    try {
      console.log('Datos a enviar:', JSON.stringify(nuevoInsumo, null, 2)); // Verificar los datos antes de enviar
      const response = await axios.post(API_URL, nuevoInsumo, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al crear un insumo:", error);
      throw error;
    }
  };*/

  /*export async function crearInsumo(nuevoInsumo: ArticuloInsumo): Promise<ArticuloInsumo> {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(nuevoInsumo) // Enviar el objeto nuevoInsumo convertido a JSON
        });
        if (!response.ok) {
            throw new Error('Error al crear el insumo');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en crearInsumo:', error);
        throw new Error('Error al crear el insumo. Por favor, inténtalo de nuevo más tarde.');
    }
}*/


  