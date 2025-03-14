import { useMemo, useRef } from "react";
import { CacheProvider } from "@emotion/react";
import {
  Box,
  BoxProps,
  createTheme,
  styled,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import { DataGrid, DataGridProps, GridToolbar } from "@mui/x-data-grid";
import { arSD, enUS } from "@mui/x-data-grid/locales";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";

import { usePreferredLanguage } from "src/globals";
import { BaseTooltip } from "../BaseTooltip";

const cacheRtl = createCache({
  key: "data-grid-rtl-demo",
  stylisPlugins: [prefixer, rtlPlugin],
});

type BaseDataGridProps = DataGridProps & {
  containerProps?: BoxProps;
};

const StyledDataGrid = styled(
  ({ containerProps = {}, ...dataGridProps }: BaseDataGridProps) => {
    const existingTheme = useTheme();
    const [language] = usePreferredLanguage();
    const locale = language === "ar" ? arSD : enUS;

    const theme = useMemo(
      () => createTheme({}, locale, existingTheme),
      [existingTheme, locale]
    );

    return (
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <Box
            {...containerProps}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <DataGrid
              {...dataGridProps}
              slots={{
                toolbar: GridToolbar,
                baseTooltip: BaseTooltip,
              }}
            />
          </Box>
        </ThemeProvider>
      </CacheProvider>
    );
  }
)(() => ({}));

export function BaseDataGrid(props: BaseDataGridProps) {
  return <StyledDataGrid {...props} />;
}
