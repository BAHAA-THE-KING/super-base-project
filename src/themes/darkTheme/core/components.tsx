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

const MuiCheckbox: Components<Theme>["MuiCheckbox"] = {
  defaultProps: {
    size: "small",
    icon: (
      <SvgIcon>
        <path d="M17.9 2.318A5 5 0 0 1 22.895 7.1l.005.217v10a5 5 0 0 1-4.783 4.995l-.217.005h-10a5 5 0 0 1-4.995-4.783l-.005-.217v-10a5 5 0 0 1 4.783-4.996l.217-.004h10Zm-.5 1.5h-9a4 4 0 0 0-4 4v9a4 4 0 0 0 4 4h9a4 4 0 0 0 4-4v-9a4 4 0 0 0-4-4Z" />
      </SvgIcon>
    ),
    checkedIcon: (
      <SvgIcon>
        <path d="M17 2a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm-1.625 7.255-4.13 4.13-1.75-1.75a.881.881 0 0 0-1.24 0c-.34.34-.34.89 0 1.24l2.38 2.37c.17.17.39.25.61.25.23 0 .45-.08.62-.25l4.75-4.75c.34-.34.34-.89 0-1.24a.881.881 0 0 0-1.24 0Z" />
      </SvgIcon>
    ),
    indeterminateIcon: (
      <SvgIcon>
        <path d="M17,2 C19.7614,2 22,4.23858 22,7 L22,7 L22,17 C22,19.7614 19.7614,22 17,22 L17,22 L7,22 C4.23858,22 2,19.7614 2,17 L2,17 L2,7 C2,4.23858 4.23858,2 7,2 L7,2 Z M15,11 L9,11 C8.44772,11 8,11.4477 8,12 C8,12.5523 8.44772,13 9,13 L15,13 C15.5523,13 16,12.5523 16,12 C16,11.4477 15.5523,11 15,11 Z" />
      </SvgIcon>
    ),
  },
};

const MuiRadio: Components<Theme>["MuiRadio"] = {
  styleOverrides: {
    root: ({ theme, ownerState: { color } }) => ({
      "&.Mui-checked>span:nth-of-type(1)": {
        backgroundColor: theme.palette[color ?? "primary"].main,
        borderRadius: "50%",
      },
      "&.Mui-checked>span:nth-of-type(1)>svg:nth-of-type(1)>path": {
        color: "transparent",
      },
      "&.Mui-checked>span:nth-of-type(1)>svg:nth-of-type(2)>path": {
        color: theme.palette.background.paper,
      },
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
  MuiRadio,
  MuiButton,
  MuiBackdrop,
  MuiMenuItem,
  MuiCheckbox,
  MuiTableCell,
  MuiCardHeader,
  MuiTextField,
  MuiFormControlLabel,
  MuiSwitch,
};
