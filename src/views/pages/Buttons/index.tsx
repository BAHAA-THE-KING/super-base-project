import React from "react";
import { Grid2 } from "@mui/material";

import { BButton } from "src/components/Base";

import { useHomePageData } from "src/views/data";

import { BButtonProps } from "src/components/Base/BButton";

export const Buttons = ({ Component }: { Component: React.FC }) => {
  const {} = useHomePageData();

  const colors: BButtonProps["color"][] = [
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
  ];
  const sizes: BButtonProps["size"][] = ["large", "medium", "small"];
  const variants: BButtonProps["variant"][] = [
    "contained",
    "outlined",
    "text",
    "soft",
  ];

  return (
    <>
      <Grid2 container spacing={2}>
        {colors.map((color) => (
          <React.Fragment key={color}>
            {variants.map((variant) =>
              sizes.map((size) => (
                <Grid2 key={variant + "" + size} size={{ xs: 1 }}>
                  <BButton variant={variant} color={color} size={size}>
                    {size}
                  </BButton>
                </Grid2>
              ))
            )}
            <Grid2 size={{ xs: 12 }}></Grid2>
          </React.Fragment>
        ))}
      </Grid2>
    </>
  );
};
