import type { Theme, Components } from "@mui/material/styles";

import { varAlpha } from "src/themes/styles";

// ----------------------------------------------------------------------

const MuiBackdrop: Components<Theme>["MuiBackdrop"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: varAlpha(theme.palette.grey["900Channel"], 0.8),
    }),
    invisible: {
      background: "transparent",
    },
  },
};

const MuiCard: Components<Theme>["MuiCard"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      zIndex: 0,
      position: "relative",
      boxShadow: theme.customShadows.card,
      borderRadius: theme.shape.borderRadius * 2,
    }),
  },
};

const MuiCardHeader: Components<Theme>["MuiCardHeader"] = {
  defaultProps: {
    titleTypographyProps: { variant: "h6" },
    subheaderTypographyProps: { variant: "body2" },
  },
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(3, 3, 0),
    }),
  },
};

const MuiPaper: Components<Theme>["MuiPaper"] = {
  defaultProps: {
    elevation: 0,
  },
  styleOverrides: {
    root: { backgroundImage: "none" },
    outlined: ({ theme }) => ({
      borderColor: varAlpha(theme.palette.grey["500Channel"], 0.16),
    }),
  },
};

const MuiTableCell: Components<Theme>["MuiTableCell"] = {
  styleOverrides: {
    head: ({ theme }) => ({
      fontSize: theme.typography.pxToRem(14),
      color: theme.palette.text.secondary,
      fontWeight: theme.typography.fontWeightSemiBold,
      backgroundColor: theme.palette.background.neutral,
    }),
  },
};

const MuiMenuItem: Components<Theme>["MuiMenuItem"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      ...theme.typography.body2,
    }),
  },
};

const MuiLink: Components<Theme>["MuiLink"] = {
  defaultProps: { underline: "hover" },
};

const MuiFormControlLabel: Components<Theme>["MuiFormControlLabel"] = {
  styleOverrides: {
    label: ({ theme }) => ({
      ...theme.typography.body2,
    }),
  },
};

// ----------------------------------------------------------------------

export const components = {
  MuiCard,
  MuiLink,
  MuiPaper,
  MuiBackdrop,
  MuiMenuItem,
  MuiTableCell,
  MuiCardHeader,
  MuiFormControlLabel,
};
