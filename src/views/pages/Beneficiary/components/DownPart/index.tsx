import { Stack } from "@mui/material";

export function DownPart() {
  return (
    <Stack
      width={"100%"}
      height={"100%"}
      sx={(theme) => ({
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.grey[800]
            : theme.palette.grey[300],
      })}
    ></Stack>
  );
}
