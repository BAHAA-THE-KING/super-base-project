import React from "react";
import { Grid2 } from "@mui/material";

import { BSwitch, type BSwitchProps } from "src/components/Base";

export const Switches = () => {
  const colors: BSwitchProps["color"][] = [
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
  ];
  const sizes: BSwitchProps["size"][] = ["medium", "small"];

  return (
    <Grid2 container spacing={2}>
      {sizes.map((size) => (
        <React.Fragment key={size}>
          <Grid2 size={{ xs: 1 }}>
            <BSwitch size={size} />
          </Grid2>
          {colors.map((color) => (
            <Grid2 key={color} size={{ xs: 1 }}>
              <BSwitch color={color} size={size} checked />
            </Grid2>
          ))}
          <Grid2 size={{ xs: 12 }}></Grid2>
        </React.Fragment>
      ))}
    </Grid2>
  );
};
