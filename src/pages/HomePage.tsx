import { useEffect, useState } from 'react';
import {
  Typography,
  Container,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getEmpresas } from '../services/EmpresaService'; // Asegúrate de tener este servicio
import { Empresa } from '../types/Empresa';

const HomePage = () => {
  const navigate = useNavigate();
  const [empresas, setEmpresas] = useState<Empresa[]>([]);

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const empresasData = await getEmpresas(); // Implementa esta función en tu servicio
        setEmpresas(empresasData);
      } catch (error) {
        console.error('Error al obtener las empresas:', error);
      }
    };

    fetchEmpresas();
  }, []);

  const handleSeleccionarEmpresa = (empresaId: number) => {
    navigate(`/sucursales/${empresaId}`);
  };

  return (
    <>
      {/* Contenido principal */}
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Bienvenidos a El Buen Sabor
        </Typography>
        <Typography variant="body1" paragraph>
          "Descubre nuestros deliciosos productos."
        </Typography>

        {/* Sección de empresas */}
        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
          Seleccione la empresa a la que quiere pedir:
        </Typography>
        <Grid container spacing={2}>
          {empresas.map((empresa) => (
            <Grid key={empresa.id} item xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="240"
                  image={Array.from(empresa.imagenesEmpresa.values())[0]?.url || 'https://via.placeholder.com/240'}
                  alt={empresa.nombre}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {empresa.nombre}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSeleccionarEmpresa(empresa.id)}
                  >
                    Seleccionar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          mt: 4,
          py: 3,
          bgcolor: 'primary.main',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} El Buen Sabor. Todos los derechos reservados.
        </Typography>
      </Box>
    </>
  );
};

export default HomePage;
