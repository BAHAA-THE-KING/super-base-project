import { Box, IconButton, Typography, styled } from "@mui/material";

export const BaseHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  background: theme.palette.background.paper,
  backdropFilter: "blur(10px)",
  borderBottom: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: `0px 4px 10px ${theme.palette.grey[200]}`,
  marginBottom: theme.spacing(1),
}));

export const BaseHeaderTitle = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: "bold",
  color: theme.palette.text.primary,
}));

export const BaseIconButton = styled(IconButton)(({ theme }) => ({
  "&:hover": {
    color: theme.palette.text.primary,
  },
}));
