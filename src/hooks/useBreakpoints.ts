import { Breakpoint, useMediaQuery, useTheme } from "@mui/material";

export function useBreakpoints(size: Breakpoint) {
  const { breakpoints } = useTheme();
  const greater = useMediaQuery(breakpoints.up(size));
  const lower = useMediaQuery(breakpoints.down(size));
  return {
    isGreater: greater,
    isLower: lower,
  };
}
