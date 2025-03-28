import React from "react";
import { Grid2, Radio, Switch, type SwitchProps } from "@mui/material";

export const Radios = ({ Component }: { Component: React.FC }) => {
  const colors: SwitchProps["color"][] = [
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
  ];
  const sizes: SwitchProps["size"][] = ["medium", "small"];

  return (
    <Grid2 container spacing={2}>
      {sizes.map((size) => (
        <React.Fragment key={size}>
          <Grid2 size={{ xs: 1 }}>
            <Radio size={size} />
          </Grid2>
          {colors.map((color) => (
            <Grid2 key={color} size={{ xs: 1 }}>
              <Radio color={color} size={size} checked />
            </Grid2>
          ))}
          <Grid2 size={{ xs: 12 }}></Grid2>
        </React.Fragment>
      ))}
    </Grid2>
  );
};
