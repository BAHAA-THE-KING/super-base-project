import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "rgb(42, 52, 71)",
      paper: "rgb(42, 52, 71)",
    },
    primary: {
      main: "#5D87FF",
      light: "#7DA1FF",
      dark: "#4572EA",
      contrastText: "#FFFFFF",
      background: "#253662",
    },
    secondary: {
      main: "#FF5E78",
      light: "#FF8599",
      dark: "#D94561",
      contrastText: "#FFFFFF",
      background: "#4D2A38",
    },
    //grey: {
    //  100: "#1E252F",
    //  200: "#2B333D",
    //  300: "#3E4752",
    //  400: "#525B67",
    //  500: "#79828E",
    //  600: "#A0A7B1",
    //  700: "#C7CCD4",
    //  800: "#E3E6EB",
    //  900: "#F0F2F5",
    //},
    info: {
      main: "#49BEFF",
      light: "#72D0FF",
      dark: "#1C99E0",
      contrastText: "#FFFFFF",
      background: "#1C455D",
    },
    success: {
      main: "#13DEB9",
      light: "#3CE7C6",
      dark: "#0DBA99",
      contrastText: "#FFFFFF",
      background: "#1B3C48",
    },
    warning: {
      main: "#FFAE1F",
      light: "#FFC44D",
      dark: "#E69600",
      contrastText: "#FFFFFF",
      background: "#4D3A2A",
    },
    error: {
      main: "#FA896B",
      light: "#FFAB92",
      dark: "#E06A4F",
      contrastText: "#FFFFFF",
      background: "#4B313D",
    },
    text: {
      primary: "#EAEFF4",
      secondary: "#7C8FAC",
    },
    transparent: {
      selection: "#FFFFFF22",
    },
  },
});

export { darkTheme };
