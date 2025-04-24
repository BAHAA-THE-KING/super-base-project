import React from "react";
import { Stack } from "@mui/material";

type Props = {
  element: React.ReactNode;
};
export function InformationPart({ element }: Props) {
  return (
    <Stack
      width={"70%"}
      borderRadius={1}
      p={3}
      sx={(theme) => ({
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.grey[800]
            : theme.palette.grey[300],
      })}
    >
      {element}
    </Stack>
  );
}
