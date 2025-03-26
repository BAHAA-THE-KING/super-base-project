import {
  Divider,
  Drawer,
  ListItemButton,
  styled,
  Typography,
} from "@mui/material";

export const BaseDrawer = styled(Drawer)<{
  direction: "ltr" | "rtl";
  isOpen: boolean;
  isExpanded: boolean;
}>(({ theme, isOpen, isExpanded }) => ({
  "&>.MuiDrawer-paper": {
    maxWidth: "100%",
    transition: theme.transitions.create(["transform", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter,
    }),
  },
  "&>.MuiDrawer-paper>.MuiStack-root": {
    padding: `0 ${theme.spacing(1)}`,
  },
  [theme.breakpoints.up("lg")]: {
    "&>.MuiDrawer-paper>.MuiStack-root": {
      padding: 0,
    },
    "&>.MuiDrawer-paper": {
      padding: `0 ${theme.spacing(1)}`,
      width: isExpanded ? "244px" : "57.5px",
      transform: `translateX(0)`,
      position: "relative",
      overflow: "hidden",
    },
  },
  [theme.breakpoints.down("lg")]: {
    "&>.MuiDrawer-paper": {
      width: "auto",
      transform: `translateX(${isOpen ? 0 : "-100%"})`,
    },
  },
  [theme.breakpoints.down("sm")]: {
    "&>.MuiDrawer-paper": {
      width: "100%",
    },
  },
}));

export const BaseLogo = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: "bold",
  textAlign: "center",
  color: theme.palette.text.primary,
  margin: theme.spacing(2),
}));

export const BaseSidebarItem = styled(ListItemButton)<{
  isActive?: boolean;
  isExpanded: boolean;
}>(({ theme, isActive, isExpanded }) => ({
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
      : "",
  },

  // Icon
  "& .MuiListItemIcon-root>.MuiSvgIcon-root": {
    color: isActive
      ? theme.palette.primary.contrastText
      : theme.palette.text.primary,
  },

  // Text
  "& .MuiListItemText-root>.MuiTypography-root": {
    fontSize: isExpanded ? "" : 0,
  },
}));

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
    ? ""
    : "transparent",
  color: isActive
    ? theme.palette.primary.contrastText
    : theme.palette.text.primary,
  "&:hover": {
    backgroundColor: isActive
      ? theme.palette.primary.dark
      : "",
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
