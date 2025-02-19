import {
  Divider,
  Drawer,
  ListItemButton,
  styled,
  Typography,
} from "@mui/material";

export const BaseDrawer = styled(Drawer)<{ isExpanded?: boolean }>(
  ({ theme, isExpanded }) => ({
    width: isExpanded ? 280 : 55,
    flexShrink: 0,
    margin: theme.spacing(1),
    transition: "width 0.3s ease",
    "& .MuiDrawer-paper": {
      width: isExpanded ? 280 : 55,
      padding: theme.spacing(1),
      overflowX: "hidden",
    },
  })
);

export const BaseLogo = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: "bold",
  textAlign: "center",
  color: theme.palette.text.primary,
}));

export const BaseSidebarItem = styled(ListItemButton)<{ isActive?: boolean }>(
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
        : theme.palette.transparent.selection,
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
