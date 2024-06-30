import React from "react";
import { TextField, Typography, Box } from "@mui/material";

interface SearchBarProps {
  onSearch: (query: string) => void;
  sx?: object; // Añadimos una prop opcional para los estilos
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, sx }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", ...sx, marginLeft: 3 }}>
      <Typography variant="subtitle2" sx={{ mr: 1 }}>
        Buscar por denominación:
      </Typography>
      <TextField
        variant="outlined"
        size="small"
        onChange={(e) => onSearch(e.target.value)}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3f51b5", // Cambiar el color del borde cuando está enfocado
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
