// servicios/authService.ts
import axios from 'axios';
import { Cliente } from '../types/Cliente';



const API_URL = 'http://localhost:8080/auth';

export async function login(email: string, clave: string): Promise<Cliente> {
    try {
        const response = await axios.post(`${API_URL}/loginCliente`, { email, clave });
        const token = response.data.jwt;

        localStorage.setItem('token', token);

        const clienteResponse = await axios.get(`${API_URL}/currentCliente`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json'
            }
        });

        const clienteLogueado: Cliente = clienteResponse.data;
        localStorage.setItem('cliente', JSON.stringify(clienteLogueado));
        // Mostrar la respuesta del servidor en la consola
        console.log('Response from login API:', response.data);
        console.log('Cliente Logueado: ', clienteLogueado);

        return clienteLogueado;
    } catch (error) {
        console.error('Error en el servicio de login:', error);
        throw new Error('Email y/o Clave incorrectos, vuelva a intentar');
    }
}

export async function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('cliente');
    // Limpiar cualquier otro estado relacionado con la sesión aquí si es necesario
}
