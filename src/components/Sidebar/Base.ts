import {
  Divider,
  Drawer,
  ListItemButton,
  styled,
  Typography,
} from "@mui/material";
import { BTypography } from "../Base";

export const BaseDrawer = styled(Drawer, {
  shouldForwardProp: (prop) =>
    prop !== "direction" && prop !== "isOpen" && prop !== "isExpanded",
})<{
  direction: "ltr" | "rtl";
  isOpen: boolean;
  isExpanded: boolean;
}>(({ theme, isOpen, isExpanded }) =>
  theme.unstable_sx({
    "&>.MuiDrawer-paper": {
      maxWidth: "100%",
      transition: theme.transitions.create(["transform", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter,
      }),
    },
    "&>.MuiDrawer-paper>.MuiStack-root": {
      px: 1,
      py: 0,
    },
    [theme.breakpoints.up("lg")]: {
      "&>.MuiDrawer-paper>.MuiStack-root": {
        p: 0,
      },
      "&>.MuiDrawer-paper": {
        p: 0,
        width: isExpanded ? "275px" : `CALC(58.25px + ${theme.spacing(2)})`,
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
  })
);

export const BaseLogo = styled(Typography)(({ theme }) =>
  theme.unstable_sx({
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    color: theme.palette.text.primary,
    m: 2,
  })
);

export const BaseSidebarItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "isActive" && prop !== "isExpanded",
})<{
  isActive?: boolean;
  isExpanded: boolean;
}>(({ theme, isActive, isExpanded }) =>
  theme.unstable_sx({
    borderRadius: "8px",
    my: 1,
    mx: 0,
    transition: "all 0.3s",
    bgcolor: isActive ? theme.palette.primary.main : "transparent",
    color: isActive
      ? theme.palette.primary.contrastText
      : theme.palette.text.primary,
    "&:hover": {
      bgcolor: isActive ? theme.palette.primary.dark : "",
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
  })
);

export const BaseSidebarCollapse = styled(ListItemButton, {
  shouldForwardProp: (props) => props !== "isActive" && props !== "open",
})<{
  isActive: boolean;
  open: boolean;
}>(({ theme, isActive, open }) =>
  theme.unstable_sx({
    borderRadius: "8px",
    my: 1,
    mx: 0,
    transition: "all 0.3s",
    bgcolor: isActive ? theme.palette.primary.main : open ? "" : "transparent",
    color: isActive
      ? theme.palette.primary.contrastText
      : theme.palette.text.primary,
    "&:hover": {
      bgcolor: isActive ? theme.palette.primary.dark : "",
    },

    // Icon
    ".MuiListItemIcon-root>.MuiSvgIcon-root": {
      color: isActive
        ? theme.palette.primary.contrastText
        : theme.palette.text.primary,
    },
  })
);

export const BaseSidebarDivider = styled(Divider)(({ theme }) =>
  theme.unstable_sx({
    my: 1,
    mx: 0,
    bgcolor: theme.palette.text.primary,
  })
);

export const BaseSidebarTitle = styled(BTypography)(({ theme }) =>
  theme.unstable_sx({
    ".MuiTypography-root": { fontWeight: 900 },
  })
);
