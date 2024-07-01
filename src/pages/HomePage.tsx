import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getEmpresas } from "../services/EmpresaService"; // Asegúrate de tener este servicio
import { Empresa } from "../types/Empresa";

const HomePage = () => {
  const navigate = useNavigate();
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const filteredEmpresas = empresas.filter((empresa) => empresa.eliminado === false);

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const empresasData = await getEmpresas(); // Implementa esta función en tu servicio
        setEmpresas(empresasData);
      } catch (error) {
        console.error("Error al obtener las empresas:", error);
      }
    };

    fetchEmpresas();
  }, []);

  const handleSeleccionarEmpresa = (empresaId: number) => {
    navigate(`/sucursales/${empresaId}`);
  };

  return (
    <>
      {/* Footer */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 2,
          backgroundSize: "cover",
          backgroundImage:
            "url(https://s1.1zoom.me/b5050/964/Pizza_Tomatoes_Basil_Cutting_board_614812_1920x1200.jpg)",
        }}
      >
        <Box sx={{ alignSelf: "flex-start" }}>
          <Typography
            variant="h3"
            sx={{ textShadow: "2px 2px 6px #222", color: "#eee" }}
          >
            Bienvenidos a El Buen Sabor
          </Typography>
          <Typography variant="h6" color={"#eee"}>
            Descubre nuestros deliciosos productos.
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
            sx={{ color: "#eee", mb: 2, textShadow: "1px 1px 6px #000" }}
          >
            Seleccione la empresa a la que quiere pedir
          </Typography>
          <Grid container spacing={3}>
            {filteredEmpresas.map((empresa) => (
              <Grid key={empresa.id} item xs={12} sm={6}>
                <Card
                  sx={{
                    borderRadius: 3,
                    bgcolor: "#2A211B",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="240"
                    image={
                      Array.from(empresa.imagenesEmpresa.values())[0]?.url ||
                      "https://via.placeholder.com/240"
                    }
                    alt={empresa.nombre}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      color={"#eee"}
                    >
                      {empresa.nombre}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#69471D",
                        "&:hover": {
                          bgcolor: "#B88A60",
                        },
                      }}
                      onClick={() => handleSeleccionarEmpresa(empresa.id)}
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
    </>
  );
};

export default HomePage;
