import axios from 'axios';

export async function getData<T>(path: string): Promise<T> {
  try {
    const response = await axios.get(`${path}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener los datos de ${path}:`, error);
    throw error;
  }
}

export async function postData<T>(path: string, data: T): Promise<T> {
  try {
    const response = await axios.post(`${path}`, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al enviar los datos a ${path}:`, error);
    throw error;
  }
}

export async function putData<T>(path: string, data: T): Promise<T> {
  try {
    const response = await axios.put(`${path}`, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar los datos en ${path}:`, error);
    throw error;
  }
}

export async function deleteData(path: string) {
  try {
    const response = await axios.delete(`${path}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar los datos en ${path}:`, error);
    throw error;
  }
}

export const eliminarEntidad = async (id: number, path: string) => {
  try {
    const response = await axios.patch(`${path}/${id}`, { eliminado: true });
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar lógicamente la entidad en ${path}:`, error);
    throw error;
  }
};

export const recuperarEntidad = async (id: number, path: string) => {
  try {
    const response = await axios.patch(`${path}/${id}`, { eliminado: false });
    return response.data;
  } catch (error) {
    console.error(`Error al recuperar la entidad en ${path}:`, error);
    throw error;
  }
};
