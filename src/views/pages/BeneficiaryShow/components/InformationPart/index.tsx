import React from "react";
import { Stack } from "@mui/material";
import { varAlpha } from "src/themes/styles";

type Props = {
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  element: React.ReactNode;
};
export function InformationPart({ element, color }: Props) {
  return (
    <Stack
      width={"80%"}
      borderRadius={1}
      p={3}
      sx={(theme) => ({
        backgroundColor:
          color &&
          (theme.palette.mode === "dark"
            ? varAlpha(theme.palette[color].darkerChannel, 0.2)
            : theme.palette[color].lighter),
      })}
    >
      {element}
    </Stack>
  );
}
