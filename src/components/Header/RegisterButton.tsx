import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const RegisterButton = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/registerCliente");
  };
  return (
    <Button
      variant="contained"
      onClick={handleRegister}
      sx={{
        px: 2,
        py: 1,
        fontSize: "0.875rem",
        fontWeight: "bold",
        textAlign: "center",
        bgcolor: "#3d6b43",
        "&:hover": {
          bgcolor: "#243825",
        },
      }}
    >
      Sign up
    </Button>
  );
};

export default RegisterButton;
