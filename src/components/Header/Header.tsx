import { AppBar, Avatar, Badge, Box, Button, Toolbar, Typography } from "@mui/material";
import { ShoppingCart as ShoppingCartIcon,} from "@mui/icons-material";
import { useCarrito } from "../Carrito/useCarrito";
import { Link} from "react-router-dom";
import { useAuth } from "../ControlAcceso/AuthContext";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import { useState } from "react";
import LoginCliente from "../ControlAcceso/LoginCliente";

const Header = () => {
    //const { sucursalId } = useParams<{ sucursalId: string }>();
    const { isLoggedIn, cliente } = useAuth();
    const { cart } = useCarrito();
    const [modalLoginOpen, setModalLoginOpen] = useState(false);
    const cantidadTotal = cart.reduce((total, item) => total + item.cantidad, 0);

    const handleCloseModalLogin = () => {
        setModalLoginOpen(false);
      };

    /*const handleIrAPagar = () => {
        if (isLoggedIn) {
          // Si el usuario está autenticado, redirige al carrito
          navigate(`/carrito/${sucursalId}`);
        } else {
          // Si el usuario no está autenticado, muestra el modal de login
          setModalLoginOpen(true);
        }
      };*/

    return(
        <AppBar position="static" color="default">
            <Toolbar>
                <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
                    El Buen Sabor
                </Typography>
                 {/* Modal de Login */}
                <LoginCliente open={modalLoginOpen} onClose={handleCloseModalLogin} />
                <Button
                    disableRipple
                    disableTouchRipple
                    className="btn-list-sidebar"
                    startIcon={
                      <Badge badgeContent={cantidadTotal} color="primary">
                        <ShoppingCartIcon sx={{ fontSize: 20 }} />
                      </Badge>
                    }
                  >
                    Carrito
                </Button>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                {isLoggedIn ? (
                    <>
                        {cliente && cliente.imagenCliente && (
                            <Avatar alt={`${cliente.nombre} ${cliente.apellido}`} src={cliente.imagenCliente.url} />
                        )}
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 2 }}>
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