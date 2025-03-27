import React from "react";
import { useForm } from "react-hook-form";
import { Grid2, TextField, type TextFieldProps } from "@mui/material";

import { useBaseTranslation } from "src/hooks";

const i18ns = ["click_please"];
export const Inputs = ({ Component }: { Component: React.FC }) => {
  const [ClickPleaseText] = useBaseTranslation(i18ns);

  const variants: TextFieldProps["variant"][] = [
    "outlined",
    "filled",
    "standard",
  ];
  const sizes: TextFieldProps["size"][] = ["medium", "small"];

  return (
    <>
      <Grid2 container spacing={2}>
        {variants.map((variant) => (
          <React.Fragment key={variant}>
            {sizes.map((size) => (
              <Grid2 key={variant + "" + size} size={{ xs: 3 }}>
                <TextField variant={variant} size={size} label="Label" />
              </Grid2>
            ))}
            <Grid2 size={{ xs: 12 }}></Grid2>
          </React.Fragment>
        ))}
      </Grid2>
    </>
  );
};
