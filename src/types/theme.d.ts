import {
  type Palette as OriginalPalette,
  type PaletteOptions as OriginalPaletteOptions,
  type SimplePaletteColorOptions as OriginalSimplePaletteColorOptions,
  type PaletteColor as OriginalPaletteColor,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteOptions extends OriginalPaletteOptions {
    transparent: { selection: string };
  }
  interface Palette extends OriginalPalette {
    transparent: { selection: string };
  }
  interface SimplePaletteColorOptions
    extends OriginalSimplePaletteColorOptions {
    main: string;
    dark: string;
    light: string;
    contrastText: string;
    background: string;
  }
  interface PaletteColor extends OriginalPaletteColor {
    main: string;
    dark: string;
    light: string;
    contrastText: string;
    background: string;
  }
}
