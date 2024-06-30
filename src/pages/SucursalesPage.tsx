import { useEffect, useState } from 'react';
import { Typography, Container, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Sucursal } from '../types/Sucursal';
import { getEmpresaById } from '../services/EmpresaService';

const SucursalesPage = () => {
  const navigate = useNavigate();
  const { empresaId } = useParams<{ empresaId: string }>();
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);

  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const empresaData = await getEmpresaById(Number(empresaId));
        setSucursales(empresaData.sucursales);
      } catch (error) {
        console.error('Error al obtener las sucursales:', error);
      }
    };

    fetchSucursales();
  }, [empresaId]);

  const handleSeleccionarSucursal = (sucursalId: number) => {
    navigate(`/menu/${sucursalId}`);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Sucursales Disponibles
      </Typography>
      <Grid container spacing={2}>
        {sucursales.map((sucursal) => (
          <Grid key={sucursal.id} item xs={12} sm={6} md={4}>
            <Card>
              {sucursal.imagenesSucursal && sucursal.imagenesSucursal.length > 0 && (
                <CardMedia
                  component="img"
                  height="240"
                  image={sucursal.imagenesSucursal[0].url}
                  alt={sucursal.nombre}
                />
              )}
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {sucursal.nombre}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Domicilio: {sucursal.domicilio.calle}, {sucursal.domicilio.numero}, {sucursal.domicilio.localidad.nombre}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSeleccionarSucursal(sucursal.id)}
                >
                  Seleccionar
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SucursalesPage;
