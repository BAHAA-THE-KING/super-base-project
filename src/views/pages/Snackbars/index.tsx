import React from "react";
import { Box, Grid2, SnackbarContent, Stack } from "@mui/material";
import {
  Close as CloseIcon,
  CheckCircleSharp as CheckCircleSharpIcon,
  WarningSharp as WarningSharpIcon,
  InfoSharp as InfoSharpIcon,
  NewReleasesSharp as NewReleasesSharpIcon,
} from "@mui/icons-material";

import { varAlpha } from "src/themes/styles";

import { BAlertProps, BButton, BSnackbarContent } from "src/components/Base";

export const Snackbars = () => {
  const colors: BAlertProps["color"][] = [
    "info",
    "success",
    "warning",
    "error",
  ];

  return (
    <Grid2 container spacing={2}>
      {colors.map((color) => (
        <React.Fragment key={color}>
          <Grid2 size={{ xs: 3 }}>
            <BSnackbarContent
              color={color}
              message={`This is ${color} Message`}
            />
          </Grid2>
        </React.Fragment>
      ))}
    </Grid2>
  );
};
