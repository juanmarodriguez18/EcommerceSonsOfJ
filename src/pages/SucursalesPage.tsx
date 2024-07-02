import { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Sucursal } from "../types/Sucursal";
import { getEmpresaById } from "../services/EmpresaService";

const SucursalesPage = () => {
  const navigate = useNavigate();
  const { empresaId } = useParams<{ empresaId: string }>();
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const filteredSucursales = sucursales.filter(
    (sucursal) => sucursal.eliminado === false
  );

  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const empresaData = await getEmpresaById(Number(empresaId));
        setSucursales(empresaData.sucursales);
      } catch (error) {
        console.error("Error al obtener las sucursales:", error);
      }
    };

    fetchSucursales();
  }, [empresaId]);

  const handleSeleccionarSucursal = (sucursalId: number) => {
    navigate(`/menu/${sucursalId}`);
  };

  return (
    <>
      <Box
        sx={{
          overflowX: "hidden",
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 2,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundSize: "cover",
          backgroundImage:
            "url(https://s1.1zoom.me/b5050/964/Pizza_Tomatoes_Basil_Cutting_board_614812_1920x1200.jpg)",
          backgroundAttachment: "fixed",
          backgroundPosition: "center top",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h2"
            sx={{
              color: "#eee",
              WebkitTextStroke: "1px #222", // Propiedad para el borde alrededor de las letras
              WebkitTextFillColor: "#eee", // Color del texto interior
              textShadow: "2px 2px 3px #222", // Sombra opcional para mejorar el contraste
            }}
          >
            Sucursales Disponibles
          </Typography>
        </Box>
        <Box
          sx={{
            mt: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 3,
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              color: "#eee",
              WebkitTextFillColor: "#eee", // Color del texto interior
              textShadow: "2px 2px 3px #000", // Sombra opcional para mejorar el contraste
            }}
          >
            Seleccione la empresa a la que quiere pedir
          </Typography>

          <Box
            sx={{
              overflowY: "auto",
              maxHeight: "55vh",
              marginLeft: "1000px",
              width: "100%",
            }}
          >
            <Box width={1200}>
              <Grid container sx={{ justifyContent: "center" }} spacing={3}>
                {filteredSucursales.map((sucursal) => (
                  <Grid key={sucursal.id} item xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        width: "100%",
                        borderRadius: 3,
                        bgcolor: "#2A211B",
                      }}
                    >
                      {sucursal.imagenesSucursal &&
                        sucursal.imagenesSucursal.length > 0 && (
                          <CardMedia
                            component="img"
                            height="350"
                            image={sucursal.imagenesSucursal[0].url}
                            alt={sucursal.nombre}
                          />
                        )}
                      <CardContent>
                        <Typography variant="h6" component="div" color={"#eee"}>
                          {sucursal.nombre}
                        </Typography>
                        <Typography
                          variant="body2"
                          color={"#eee"}
                          component="p"
                        >
                          Domicilio: {sucursal.domicilio.calle},{" "}
                          {sucursal.domicilio.numero},{" "}
                          {sucursal.domicilio.localidad.nombre}
                        </Typography>
                        <Button
                          variant="contained"
                          sx={{
                            mt: 2,
                            bgcolor: "#69471D",
                            "&:hover": {
                              bgcolor: "#B88A60",
                            },
                          }}
                          onClick={() => handleSeleccionarSucursal(sucursal.id)}
                        >
                          Seleccionar
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SucursalesPage;
