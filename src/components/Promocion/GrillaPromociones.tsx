import React, { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Grid, Box, IconButton } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Promocion } from '../../types/Promocion';
import { useCarrito } from '../Carrito/useCarrito';
import { getPromociones } from '../../services/PromocionService';
import { Link } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import SearchBar from '../SearchBar/SearchBar';

const GrillaPromociones: React.FC = () => {
  const [promociones, setPromociones] = useState<Promocion[]>([]);
  const { cart } = useCarrito();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const fetchPromociones = async () => {
      try {
        setLoading(true);
        const data = await getPromociones();
        setPromociones(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching promociones:', error);
        setLoading(false);
      }
    };

    fetchPromociones();
  }, []);

  const handleIncrementarCantidad = (promocion: Promocion) => {
    const currentCantidad = cart.find(item => item.id === promocion.id)?.cantidad || 0;
    if (currentCantidad) {
      //updateCarrito(promocion, currentCantidad + 1);
      }
    
  };
  
  const handleDecrementarCantidad = (promocion: Promocion) => {
    const currentCantidad = cart.find(item => item.id === promocion.id)?.cantidad || 0;
    if (currentCantidad > 0) {
      //updateCarrito(promocion, currentCantidad - 1);
    }
  };
  
  // Filtrar promociones por query
  const filteredPromociones = promociones.filter((promocion) =>
    promocion.denominacion.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Promociones
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <SearchBar onSearch={setQuery} />
      </Box>

      <Box sx={{ overflowY: 'auto', maxHeight: '80vh', width: '100%' }}>
        <Box width={1500} display="flex" alignItems="center" mb={2}>
          <Grid container spacing={4}>
            {loading ? (
              <Typography variant="body1">Cargando...</Typography>
            ) : (
              filteredPromociones.map((promocion) => (
                <Grid item key={promocion.id} xs={12} sm={6} md={4} sx={{ maxWidth: '300px' }}>
                  <Card sx={{ width: '100%' }}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={promocion.imagenesPromocion[0]?.url || ''}
                      alt={promocion.denominacion}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {promocion.denominacion}
                      </Typography>
                      <Typography height={60} variant="body2" color="textSecondary" component="p">
                        {promocion.descripcionDescuento}
                      </Typography>
                      <Typography variant="h6" color="textPrimary">
                        ${promocion.precioPromocional}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'left', marginLeft: 2, marginBottom: 4 }}>
                      <Link to={`/promociones/${promocion.id}`}>
                        <InfoIcon
                          sx={{
                            bgcolor: "#FB9553",
                            color: "#FFEDC2",
                            borderRadius: "50%",
                            width: 40,
                            marginRight: 2,
                            height: 40,
                            p: 0.1,
                            "&:hover": {
                              bgcolor: "#FB5353",
                            },
                          }}
                        />
                      </Link>
                      {cart.find(item => item.id === promocion.id)?.cantidad ? (
                        <div className="cantidad-carrito" style={{ marginLeft: 190, display: 'flex', alignItems: 'center' }}>
                          <IconButton
                            sx={{
                              marginRight: 4,
                              color: "#FFFFFF",
                              bgcolor: "#FFA5A5",
                              "&:hover": {
                                bgcolor: "#E82222",
                              },
                            }}
                            size="medium"
                            onClick={() => handleDecrementarCantidad(promocion)}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography variant="h5">{cart.find(item => item.id === promocion.id)?.cantidad}</Typography>
                          <IconButton
                            sx={{
                              marginLeft: 4,
                              color: "#FFFFFF",
                              bgcolor: "#93EE9C",
                              "&:hover": {
                                bgcolor: "#3FB94A",
                              },
                            }}
                            size="medium"
                            onClick={() => handleIncrementarCantidad(promocion)}
                          >
                            <AddIcon />
                          </IconButton>
                        </div>
                      ) : (
                        <Button
                            style={{ marginLeft: 170 }}
                            sx={{ marginBottom: 0.5 }}
                            variant="contained"
                            color="primary"
                            /*onClick={() => addCarrito(promocion)}*/
                        >
                          Agregar al Carrito
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default GrillaPromociones;
