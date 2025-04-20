import React from "react";
import { Stack } from "@mui/material";

type Props = {
  element: React.ReactNode;
};
export function DownPart({ element }: Props) {
  return (
    <Stack
      width={"100%"}
      sx={(theme) => ({
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        p: 3,
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
