import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { TextField, Button, Typography, Alert, InputAdornment, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface LoginClienteProps {
    open: boolean;
    onClose: () => void;
}

const LoginCliente: React.FC<LoginClienteProps> = ({ open, onClose }) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [clave, setClave] = useState('');
    const [error, setError] = useState('');
    const [mostrarClave, setMostrarClave] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, clave);
            setError('');
            onClose(); // Cierra el Dialog al completar el login correctamente
            window.location.reload(); // Opcional: recargar la página si es necesario
        } catch (error) {
            setError('Email y/o Clave incorrectos, vuelva a intentar');
        }
    };

    const handleRegisterClick = () => {
        onClose(); // Cierra el Dialog al hacer clic en "Regístrate aquí"
        navigate('/registerCliente'); // Redirecciona a la página de registro
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Login</DialogTitle>
            <DialogContent>
                <form onSubmit={handleLogin}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="clave"
                        label="Clave"
                        type={mostrarClave ? 'text' : 'password'}
                        autoComplete="current-password"
                        value={clave}
                        onChange={(e) => setClave(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setMostrarClave(!mostrarClave)}
                                        edge="end"
                                    >
                                        {mostrarClave ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <DialogActions>
                        <Button type="submit" variant="contained" color="primary">
                            Login
                        </Button>
                        {error && <Alert severity="error">{error}</Alert>}
                    </DialogActions>
                </form>
                <Typography variant="body2" align="center">
                    ¿No tienes una cuenta?{' '}
                    <RouterLink to="/registerCliente" onClick={handleRegisterClick}>
                        Regístrate aquí
                    </RouterLink>
                </Typography>
            </DialogContent>
        </Dialog>
    );
};

export default LoginCliente;
