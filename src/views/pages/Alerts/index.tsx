import React from "react";
import { Grid2 } from "@mui/material";
import { BAlert, type BAlertProps } from "src/components/Base";

export const Alerts = ({ Component }: { Component: React.FC }) => {
  const colors: BAlertProps["color"][] = [
    "info",
    "success",
    "warning",
    "error",
  ];
  const variants: BAlertProps["variant"][] = ["filled", "outlined", "standard"];

  return (
    <Grid2 container spacing={2}>
      {variants.map((variant) =>
        colors.map((color) => (
          <React.Fragment key={variant + "" + color}>
            <Grid2 size={{ xs: 6 }}>
              <BAlert severity={color} color={color} variant={variant}>
                This is an {color} alert — check it out!
              </BAlert>
            </Grid2>
          </React.Fragment>
        ))
      )}
    </Grid2>
  );
};
