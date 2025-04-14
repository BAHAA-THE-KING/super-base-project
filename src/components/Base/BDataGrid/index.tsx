import { Box, BoxProps, styled } from "@mui/material";
import { DataGrid, DataGridProps, GridToolbar } from "@mui/x-data-grid";
import { arSD, enUS } from "@mui/x-data-grid/locales";

import { usePreferredLanguage } from "src/globals";
import { BTooltip } from "..";
import { varAlpha } from "src/themes/styles";

type BDataGridProps = DataGridProps & {
  containerProps?: BoxProps;
};

const StyledDataGrid = styled(DataGrid)(({ theme }) =>
  theme.unstable_sx({
    ".MuiDataGrid-row:nth-child(2n+1)": {
      bgcolor: varAlpha(theme.palette.grey["500Channel"], 0.2),
    },
  })
);

export function BDataGrid({ containerProps, ...props }: BDataGridProps) {
  const [language] = usePreferredLanguage();
  const locale = language === "ar" ? arSD : enUS;

  return (
    <Box
      {...containerProps}
      sx={{ width: "100%", height: "100%", minHeight: "400px" }}
    >
      <StyledDataGrid
        {...props}
        slots={{
          toolbar: GridToolbar,
          baseTooltip: BTooltip,
        }}
        localeText={locale.components.MuiDataGrid.defaultProps.localeText}
      />
    </Box>
  );
}
