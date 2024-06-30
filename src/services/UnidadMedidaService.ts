// src/services/UnidadMedidaService.ts
import axios from 'axios';

const API_URL = 'http://localhost:8080/unidad-medida';

export const getUnidadesMedida = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching unidades de medida:", error);
    throw error;
  }
};

export const getUnidadMedidaById = async (id: number) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching unidad medida con ID ${id}:`, error);
      throw error;
    }
  };
  
  export const crearUnidadMedida = async (nuevaUnidadMedida: any) => {
    try {
        const response = await axios.post(API_URL, JSON.stringify(nuevaUnidadMedida), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al crear una unidad de medida:", error);
        throw error;
    }
};
  
  export const eliminarUnidadMedida = async (id: number) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}/eliminar`, { eliminado: true });
      return response.data;
    } catch (error) {
      console.error("Error al eliminar lógicamente una unidad medida:", error);
      throw error;
    }
  };

  export const recuperarUnidadMedida = async (id: number) => {
    try {
        const response = await axios.patch(`${API_URL}/${id}/recuperar`, { eliminado: false });
        return response.data;
    } catch (error) {
        console.error("Error al recuperar una unidad de medida:", error);
        throw error;
    }
  };
  
  export const actualizarUnidadMedida = async (id: number, datosActualizados: any) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, datosActualizados);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar una unidad de medida:", error);
      throw error;
    }
  };