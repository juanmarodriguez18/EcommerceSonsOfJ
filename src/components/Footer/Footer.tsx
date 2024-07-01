import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        bgcolor: "primary.main",
        color: "#eee",
        backgroundColor: "#2A211B",
        textAlign: "center",
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} El Buen Sabor. Todos los derechos
        reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
