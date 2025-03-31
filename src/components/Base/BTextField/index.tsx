import { styled, TextField, TextFieldProps } from "@mui/material";

import { varAlpha } from "src/themes/styles";

export type BTextFieldProps = TextFieldProps;

export const BTextField = styled(TextField)(({ theme, error }) => {
  return theme.unstable_sx({
    /* Global */
    ".Mui-focused.MuiFormLabel-root": {
      color:
        (error
          ? theme.palette.error.main
          : theme.palette.mode === "dark"
          ? theme.palette.grey[200]
          : theme.palette.grey[800]) + " !important",
      fontWeight: "600",
    },

    /* Outlined */
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: varAlpha(theme.palette.grey["500Channel"], 0.2),
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor:
        (error
          ? theme.palette.error.main
          : theme.palette.mode === "dark"
          ? theme.palette.grey[200]
          : theme.palette.grey[800]) + " !important",
    },
    ".Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor:
        (error
          ? theme.palette.error.main
          : theme.palette.mode === "dark"
          ? theme.palette.grey[200]
          : theme.palette.grey[800]) + " !important",
      borderWidth: "2px",
    },

    /* Filled */
    ".MuiFilledInput-root": {
      borderRadius: "10px",
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
        : theme.palette.mode === "dark"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
    },
    ".Mui-focused.MuiInput-underline::after": {
      borderBottomWidth: "2px",
    },
  });
});
