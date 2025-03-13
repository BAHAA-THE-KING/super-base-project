import { useTheme } from "@mui/material";

export function useBreakpoints() {
  const theme = useTheme();
  return theme.breakpoints;
}
