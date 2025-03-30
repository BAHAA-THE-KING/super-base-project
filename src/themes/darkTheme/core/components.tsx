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

const MuiButton: Components<Theme>["MuiButton"] = {
  defaultProps: {
    disableElevation: true,
  },
  styleOverrides: {
    containedInherit: ({ theme }) => ({
      color: theme.palette.common.white,
      backgroundColor: theme.palette.grey[200],
      "&:hover": {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.grey[200],
      },
    }),
    soft: ({ theme, ownerState: { color } }: any) => ({
      backgroundColor: theme.palette[color]
        ? varAlpha(theme.palette[color]?.mainChannel, 0.08)
        : "",
      color: theme.palette[color]?.dark,
      "&:hover": {
        backgroundColor: theme.palette[color]
          ? varAlpha(theme.palette[color]?.["mainChannel"], 0.16)
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
        borderColor: varAlpha(theme.palette.grey["500Channel"], 0.2),
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
            ? theme.palette.error["mainChannel"]
            : theme.palette.grey["500Channel"],
          0.08
        ),
      },
      "&:hover .MuiFilledInput-root": {
        backgroundColor: varAlpha(
          error
            ? theme.palette.error["mainChannel"]
            : theme.palette.grey["500Channel"],
          0.16
        ),
      },
      ".Mui-focused.MuiFilledInput-root": {
        backgroundColor: varAlpha(
          error
            ? theme.palette.error["mainChannel"]
            : theme.palette.grey["500Channel"],
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
            ? theme.palette.error["mainChannel"]
            : theme.palette.grey["500Channel"],
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

const MuiAlert: Components<Theme>["MuiAlert"] = {
  styleOverrides: {
    filled: ({ theme, ownerState: { color } }) => ({
      color: theme.palette[color ?? "error"].contrastText,
    }),
    standard: ({ theme, ownerState: { color } }) => ({
      backgroundColor: theme.palette[color ?? "error"].lighter,
    }),
    outlined: ({ theme, ownerState: { color } }) => ({
      backgroundColor: varAlpha(
        theme.palette[color ?? "error"]["mainChannel"],
        0.08
      ),
      borderColor: varAlpha(
        theme.palette[color ?? "error"]["mainChannel"],
        0.16
      ),
      color: theme.palette[color ?? "error"].dark,
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
  MuiAlert,
};
