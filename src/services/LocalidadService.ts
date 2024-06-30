// src/services/LocalidadService.ts
import axios from 'axios';
import { Localidad } from '../types/Localidad';


const API_URL = 'http://localhost:8080/localidades';

// Función para obtener todas las categorías
export const getLocalidades = async (): Promise<Localidad[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching localidades:", error);
    throw error;
  }
};