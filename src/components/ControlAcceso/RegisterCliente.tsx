import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box, Alert, IconButton, InputAdornment, MenuItem, Grid } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { getLocalidades } from '../../services/LocalidadService';
import { Localidad } from '../../types/Localidad';
import { Domicilio } from '../../types/Domicilio';
import { Delete as DeleteIcon } from '@mui/icons-material';

const API_URL = 'http://localhost:8080/auth/registerCliente';

const RegisterCliente: React.FC = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [clave, setClave] = useState('');
    const [confirmarClave, setConfirmarClave] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [domicilios, setDomicilios] = useState<Domicilio[]>([])
    const [localidades, setLocalidades] = useState<Localidad[]>([]);
    const [mensaje, setMensaje] = useState('');
    const [mostrarClave, setMostrarClave] = useState(false);
    const [mostrarConfirmarClave, setMostrarConfirmarClave] = useState(false);

    useEffect(() => {
        const fetchLocalidades = async () => {
            try {
                const data = await getLocalidades();
                setLocalidades(data);
            } catch (error) {
                console.error("Error fetching localidades:", error);
            }
        };
        fetchLocalidades();
    }, []);

    const addDomicilio = () => {
        setDomicilios([...domicilios, { id: 0, eliminado: false, calle: '', numero: 0, cp: 0, piso: 0, nroDpto: 0, localidad: new Localidad() }]);
    };

    const handleLocalidadChange = (index: number, localidadId: number) => {
        const selectedLocalidad = localidades.find(localidad => localidad.id === localidadId);

        // Verifica si se encontró la localidad
        if (selectedLocalidad) {
            const updatedDomicilios = domicilios.map((domicilio, i) =>
                i === index ? { ...domicilio, localidad: selectedLocalidad } : domicilio
            );
            setDomicilios(updatedDomicilios);
        } else {
            // Maneja el caso donde no se encontró la localidad
            console.warn(`Localidad con ID ${localidadId} no encontrada.`);
        }
    };

    const handleDomicilioChange = (index: number, field: string, value: string) => {
        const newDomicilios = domicilios.map((domicilio, i) => (
            i === index ? { ...domicilio, [field]: value } : domicilio
        ));
        setDomicilios(newDomicilios);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (clave !== confirmarClave) {
            setMensaje('Las contraseñas no coinciden');
            return;
        }
        try {
            // Crear el cliente con los domicilios
            const cliente = {
                nombre,
                apellido,
                telefono,
                email,
                clave,
                fechaNacimiento,
                domicilios,
            };

            const response = await axios.post(API_URL, cliente);

            // Verificar el estado de la respuesta
            if (response.status === 201) { // 201 Created
                alert('Cliente registrado exitosamente');
                navigate('/'); // Redirige a home
            } else {
                setMensaje('Error inesperado al registrar el cliente');
            }

            // Acceder a los datos de la respuesta
            console.log('Datos de la respuesta:', response.data);

        } catch (error) {
            // Manejar errores específicos de Axios
            if (axios.isAxiosError(error)) {
                console.error('Error de Axios:', error.response?.data);
                setMensaje('Error de Axios al registrar el cliente');
            } else {
                console.error('Error desconocido:', error);
                setMensaje('Error al registrar el cliente');
            }
        }
    };

    const eliminarDomicilio = (index: number) => {
        const newDomicilios = domicilios.filter((_, i) => i !== index);
        setDomicilios(newDomicilios);
    };

    return (
        <Container component="main" maxWidth="md">
            <Typography component="h1" variant="h5" align="center" gutterBottom>
                Registro de Cliente
            </Typography>
            <Box component="form" onSubmit={handleRegister} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="nombre"
                            label="Nombre"
                            name="nombre"
                            autoComplete="nombre"
                            autoFocus
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="apellido"
                            label="Apellido"
                            name="apellido"
                            autoComplete="apellido"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="telefono"
                            label="Teléfono"
                            name="telefono"
                            autoComplete="telefono"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="clave"
                            label="Clave"
                            type={mostrarClave ? 'text' : 'password'}
                            id="clave"
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
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirmarClave"
                            label="Confirmar Clave"
                            type={mostrarConfirmarClave ? 'text' : 'password'}
                            id="confirmarClave"
                            value={confirmarClave}
                            onChange={(e) => setConfirmarClave(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle confirm password visibility"
                                            onClick={() => setMostrarConfirmarClave(!mostrarConfirmarClave)}
                                            edge="end"
                                        >
                                            {mostrarConfirmarClave ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="fechaNacimiento"
                            label="Fecha de Nacimiento"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={fechaNacimiento}
                            onChange={(e) => setFechaNacimiento(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={addDomicilio} // Función para agregar un nuevo domicilio
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Agregar Domicilio
                        </Button>
                    </Grid>

                    {domicilios.map((domicilio, index) => (
                        <Grid container spacing={1} key={index} sx={{ mb: 2 }} alignItems="center">
                            <Grid item xs={5}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Calle"
                                    value={domicilio.calle}
                                    onChange={(e) => handleDomicilioChange(index, 'calle', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Número"
                                    value={domicilio.numero}
                                    onChange={(e) => handleDomicilioChange(index, 'numero', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Código Postal"
                                    value={domicilio.cp}
                                    onChange={(e) => handleDomicilioChange(index, 'cp', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Piso"
                                    value={domicilio.piso}
                                    onChange={(e) => handleDomicilioChange(index, 'piso', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Número de Departamento"
                                    value={domicilio.nroDpto}
                                    onChange={(e) => handleDomicilioChange(index, 'nroDpto', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    select
                                    label="Localidad"
                                    value={domicilio.localidad?.id || ''}
                                    onChange={(e) => handleLocalidadChange(index, Number(e.target.value))}
                                >
                                    {localidades.map((localidad) => (
                                        <MenuItem key={localidad.id} value={localidad.id}>
                                            {localidad.nombre}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton onClick={() => eliminarDomicilio(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}


                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={3}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Registrar
                            </Button>
                            {mensaje && <Alert severity="error">{mensaje}</Alert>}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Container>

    );
};

export default RegisterCliente;
