import { useMemo } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Stack, SvgIcon } from "@mui/material";

import {
  AttachMoney as AttachMoneyIcon,
  Inventory as InventoryIcon,
  QrCodeScanner as QrCodeScannerIcon,
} from "@mui/icons-material";
import { FaHandHoldingUsd as FaHandHoldingUsdIcon } from "react-icons/fa";
import { FiPackage as FiPackageIcon } from "react-icons/fi";
import { FaPrescriptionBottleAlt as FaPrescriptionBottleAltIcon } from "react-icons/fa";

import { BButton, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { AvailableAid } from "src/types/data/AvailableAid";

const i18ns = [
  "aid_type",
  "monthly_salary",
  "aids",
  "emergency_aids",
  "special_materials",
  "prescription_exchange",
  "aid_description",
  "valid_until",
  "give_him",
  "salary_amount",
  "no.",
  "for",
];
export function useAvailableAidsColumns(
  onGiveHim: (aid: AvailableAid) => void
) {
  const [
    AidTypeText,
    MonthlySalaryText,
    AidsText,
    EmergencyAidsText,
    SpecialMaterialsText,
    PrescriptionExchangeText,
    AidDescriptionText,
    ValidUntilText,
    GiveHimText,
    SalaryAmountText,
    NOText,
    ForText,
  ] = useBaseTranslation(i18ns);
  return useMemo<GridColDef<AvailableAid>[]>(
    () => [
      {
        field: "type",
        filterable: false,
        headerName: AidTypeText,
        flex: 1,
        renderCell: ({ value }) => (
          <Stack
            direction={"row"}
            width={"100%"}
            height={"100%"}
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            {value === "monthly salary" ? (
              <AttachMoneyIcon color="success" />
            ) : value === "aids" ? (
              <SvgIcon color="primary">
                <FiPackageIcon />
              </SvgIcon>
            ) : value === "emergency aids" ? (
              <SvgIcon color="warning">
                <FaHandHoldingUsdIcon />
              </SvgIcon>
            ) : value === "special materials" ? (
              <InventoryIcon color="secondary" />
            ) : value === "prescription exchange" ? (
              <SvgIcon color="error">
                <FaPrescriptionBottleAltIcon />
              </SvgIcon>
            ) : (
              ""
            )}
            <BTypography fontWeight={"bold"} marginInlineStart={3}>
              {value === "monthly salary"
                ? MonthlySalaryText
                : value === "aids"
                ? AidsText
                : value === "emergency aids"
                ? EmergencyAidsText
                : value === "special materials"
                ? SpecialMaterialsText
                : value === "prescription exchange"
                ? PrescriptionExchangeText
                : ""}
            </BTypography>
          </Stack>
        ),
      },
      {
        field: "amount",
        filterable: false,
        headerName: AidDescriptionText,
        flex: 1,
        valueGetter: (value, row) =>
          row.type === "monthly salary"
            ? `${SalaryAmountText} ${value}`
            : row.type === "aids"
            ? `${row.category_name} ${NOText} ${value}`
            : row.type === "prescription exchange"
            ? `${row.reason}`
            : row.type === "special materials"
            ? `${row.category_name} ${NOText} ${value}`
            : row.type === "emergency aids"
            ? `${value} ${ForText} ${row.reason}`
            : "",
      },
      {
        field: "expiry_date",
        filterable: false,
        headerName: ValidUntilText,
        flex: 1,
      },
      {
        field: "receive",
        filterable: false,
        headerName: GiveHimText,
        flex: 1,
        renderCell: ({ row }) => (
          <BButton
            color="info"
            variant="contained"
            icon={<QrCodeScannerIcon fontSize="small" />}
            size="small"
            sx={{ width: "30px", height: "30px" }}
            onClick={() => onGiveHim(row)}
          />
        ),
      },
    ],
    []
  );
}
