import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#fff",
      paper: "#f0f0f0",
    },
    transparent: {
      selection: "#00000022",
    },
  },
});

export { lightTheme };
