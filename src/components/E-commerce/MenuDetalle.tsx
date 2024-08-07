import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Box,
} from "@mui/material";
import { AccessTime, ArrowBack } from "@mui/icons-material";
import { getArticuloManufacturadoById } from "../../services/ArticuloManufacturadoService";
import { ArticuloManufacturado } from "../../types/ArticuloManufacturado";
import { ArticuloManufacturadoDetalle } from "../../types/ArticuloManufacturadoDetalle";

const MenuDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [articulo, setArticulo] = useState<ArticuloManufacturado | null>(null);

  useEffect(() => {
    const fetchArticulo = async () => {
      if (id) {
        const data: ArticuloManufacturado =
          await getArticuloManufacturadoById(parseInt(id, 10));
        setArticulo(data);
      }
    };

    fetchArticulo();
  }, [id]);

  if (!id) {
    return <div>ID no proporcionado</div>;
  }

  if (!articulo) {
    return <CircularProgress />;
  }

  // Convertir sets a arrays para poder acceder a ellos
  const imagenesArticuloArray = Array.from(articulo.imagenesArticulo);
  const detallesArray: ArticuloManufacturadoDetalle[] = Array.from(
    articulo.articuloManufacturadoDetalles
  );

  return (
    <Box
      component="main"
      sx={{
        zoom: "90%",
        overflowY: "auto",
        maxHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Alinear en el centro verticalmente
        justifyContent: "center", // Alinear en el centro horizontalmente
        width: "100%",
        height: "100%",
        bgcolor: "#eee",
        backgroundImage: "url(https://s1.1zoom.me/b5050/964/Pizza_Tomatoes_Basil_Cutting_board_614812_1920x1200.jpg)",
        backgroundSize: "cover", // Ajuste para cubrir toda la pantalla
      }}
    >
    <Box
      maxWidth="md"
      sx={{
        marginTop: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "rgba(245, 245, 245, 0.8)", // Fondo gris claro con 90% de opacidad
        padding: 1,
        borderRadius: 2,
        boxShadow: 3, // Sombra suave
      }}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} display="flex" alignItems="center">
          <IconButton
            sx={{
                marginLeft: 2,
                marginRight: 2,
                color: "#FFFFFF",
                bgcolor: "#188723",
                "&:hover": {
                    bgcolor: "#3FB94A",
                },
            }}
            size="large"
            color="primary"
            onClick={() => window.history.back()}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h2">{articulo.denominacion}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          {imagenesArticuloArray.length > 0 && (
            <Card
              sx={{
                borderRadius: 2,
                backgroundColor: "rgba(245, 245, 245, 0.2)", // Fondo gris claro con 90% de opacidad
                boxShadow: 3, // Sombra suave
              }}
            >
              <CardMedia
                component="img"
                height="100%"
                image={imagenesArticuloArray[0].url}
                alt={articulo.denominacion}
              />
            </Card>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
          sx={{
            backgroundColor: "rgba(245, 245, 245, 0.7)", // Fondo gris claro con 90% de opacidad
            borderRadius: 2,
            boxShadow: 3, // Sombra suave
          }}
          >
            <CardContent sx={{ width: "100%", height: "100%" }}>
              <Typography sx={{ height: 100 }} variant="h6">
                Descripción: {articulo.descripcion}
              </Typography>
              <Typography sx={{ height: 100 }} variant="h6">
                Preparación: {articulo.preparacion}
              </Typography>
              <Typography sx={{ height: 65 }} variant="h6">
                <AccessTime /> Demora: {articulo.tiempoEstimadoMinutos} minutos
              </Typography>
              <Typography variant="h6">
                Precio: ${articulo.precioVenta}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Typography sx={{ marginLeft: 1 }} variant="h4">Insumos:</Typography>
          <TableContainer>
            <Table>
              <TableBody>
                {detallesArray.map((detalle) => (
                  <TableRow key={detalle.id}>
                    <TableCell>
                      <Typography variant="h5">
                        {detalle.articuloInsumo.denominacion}
                      </Typography>
                      <Typography variant="h6">
                        <span>Cantidad: {detalle.cantidad} </span>
                        <span>
                          {detalle.articuloInsumo.unidadMedida.denominacion}
                        </span>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {Array.from(detalle.articuloInsumo.imagenesArticulo).length > 0 && (
                        <CardMedia
                          component="img"
                          image={Array.from(detalle.articuloInsumo.imagenesArticulo)[0].url}
                          alt={detalle.articuloInsumo.denominacion}
                          sx={{
                            maxWidth: 150,
                            maxHeight: 150,
                          }}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
    </Box>
  );
};

export default MenuDetalle;
