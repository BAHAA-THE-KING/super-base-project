import React from "react";
import { Box, Grid2 } from "@mui/material";

import { MapsHomeWorkOutlined as MapsHomeWorkOutlinedIcon } from "@mui/icons-material";

import { BButton, BCard } from "src/components/Base";

import { useHomePageData } from "src/views/data";

import { useBaseTranslation } from "src/hooks";
import { BButtonProps } from "src/components/Base/BButton";

const i18ns = ["click_please"];
export const Buttons = ({ Component }: { Component: React.FC }) => {
  const [ClickPleaseText] = useBaseTranslation(i18ns);

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
