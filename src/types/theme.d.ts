import {
  type OriginalPalette,
  type OriginalPaletteOptions,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteOptions extends OriginalPaletteOptions {
    transparent: { selection: string };
  }
  interface Palette extends OriginalPalette {
    transparent: { selection: string };
  }
}
