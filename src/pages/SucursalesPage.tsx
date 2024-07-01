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
  const filteredSucursales = sucursales.filter((sucursal) => sucursal.eliminado === false);

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
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundSize: "cover",
        backgroundImage:
          "url(https://s1.1zoom.me/b5050/964/Pizza_Tomatoes_Basil_Cutting_board_614812_1920x1200.jpg)",
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: "#eee", textShadow: "1px 1px 6px #000" }}
      >
        Sucursales Disponibles
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{ display: "flex", justifyContent: "center", mt: 1 }}
      >
        {filteredSucursales.map((sucursal) => (
          <Grid key={sucursal.id} item xs={12} sm={6} md={4}>
            <Card
              sx={{
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
                <Typography variant="body2" color={"#eee"} component="p">
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
  );
};

export default SucursalesPage;
