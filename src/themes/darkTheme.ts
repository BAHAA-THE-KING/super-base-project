import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#424242",
      paper: "#303030",
    },
    transparent: {
      selection: "#FFFFFF22",
    },
  },
});

export { darkTheme };
