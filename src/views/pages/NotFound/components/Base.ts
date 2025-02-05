import { Container, styled } from "@mui/material";

export const BaseContainer = styled(Container)(() => ({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
}));
