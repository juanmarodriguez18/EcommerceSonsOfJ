import React from "react";
import { TextField, Typography, Box } from "@mui/material";

interface SearchBarProps {
  onSearch: (query: string) => void;
  sx?: object; // Añadimos una prop opcional para los estilos
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, sx }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", ...sx, marginLeft: 1, marginRight: 1 }}>
      <Typography variant="h6" sx={{ mr: 1, whiteSpace: "nowrap" }}>
        Buscar por denominación:
      </Typography>
      <TextField
        variant="outlined"
        size="small"
        onChange={(e) => onSearch(e.target.value)}
        sx={{
          width: "500px",
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "#69471D",
            },
        }}
      />
    </Box>
  );
};

export default SearchBar;
