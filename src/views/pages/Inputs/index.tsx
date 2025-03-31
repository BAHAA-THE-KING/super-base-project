import React from "react";
import { Grid2 } from "@mui/material";

import { BTextField, type BTextFieldProps } from "src/components/Base";

export const Inputs = () => {
  const variants: BTextFieldProps["variant"][] = [
    "outlined",
    "filled",
    "standard",
  ];
  const sizes: BTextFieldProps["size"][] = ["medium", "small"];

  return (
    <>
      <Grid2 container spacing={2}>
        {variants.map((variant) => (
          <React.Fragment key={variant}>
            {sizes.map((size) => (
              <Grid2 key={variant + "" + size} size={{ xs: 3 }}>
                <BTextField variant={variant} size={size} label="Label" />
              </Grid2>
            ))}
            {sizes.map((size) => (
              <Grid2 key={variant + "" + size} size={{ xs: 3 }}>
                <BTextField variant={variant} size={size} label="Label" error />
              </Grid2>
            ))}
            <Grid2 size={{ xs: 12 }}></Grid2>
          </React.Fragment>
        ))}
        {variants.map((variant) => (
          <React.Fragment key={variant}>
            {sizes.map((size) => (
              <Grid2 key={variant + "" + size} size={{ xs: 3 }}>
                <BTextField
                  variant={variant}
                  size={size}
                  label="Label"
                  multiline
                  rows={3}
                />
              </Grid2>
            ))}
            {sizes.map((size) => (
              <Grid2 key={variant + "" + size} size={{ xs: 3 }}>
                <BTextField
                  variant={variant}
                  size={size}
                  label="Label"
                  error
                  multiline
                  rows={3}
                />
              </Grid2>
            ))}
            <Grid2 size={{ xs: 12 }}></Grid2>
          </React.Fragment>
        ))}
      </Grid2>
    </>
  );
};
