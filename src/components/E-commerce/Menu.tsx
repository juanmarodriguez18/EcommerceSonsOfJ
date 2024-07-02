import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Box,
  IconButton,
} from "@mui/material";
import { ArticuloManufacturado } from "../../types/ArticuloManufacturado";
import { ArticuloInsumo } from "../../types/ArticuloInsumo";
import { useCarrito } from "../Carrito/useCarrito";
import { Link, useNavigate, useParams } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import {
  getInsumosBySucursalId,
  getManufacturadosBySucursalId,
} from "../../services/SucursalService";
import LoginCliente from "../ControlAcceso/LoginCliente";
import { useAuth } from "../ControlAcceso/AuthContext";
import { AddOutlined, RemoveOutlined } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";

export const Menu: React.FC = () => {
  const { sucursalId } = useParams<{ sucursalId: string }>();
  const [articulosManufacturados, setArticulosManufacturados] = useState<
    ArticuloManufacturado[]
  >([]);
  const [articulosInsumos, setArticulosInsumos] = useState<ArticuloInsumo[]>(
    []
  );
  const { addCarrito, updateCarrito, cart } = useCarrito();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState<string>("");
  const [modalLoginOpen, setModalLoginOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        setLoading(true);
        const manufacturados = await getManufacturadosBySucursalId(
          Number(sucursalId)
        );
        const insumos = await getInsumosBySucursalId(Number(sucursalId));
        setArticulosManufacturados(manufacturados);
        setArticulosInsumos(insumos);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching artículos de la sucursal:", error);
        setLoading(false);
      }
    };

    if (sucursalId) {
      fetchArticulos();
    }
  }, [sucursalId]);

  const handleIncrementarCantidad = (
    articulo: ArticuloManufacturado | ArticuloInsumo
  ) => {
    const currentCantidad =
      cart.find((item) => item.articulo.id === articulo.id)?.cantidad || 0;
    updateCarrito(articulo, currentCantidad + 1);
  };

  const handleDecrementarCantidad = (
    articulo: ArticuloManufacturado | ArticuloInsumo
  ) => {
    const currentCantidad =
      cart.find((item) => item.articulo.id === articulo.id)?.cantidad || 0;
    if (currentCantidad > 0) {
      updateCarrito(articulo, currentCantidad - 1);
    }
  };

  const filteredArticulos = [
    ...articulosManufacturados.filter(
      (manufacturado) => !manufacturado.eliminado
    ),
    ...articulosInsumos.filter(
      (insumo) => !insumo.esParaElaborar && !insumo.eliminado
    ),
  ].filter((articulo) =>
    articulo.denominacion.toLowerCase().includes(query.toLowerCase())
  );

  const handleIrAPagar = () => {
    if (isLoggedIn) {
      // Si el usuario está autenticado, redirige al carrito
      navigate(`/carrito/${sucursalId}`);
    } else {
      // Si el usuario no está autenticado, muestra el modal de login
      setModalLoginOpen(true);
    }
  };

  const handleCloseModalLogin = () => {
    setModalLoginOpen(false);
  };

  return (
    <Box
      sx={{
        zoom: "94%",
        overflowY: "hidden",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        bgcolor: "#eee",
        backgroundSize: "cover",
        backgroundImage:
          "url(https://s1.1zoom.me/b5050/964/Pizza_Tomatoes_Basil_Cutting_board_614812_1920x1200.jpg)",
        backgroundAttachment: "fixed",
        backgroundPosition: "center top",
      }}
    >
      <Box
        sx={{
          padding: 3,
          width: "100%",
          bgcolor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundSize: "cover",
          backgroundColor: "rgba(245, 245, 245, 0.2)", // Fondo gris claro con 90% de opacidad
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "#eee",
            WebkitTextStroke: "1px #222", // Propiedad para el borde alrededor de las letras
            WebkitTextFillColor: "#eee", // Color del texto interior
            textShadow: "2px 2px 3px #222", // Sombra opcional para mejorar el contraste
          }}
        >
          Nuestro Menú
        </Typography>
      </Box>
      <Box
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "rgba(245, 245, 245, 0.5)",
        }}
      >
        <Box
          sx={{
            mb: 2,
            padding: 1,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            color: "#000",
            //WebkitTextStroke: "1px #FFF", // Propiedad para el borde alrededor de las letras
            //WebkitTextFillColor: "#eee", // Color del texto interior
            textShadow: "1px 1px 3px #FFF", // Sombra opcional para mejorar el contraste
            backgroundColor: "rgba(245, 245, 245, 0.7)",
          }}
        >
          <SearchBar onSearch={setQuery} />
        </Box>

        <Box
          className="smooth-scrollbar"
          sx={{
            width: "100%",
            overflowY: "auto",
            maxHeight: "58vh",
          }}
        >
          <Grid
            container
            spacing={3}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {loading ? (
              <Typography variant="body1" mt={6}>
                Cargando...
              </Typography>
            ) : filteredArticulos.length === 0 ? (
              <Typography variant="body1" mt={6}>
                Esta sucursal no tiene artículos en el menú.
              </Typography>
            ) : (
              filteredArticulos.map((articulo) => (
                <Grid
                  item
                  key={articulo.id}
                  xs={12}
                  sm={6}
                  md={4}
                  sx={{ maxWidth: "300px" }}
                >
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      borderRadius: 3,
                      bgcolor: "#eee",
                      boxShadow: 0,
                      backgroundColor: "rgba(245, 245, 245, 0.8)", // Fondo gris claro con 90% de opacidad
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: 230,
                        height: 250,
                      }}
                      image={
                        Array.from(articulo.imagenesArticulo.values())[0]
                          ?.url || ""
                      }
                      alt={articulo.denominacion}
                    />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography
                          component="div"
                          variant="h5"
                          color={"#69471D"}
                        >
                          {articulo.denominacion}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          height={65}
                        >
                          {"descripcion" in articulo &&
                            (articulo as ArticuloManufacturado).descripcion}
                        </Typography>
                        <Typography variant="h6" color="textPrimary">
                          <b>${articulo.precioVenta}</b>
                        </Typography>
                      </CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          pl: 1,
                          pb: 1,
                        }}
                      >
                        <CardActions
                          sx={{
                            justifyContent: "left",
                          }}
                        >
                          {cart.find((item) => item.articulo.id === articulo.id)
                            ?.cantidad ? (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                width: 190,
                                bgcolor: "#ccc",
                                borderRadius: 20,
                              }}
                            >
                              <IconButton
                                sx={{
                                  color: "#eee",
                                  bgcolor: "#2A211B",
                                  "&:hover": {
                                    bgcolor: "#69471D",
                                  },
                                }}
                                size="medium"
                                onClick={() =>
                                  handleDecrementarCantidad(articulo)
                                }
                              >
                                <RemoveOutlined />
                              </IconButton>
                              <Typography
                                variant="h5"
                                sx={{ width: "100%", textAlign: "center" }}
                              >
                                {" "}
                                {
                                  cart.find(
                                    (item) => item.articulo.id === articulo.id
                                  )?.cantidad
                                }{" "}
                              </Typography>
                              <IconButton
                                sx={{
                                  color: "#eee",
                                  bgcolor: "#2A211B",
                                  "&:hover": {
                                    bgcolor: "#69471D",
                                  },
                                }}
                                size="small"
                                onClick={() =>
                                  handleIncrementarCantidad(articulo)
                                }
                              >
                                <AddOutlined />
                              </IconButton>
                            </Box>
                          ) : (
                            <Button
                              sx={{
                                width: 190, // Reducimos el ancho del botón
                                padding: "6px 12px", // Ajustamos el relleno (padding) para que sea más pequeño
                                fontSize: "0.875rem", // Reducimos el tamaño de la fuente
                                bgcolor: "#3d6b43",
                                "&:hover": {
                                  bgcolor: "#458D4F",
                                },
                              }}
                              variant="contained"
                              onClick={() => addCarrito(articulo)}
                            >
                              Al Carrito
                            </Button>
                          )}
                          {"esParaElaborar" in articulo ? (
                            <div
                              className="espacio"
                              style={{ marginLeft: 60 }}
                            />
                          ) : (
                            <Link to={`/menu/${sucursalId}/${articulo.id}`}>
                              <InfoIcon
                                sx={{
                                  color: "#FFEDC2",
                                  borderRadius: "50%",
                                  width: 40,
                                  marginLeft: 18,
                                  height: 40,
                                  p: 0.1,
                                  bgcolor: "#FB9553",
                                  "&:hover": {
                                    bgcolor: "#FB5353",
                                  },
                                }}
                              />
                            </Link>
                          )}
                        </CardActions>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Box>

      {/* Modal de Login */}
      <LoginCliente open={modalLoginOpen} onClose={handleCloseModalLogin} />

      {/* Botón Ir a Pagar */}
      <Box
        sx={{
          padding: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "220px",
            padding: 1,
            borderRadius: 2,
            alignItems: "center",
            justifyContent: "center",
            color: "#000",
            textShadow: "1px 1px 3px #FFF", // Sombra opcional para mejorar el contraste
            backgroundColor: "rgba(245, 245, 245, 0.7)",
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: 190,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#69471D",
              "&:hover": {
                bgcolor: "#D8A362",
              },
            }}
            onClick={handleIrAPagar}
          >
            Ir a Pagar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Menu;
