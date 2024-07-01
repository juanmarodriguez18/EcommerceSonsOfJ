// LoginButton.tsx

import { useState } from "react";
import { Button } from "@mui/material";
import LoginCliente from "../ControlAcceso/LoginCliente";

const LoginButton = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="text"
        onClick={handleOpen}
        sx={{
          px: 2,
          py: 1,
          fontSize: "0.875rem",
          fontWeight: "bold",
          textAlign: "center",
          color: "#eee",
        }}
      >
        Log In
      </Button>
      <LoginCliente open={open} onClose={handleClose} />
    </div>
  );
};

export default LoginButton;
