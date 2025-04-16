import { createTheme, type Theme } from "@mui/material/styles";

import {
  shadows,
  typography,
  components,
  colorSchemes,
  customShadows,
} from "./core";

// ----------------------------------------------------------------------

function shouldSkipGeneratingVar(
  keys: string[],
  value: string | number
): boolean {
  const skipGlobalKeys = [
    "mixins",
    "overlays",
    "direction",
    "typography",
    "breakpoints",
    "transitions",
    "cssVarPrefix",
    "unstable_sxConfig",
  ];

  const skipPaletteKeys: {
    [key: string]: string[];
  } = {
    global: ["tonalOffset", "dividerChannel", "contrastThreshold"],
    grey: ["A100", "A200", "A400", "A700"],
    text: ["icon"],
  };

  const isPaletteKey = keys[0] === "palette";

  if (isPaletteKey) {
    const paletteType = keys[1];
    const skipKeys = skipPaletteKeys[paletteType] || skipPaletteKeys.global;

    return keys.some((key) => skipKeys?.includes(key));
  }

  return keys.some((key) => skipGlobalKeys?.includes(key));
}

// ----------------------------------------------------------------------

const darkTheme: Theme = createTheme({
  palette: {
    ...colorSchemes.dark?.palette,
    mode: "dark",
  }, // Adjust if using color schemes
  shadows: shadows(),
  shape: { borderRadius: 8 },
  typography,
  components,
  customShadows: customShadows(),
  cssVariables: {
    cssVarPrefix: "",
    shouldSkipGeneratingVar,
  },
});

// ----------------------------------------------------------------------

export { darkTheme };
