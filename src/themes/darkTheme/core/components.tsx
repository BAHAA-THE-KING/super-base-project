import type { Theme, Components } from "@mui/material/styles";

import SvgIcon from "@mui/material/SvgIcon";

import { bgGradient, varAlpha } from "src/themes/styles";

// ----------------------------------------------------------------------

const MuiBackdrop: Components<Theme>["MuiBackdrop"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: varAlpha(theme.vars.palette.grey["900Channel"], 0.8),
    }),
    invisible: {
      background: "transparent",
    },
  },
};

const MuiButton: Components<Theme>["MuiButton"] = {
  defaultProps: {
    disableElevation: true,
  },
  styleOverrides: {
    containedInherit: ({ theme }) => ({
      color: theme.vars.palette.common.white,
      backgroundColor: theme.vars.palette.grey[200],
      "&:hover": {
        color: theme.vars.palette.common.white,
        backgroundColor: theme.vars.palette.grey[200],
      },
    }),
    soft: ({ theme, ownerState: { color } }: any) => ({
      backgroundColor: theme.vars.palette[color]
        ? varAlpha(theme.vars.palette[color]?.["mainChannel"], 0.08)
        : "",
      color: theme.vars.palette[color]?.dark,
      "&:hover": {
        backgroundColor: theme.vars.palette[color]
          ? varAlpha(theme.vars.palette[color]?.["mainChannel"], 0.16)
          : "",
      },
    }),
    sizeLarge: {
      minHeight: 48,
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

const MuiTextField: Components<Theme>["MuiTextField"] = {
  styleOverrides: {
    root: ({ theme, ownerState: { error } }: any) => ({
      /* Global */
      ".Mui-focused.MuiFormLabel-root": {
        color:
          (error ? theme.palette.error.main : theme.palette.grey[200]) +
          " !important",
        fontWeight: 600,
      },

      /* Outlined */
      ".MuiOutlinedInput-notchedOutline": {
        borderColor: varAlpha(theme.vars.palette.grey["500Channel"], 0.2),
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor:
          (error ? theme.palette.error.main : theme.palette.grey[200]) +
          " !important",
      },
      ".Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor:
          (error ? theme.palette.error.main : theme.palette.grey[200]) +
          " !important",
        borderWidth: 2,
      },

      /* Filled */
      ".MuiFilledInput-root": {
        borderRadius: 10,
        backgroundColor: varAlpha(
          error
            ? theme.vars.palette.error["mainChannel"]
            : theme.vars.palette.grey["500Channel"],
          0.08
        ),
      },
      "&:hover .MuiFilledInput-root": {
        backgroundColor: varAlpha(
          error
            ? theme.vars.palette.error["mainChannel"]
            : theme.vars.palette.grey["500Channel"],
          0.16
        ),
      },
      ".Mui-focused.MuiFilledInput-root": {
        backgroundColor: varAlpha(
          error
            ? theme.vars.palette.error["mainChannel"]
            : theme.vars.palette.grey["500Channel"],
          0.16
        ),
      },
      ".MuiFilledInput-root::before, .MuiFilledInput-root::after": {
        borderBottomStyle: "none !important",
      },

      /* Standard */
      ".MuiInput-underline::before": {
        borderBottomColor: varAlpha(
          error
            ? theme.vars.palette.error["mainChannel"]
            : theme.vars.palette.grey["500Channel"],
          0.32
        ),
      },
      "&:hover .MuiInput-underline::before, .MuiInput-underline::after": {
        borderBottomColor: error
          ? theme.palette.error.main
          : theme.palette.grey[200],
      },
      ".Mui-focused.MuiInput-underline::after": {
        borderBottomWidth: 2,
      },
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
      borderColor: varAlpha(theme.vars.palette.grey["500Channel"], 0.16),
    }),
  },
};

const MuiTableCell: Components<Theme>["MuiTableCell"] = {
  styleOverrides: {
    head: ({ theme }) => ({
      fontSize: theme.typography.pxToRem(14),
      color: theme.vars.palette.text.secondary,
      fontWeight: theme.typography.fontWeightSemiBold,
      backgroundColor: theme.vars.palette.background.neutral,
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

const MuiSwitch: Components<Theme>["MuiSwitch"] = {
  styleOverrides: {
    root: {
      overflow: "visible",
    },
    sizeMedium: ({ theme }) => ({
      ".MuiSwitch-thumb": {
        width: 14,
        height: 14,
      },
      ".MuiSwitch-switchBase": {
        padding: 16,
      },
      ".MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(12px)",
      },
      ".MuiSwitch-track": {
        padding: 4,
        borderRadius: 100,
      },
    }),
    sizeSmall: ({ theme }) => ({
      ".MuiSwitch-thumb": {
        width: 10,
        height: 10,
      },
      ".MuiSwitch-switchBase": {
        padding: 9.6,
      },
      ".MuiSwitch-switchBase.Mui-checked": {
        padding: 9.5,
        transform: "translateX(10px)",
      },
      ".MuiSwitch-track": {
        padding: 3,
        borderRadius: 100,
      },
    }),
  },
};

// ----------------------------------------------------------------------

export const components = {
  MuiCard,
  MuiLink,
  MuiPaper,
  MuiButton,
  MuiBackdrop,
  MuiMenuItem,
  MuiTableCell,
  MuiCardHeader,
  MuiTextField,
  MuiFormControlLabel,
  MuiSwitch,
};
