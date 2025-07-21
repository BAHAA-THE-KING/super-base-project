import { Stack } from "@mui/material";
import { BCircularProgress } from "../Base";

export function LoadingPage() {
  return (
    <Stack
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bgcolor: "#000C",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "200000",
      }}
    >
      <BCircularProgress />
    </Stack>
  );
}
