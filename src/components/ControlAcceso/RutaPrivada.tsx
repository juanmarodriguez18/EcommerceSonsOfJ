import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../ControlAcceso/AuthContext';

export const RutaPrivada = ({ children }: { children: React.ReactNode }) => {
    const { isLoggedIn } = useAuth();

    return isLoggedIn ? <>{children}</> : <Navigate to='/' />;
};