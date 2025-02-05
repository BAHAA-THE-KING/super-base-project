import {
  Divider,
  Drawer,
  ListItemButton,
  styled,
  Typography,
} from "@mui/material";

export const BaseDrawer = styled(Drawer)(({ theme }) => ({
  width: 280,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 280,
    background: theme.palette.background.paper,
    padding: "10px",
  },
}));

export const BaseLogo = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: "16px",
  color: theme.palette.text.primary,
}));

export const BaseSidebarItem = styled(ListItemButton)<{ isActive: boolean }>(
  ({ theme, isActive }) => ({
    borderRadius: 8,
    margin: `${theme.spacing(1)}  ${0}`,
    transition: "all 0.3s",
    backgroundColor: isActive ? theme.palette.primary.main : "transparent",
    color: isActive
      ? theme.palette.primary.contrastText
      : theme.palette.text.primary,
    "&:hover": {
      backgroundColor: isActive
        ? theme.palette.primary.dark
        : theme.palette.grey[200],
    },

    // Icon
    ".MuiListItemIcon-root>.MuiSvgIcon-root": {
      color: isActive
        ? theme.palette.primary.contrastText
        : theme.palette.text.primary,
    },
  })
);

export const BaseSidebarCollapse = styled(ListItemButton)<{
  isActive: boolean;
  open: boolean;
}>(({ theme, isActive, open }) => ({
  borderRadius: 8,
  margin: `${theme.spacing(1)}  ${0}`,
  transition: "all 0.3s",
  backgroundColor: isActive
    ? theme.palette.primary.main
    : open
    ? theme.palette.grey[200]
    : "transparent",
  color: isActive
    ? theme.palette.primary.contrastText
    : theme.palette.text.primary,
  "&:hover": {
    backgroundColor: isActive
      ? theme.palette.primary.dark
      : theme.palette.grey[200],
  },

  // Icon
  ".MuiListItemIcon-root>.MuiSvgIcon-root": {
    color: isActive
      ? theme.palette.primary.contrastText
      : theme.palette.text.primary,
  },
}));

export const BaseSidebarDivider = styled(Divider)(({ theme }) => ({
  margin: `${theme.spacing(1)}  ${0}`,
  backgroundColor: theme.palette.text.primary,
}));
