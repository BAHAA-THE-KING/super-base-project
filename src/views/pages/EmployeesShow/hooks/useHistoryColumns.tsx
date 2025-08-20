import { useMemo } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Stack, SvgIcon } from "@mui/material";

import { FaMosque } from "react-icons/fa6";
import { IoTicket } from "react-icons/io5";
import { RiBankFill } from "react-icons/ri";
import { MdEmojiEvents } from "react-icons/md";
import { FaMoneyBillWave, FaMoneyCheck } from "react-icons/fa";

import { BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { EmployeeHistory } from "src/types/data/Employee";

const i18ns = [
  "date",
  "type",
  "description",
  "expenses",
  "gain",
  "composition",
];
export function useHistoryColumns() {
  const [
    DateText,
    TypeText,
    DescriptionText,
    ExpensesText,
    GainText,
    CompositionText,
  ] = useBaseTranslation(i18ns);

  return useMemo<GridColDef<EmployeeHistory>[]>(
    () => [
      {
        field: "date",
        headerName: DateText,
        flex: 1,
      },
      {
        field: "type",
        headerName: TypeText,
        renderCell: ({ value, row: { icon } }) => (
          <Stack
            direction={"row"}
            width={"100%"}
            height={"100%"}
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            {icon === "mosque" ? (
              <SvgIcon color="success">
                <FaMosque />
              </SvgIcon>
            ) : icon === "donation_book" ? (
              <SvgIcon color="primary">
                <IoTicket />
              </SvgIcon>
            ) : icon === "bill" ? (
              <SvgIcon color="warning">
                <RiBankFill />
              </SvgIcon>
            ) : icon === "event" ? (
              <SvgIcon color="secondary">
                <MdEmojiEvents />
              </SvgIcon>
            ) : icon === "card" ? (
              <SvgIcon color="error">
                <FaMoneyCheck />
              </SvgIcon>
            ) : icon === "other" ? (
              <SvgIcon color="info">
                <FaMoneyBillWave />
              </SvgIcon>
            ) : (
              ""
            )}
            <BTypography fontWeight={"bold"} marginInlineStart={3}>
              {value}
            </BTypography>
          </Stack>
        ),
        flex: 2,
      },
      {
        field: "expenses",
        headerName: ExpensesText,
        flex: 1,
      },
      {
        field: "gain",
        headerName: GainText,
        flex: 1,
      },
      {
        field: "composition",
        headerName: CompositionText,
        flex: 1,
      },
      {
        field: "description",
        headerName: DescriptionText,
        flex: 5,
      },
    ],
    []
  );
}
