import { useCarrito } from "../Carrito/useCarrito";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  Grading as GradingIcon,
} from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../ControlAcceso/AuthContext";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import { useState } from "react";
import LoginCliente from "../ControlAcceso/LoginCliente";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";

const Header = () => {
  const { isLoggedIn, cliente } = useAuth();
  const { cart } = useCarrito();
  const { sucursalId } = useParams<{ sucursalId: string }>();
  const [modalLoginOpen, setModalLoginOpen] = useState(false);
  const cantidadTotal = cart.reduce((total, item) => total + item.cantidad, 0);
  const navigate = useNavigate();

  const handleCloseModalLogin = () => {
    setModalLoginOpen(false);
  };

  const handleIrAPagar = () => {
        if (isLoggedIn) {
          // Si el usuario está autenticado, redirige al carrito
          navigate(`/carrito/${sucursalId}`);
        } else {
          // Si el usuario no está autenticado, muestra el modal de login
          setModalLoginOpen(true);
        }
      };

  return (
    <AppBar
      position="static"
      sx={{
        height: 75,
        bgcolor: "#2A211B",
        justifyContent: "center",
      }}
    >
      <Toolbar>
        <Link to={"/"}>
          <FastfoodOutlinedIcon sx={{ color: "#eee", height: 50, width: 50 }} />
        </Link>
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{ textDecoration: "none", color: "#f54c4c", flexGrow: 1 }}
        ></Typography>
        <LoginCliente open={modalLoginOpen} onClose={handleCloseModalLogin} />
        {isLoggedIn ? (
          <>
            <Button
              disableRipple
              disableTouchRipple
              className="btn-list-sidebar"
              startIcon={<GradingIcon />}
              onClick={() => navigate("/pedidosCliente")}
              sx={{ color: "#B88A60" }}
            >
              Tus Pedidos
            </Button>
            <Button
              disableRipple
              disableTouchRipple
              className="btn-list-sidebar"
              sx={{ color: "#eee" }}
              onClick={() => handleIrAPagar()}
              startIcon={
                <Badge badgeContent={cantidadTotal}>
                  <ShoppingCartIcon sx={{ fontSize: 30, color: "#eee" }} />
                </Badge>
              }
            >
              Carrito
            </Button>
          </>
        ) : (
          <></>
        )}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {isLoggedIn ? (
            <>
              {cliente && cliente.imagenCliente && (
                <Avatar
                  alt={`${cliente.nombre} ${cliente.apellido}`}
                  src={cliente.imagenCliente.url}
                />
              )}
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", mr: 2, color: "#eee" }}
              >
                Bienvenido {cliente?.nombre}
              </Typography>
              <LogoutButton />
            </>
          ) : (
            <>
              <LoginButton />
              <RegisterButton />
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
