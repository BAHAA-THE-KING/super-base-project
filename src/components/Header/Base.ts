import { Box, IconButton, styled } from "@mui/material";
import { varAlpha } from "src/themes/styles";

export const BaseHeader = styled(Box)(({ theme }) =>
  theme.unstable_sx({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    py: 1,
    px: 2,
    mb: 1,
    boxShadow: "none",
  })
);

export const BaseHeaderTitle = styled(Box)(({ theme }) =>
  theme.unstable_sx({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  })
);

export const BaseIconButton = styled(IconButton)(({ theme }) =>
  theme.unstable_sx({
    color: theme.palette.text.secondary,
    "&:hover": {
      color: theme.palette.primary.main,
      backgroundColor: varAlpha(theme.palette.primary["mainChannel"], 0.2),
    },
  })
);
