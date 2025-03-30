// ----------------------------------------------------------------------

export interface CustomShadows {
  z1?: string;
  z4?: string;
  z8?: string;
  z12?: string;
  z16?: string;
  z20?: string;
  z24?: string;
  //
  primary?: string;
  secondary?: string;
  info?: string;
  success?: string;
  warning?: string;
  error?: string;
  //
  card?: string;
  dialog?: string;
  dropdown?: string;
}

declare module "@mui/material/styles" {
  interface Theme {
    customShadows: CustomShadows;
  }
  interface ThemeOptions {
    customShadows?: CustomShadows;
  }
  interface ThemeVars {
    customShadows: CustomShadows;
  }
}

// ----------------------------------------------------------------------

declare module "@mui/material/styles/createPalette" {
  interface CommonColors {
    whiteChannel: string;
    blackChannel: string;
  }
  interface TypeText {
    disabledChannel: string;
  }
  interface TypeBackground {
    neutral: string;
    neutralChannel: string;
  }
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
    mainChannel: string;
    lighterChannel: string;
    darkerChannel: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
    mainChannel: string;
    lighterChannel: string;
    darkerChannel: string;
  }
}

declare module "@mui/material/styles" {
  interface ThemeVars {
    transitions: Theme["transitions"];
  }
}

declare module "@mui/material" {
  interface Color {
    ["50Channel"]: string;
    ["100Channel"]: string;
    ["200Channel"]: string;
    ["300Channel"]: string;
    ["400Channel"]: string;
    ["500Channel"]: string;
    ["600Channel"]: string;
    ["700Channel"]: string;
    ["800Channel"]: string;
    ["900Channel"]: string;
  }
}

export type ColorType =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error";

export type GradientType = "light" | "main" | "bold";

// ----------------------------------------------------------------------

declare module "@mui/material/styles" {
  interface TypographyVariants {
    fontSecondaryFamily: React.CSSProperties["fontFamily"];
    fontWeightSemiBold: React.CSSProperties["fontWeight"];
  }
  interface TypographyVariantsOptions {
    fontSecondaryFamily?: React.CSSProperties["fontFamily"];
    fontWeightSemiBold?: React.CSSProperties["fontWeight"];
  }
  interface ThemeVars {
    typography: Theme["typography"];
  }
}

// ----------------------------------------------------------------------

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    soft;
  }
}
