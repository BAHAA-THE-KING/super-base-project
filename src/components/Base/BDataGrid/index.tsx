import { Box, BoxProps, styled } from "@mui/material";
import { DataGrid, type DataGridProps } from "@mui/x-data-grid";
import { arSD, enUS } from "@mui/x-data-grid/locales";

import { BTooltip } from "..";

import { usePreferredLanguage } from "src/globals";

import { varAlpha } from "src/themes/styles";

import { CustomGridToolbar } from "./CustomGridToolbar";
import { CustomLoadingOverlay } from "./CustomLoadingOverlay";

type BDataGridProps = DataGridProps & {
  containerProps?: BoxProps;
  filters?: {
    id: string | number;
    field: string;
    operator: string;
    value: string | number;
  }[];
  onFilterChange?: (
    func:
      | {
          id: string;
          field: string;
          operator: string;
          value: string;
        }[]
      | ((
          filters: {
            id: string;
            field: string;
            operator: string;
            value: string;
          }[]
        ) => void)
  ) => void;
};

const StyledDataGrid = styled(DataGrid)(({ theme }) =>
  theme.unstable_sx({
    ".MuiDataGrid-row:nth-child(2n+1)": {
      bgcolor: varAlpha(theme.palette.grey["500Channel"], 0.2),
    },
  })
);

export function BDataGrid({
  containerProps,
  filters,
  onFilterChange,
  ...props
}: BDataGridProps) {
  const [language] = usePreferredLanguage();
  const locale = language === "ar" ? arSD : enUS;

  const removeFilter = (id: string) => {
    onFilterChange &&
      onFilterChange((filters) => filters.filter((e) => e.id !== id));
  };

  return (
    <Box
      {...containerProps}
      sx={{ width: "100%", height: "100%", minHeight: "400px" }}
    >
      <StyledDataGrid
        {...props}
        slots={{
          toolbar: CustomGridToolbar,
          baseTooltip: BTooltip,
          loadingOverlay: CustomLoadingOverlay,
        }}
        slotProps={{
          toolbar: {
            filters,
            removeFilter,
            columns: props.columns,
          },
        }}
        localeText={locale.components.MuiDataGrid.defaultProps.localeText}
        //filters
        onFilterModelChange={({ items }, { reason }) => {
          if (reason === "upsertFilterItem")
            onFilterChange &&
              onFilterChange((filters) => {
                const index = filters.findIndex(
                  (e) => e.id === items[0].id!.toString()
                );

                if (index !== -1) {
                  const newFilters = [...filters];
                  newFilters[index].field = items[0].field;
                  newFilters[index].operator = items[0].operator;
                  newFilters[index].value = items[0].value;
                  return newFilters;
                }
                return [
                  ...filters,
                  {
                    id: items[0].id!.toString(),
                    field: items[0].field,
                    operator: items[0].operator,
                    value: items[0].value,
                  },
                ];
              });
        }}
        filterMode="server"
      />
    </Box>
  );
}
