import { Stack } from "@mui/material";
import {
  GridColDef,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

import { BChip } from "../BChip";

import { useBaseTranslation } from "src/hooks";

type Props = {
  filters?: {
    id: string | number;
    field: string;
    operator: string;
    value: string | number;
  }[];
  removeFilter: (id: string) => void;
  columns: readonly GridColDef[];
};

const i18ns = [
  "contains",
  "equals",
  "greater",
  "greater_or_equals",
  "less",
  "less_or_equals",
  "after",
  "after_or_equals",
  "before",
  "before_or_equals",
];

export function CustomGridToolbar({ filters, removeFilter, columns }: Props) {
  const [
    ContainsText,
    EqualsText,
    GreaterText,
    GreaterOrEqualsText,
    LessText,
    LessOrEqualsText,
    AfterText,
    AfterOrEqualsText,
    BeforeText,
    BeforeOrEqualsText,
  ] = useBaseTranslation(i18ns);
  return (
    <GridToolbarContainer>
      <Stack
        flexDirection={"row"}
        width={"100%"}
        justifyContent={"space-between"}
      >
        <Stack flexDirection={"row"}>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </Stack>
        <Stack mx={2}>{/* <GridToolbarQuickFilter /> */}</Stack>
      </Stack>
      <Stack flexDirection={"row"} flexWrap={"wrap"} mb={2}>
        {filters?.map((item) => {
          const OperatorText =
            item.operator === "="
              ? EqualsText
              : item.operator === ">"
              ? GreaterText
              : item.operator === ">="
              ? GreaterOrEqualsText
              : item.operator === "<"
              ? LessText
              : item.operator === "<="
              ? LessOrEqualsText
              : item.operator === "contains"
              ? ContainsText
              : item.operator === "equals"
              ? EqualsText
              : item.operator === "after"
              ? AfterText
              : item.operator === "after_or_equals"
              ? AfterOrEqualsText
              : item.operator === "before"
              ? BeforeText
              : item.operator === "before_or_equals"
              ? BeforeOrEqualsText
              : item.operator === "is"
              ? EqualsText
              : item.operator;
          return (
            <BChip
              key={item.id}
              label={
                columns.find((e) => e.field === item.field)?.headerName +
                " " +
                OperatorText +
                " " +
                (item.value instanceof Date
                  ? item.value.toLocaleDateString("")
                  : item.value)
              }
              onDelete={() => removeFilter(item.id.toString())}
              variant="slight"
              color="primary"
              sx={{ mx: 0.5 }}
              animations={{ transitions: "popIn" }}
            />
          );
        })}
      </Stack>
    </GridToolbarContainer>
  );
}
