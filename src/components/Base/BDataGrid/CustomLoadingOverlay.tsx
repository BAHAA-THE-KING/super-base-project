import { Stack } from "@mui/material";
import { Skeleton } from "@mui/material";
import { GridLoadingOverlayProps } from "@mui/x-data-grid";


export function CustomLoadingOverlay(props: GridLoadingOverlayProps) {
  return (
    <Stack gap={1} {...props} px={3}>
      <Skeleton variant="rounded" height={50} />
      <Skeleton variant="rounded" height={50} />
      <Skeleton variant="rounded" height={50} />
      <Skeleton variant="rounded" height={50} />
      <Skeleton variant="rounded" height={50} />
      <Skeleton variant="rounded" height={50} />
    </Stack>
  );
}
