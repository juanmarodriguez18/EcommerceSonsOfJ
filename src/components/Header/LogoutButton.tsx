import Button from "@mui/material/Button";
import { useAuth } from "../ControlAcceso/AuthContext";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Button
      variant="contained"
      onClick={() => handleLogout()}
      sx={{
        px: 2,
        py: 1,
        fontSize: "0.875rem",
        fontWeight: "bold",
        textAlign: "center",
        bgcolor: "#eb4034",
        "&:hover": {
          bgcolor: "#802019",
        },
      }}
    >
      Salir
    </Button>
  );
};

export default LogoutButton;
