import React from "react";
import { Grid2 } from "@mui/material";

import {
  BCircularProgress,
  BLinearProgress,
  type BCircularProgressProps,
} from "src/components/Base";

export const Progresses = ({ Component }: { Component: React.FC }) => {
  const colors: BCircularProgressProps["color"][] = [
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
  ];

  return (
    <Grid2 container spacing={2}>
      {colors.map((color) => (
        <Grid2 key={color} size={{ xs: 1 }}>
          <BCircularProgress color={color} value={80} label={"80%"} />
        </Grid2>
      ))}
      <Grid2 size={{ xs: 12 }}></Grid2>
      {colors.map((color) => (
        <Grid2 key={color} size={{ xs: 6 }}>
          <BLinearProgress color={color} value={80} label={"80%"} />
        </Grid2>
      ))}
    </Grid2>
  );
};
