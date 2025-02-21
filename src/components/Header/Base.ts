import { Box, IconButton, styled } from "@mui/material";

export const BaseHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  marginBottom: theme.spacing(1),
  boxShadow: "none",
}));

export const BaseHeaderTitle = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
}));

export const BaseIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  "&:hover": {
    color: theme.palette.text.primary,
  },
}));
