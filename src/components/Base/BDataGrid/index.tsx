import React, { useMemo } from "react";
import { CacheProvider } from "@emotion/react";
import {
  Box,
  BoxProps,
  createTheme,
  CssBaseline,
  styled,
  ThemeProvider,
} from "@mui/material";
import { DataGrid, DataGridProps, GridToolbar } from "@mui/x-data-grid";
import { arSD, enUS } from "@mui/x-data-grid/locales";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";

import { useDirection, usePreferredLanguage } from "src/globals";
import { BTooltip } from "..";

const cacheRtl = createCache({
  key: "data-grid-rtl-demo",
  stylisPlugins: [prefixer, rtlPlugin],
});

type BDataGridProps = DataGridProps & {
  containerProps?: BoxProps;
};

const StyledDataGrid = styled(
  ({ containerProps, ...props }: BDataGridProps) => {
    const [language] = usePreferredLanguage();
    const locale = language === "ar" ? arSD : enUS;
    const [direction] = useDirection();

    const theme = useMemo(
      () => createTheme({ direction }, locale),
      [direction, locale]
    );

    const Grid = React.memo(() => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box {...containerProps} sx={{ width: "100%" }}>
          <DataGrid
            {...props}
            slots={{
              toolbar: GridToolbar,
              baseTooltip: BTooltip,
            }}
          />
        </Box>
      </ThemeProvider>
    ));

    return direction === "rtl" ? (
      <CacheProvider value={cacheRtl}>
        <Grid />
      </CacheProvider>
    ) : (
      <Grid />
    );
  }
)(() => ({}));

export function BDataGrid({ ...props }: BDataGridProps) {
  return <StyledDataGrid {...props} />;
}
