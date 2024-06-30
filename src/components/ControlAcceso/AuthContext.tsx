import React, { createContext, useContext, useState, useEffect } from 'react';
import { login, logout } from '../../services/AuthService';
import { Cliente } from '../../types/Cliente';


interface AuthContextType {
    isLoggedIn: boolean;
    cliente: Cliente | null;
    login: (email: string, clave: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cliente, setCliente] = useState<Cliente | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            const clienteLocalStorage = localStorage.getItem('cliente');
            if (clienteLocalStorage) {
                setCliente(JSON.parse(clienteLocalStorage));
            }
        }
    }, []);

    const handleLogin = async (email: string, clave: string) => {
        try {
            const clienteLogueado = await login(email, clave);
            setIsLoggedIn(true);
            setCliente(clienteLogueado);
            localStorage.setItem('cliente', JSON.stringify(clienteLogueado));
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            throw new Error('Email y/o Clave incorrectos, vuelva a intentar');
        }
    };

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
        setCliente(null);
        localStorage.removeItem('cliente');
    };

    const contextValue = {
        isLoggedIn,
        cliente,
        login: handleLogin,
        logout: handleLogout,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
