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
  typography: {
    fontFamily: "Rubik",
    h1: {
      fontFamily: "Rubik",
    },
    h2: {
      fontFamily: "Rubik",
    },
    h3: {
      fontFamily: "Rubik",
    },
    h4: {
      fontFamily: "Rubik",
    },
    h6: {
      fontFamily: "Rubik",
    },
    h5: {
      fontFamily: "Rubik",
    },
    subtitle1: {
      fontFamily: "Rubik",
    },
    subtitle2: {
      fontFamily: "Rubik",
    },
    button: {
      fontFamily: "Rubik",
      fontWeight: 900,
    },
    overline: {
      fontFamily: "Rubik",
    },
  },
});

export { lightTheme };
