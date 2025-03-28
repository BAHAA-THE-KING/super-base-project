import React from "react";
import { Grid2 } from "@mui/material";

import { BCheckbox, type BCheckboxProps } from "src/components/Base";

export const Checkboxes = ({ Component }: { Component: React.FC }) => {
  const colors: BCheckboxProps["color"][] = [
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
  ];
  const sizes: BCheckboxProps["size"][] = ["medium", "small"];

  return (
    <Grid2 container spacing={2}>
      {sizes.map((size) => (
        <React.Fragment key={size}>
          <Grid2 size={{ xs: 1 }}>
            <BCheckbox size={size} />
          </Grid2>
          {colors.map((color) => (
            <Grid2 key={color} size={{ xs: 1 }}>
              <BCheckbox color={color} size={size} checked />
            </Grid2>
          ))}
          <Grid2 size={{ xs: 12 }}></Grid2>
        </React.Fragment>
      ))}
    </Grid2>
  );
};
