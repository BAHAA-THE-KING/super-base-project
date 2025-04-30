import { useMemo } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Stack, SvgIcon } from "@mui/material";
import {
  AttachMoney as AttachMoneyIcon,
  Inventory as InventoryIcon,
} from "@mui/icons-material";
import { FaHandHoldingUsd as FaHandHoldingUsdIcon } from "react-icons/fa";
import { FiPackage as FiPackageIcon } from "react-icons/fi";
import { FaPrescriptionBottleAlt as FaPrescriptionBottleAltIcon } from "react-icons/fa";

import { BCheckbox, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { Aid } from "src/types/data/Aid";

const i18ns = [
  "aid_type",
  "monthly_salary",
  "aids",
  "emergency_aids",
  "special_materials",
  "prescription_exchange",
  "aid_description",
  "received",
  "valid_until",
  "aid_status",
  "received_by",
  "on",
  "aid_received",
];
export function useAvailableAidsColumns() {
  const [
    AidTypeText,
    MonthlySalaryText,
    AidsText,
    EmergencyAidsText,
    SpecialMaterialsText,
    PrescriptionExchangeText,
    AidDescriptionText,
    ReceivedText,
    ValidUntilText,
    AidStatusText,
    ReceivedByText,
    OnText,
    AidReceivedText,
  ] = useBaseTranslation(i18ns);
  return useMemo<GridColDef<Aid>[]>(
    () => [
      {
        field: "type",
        headerName: AidTypeText,
        flex: 1,
        renderCell: ({ value }) => (
          <Stack direction={"row"}>
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
        field: "description",
        headerName: AidDescriptionText,
        flex: 1,
      },
      {
        field: "is_collected",
        headerName: AidStatusText,
        flex: 1,
        renderCell: ({ value, row }) => (
          <>
            {value ? (
              <>
                <BCheckbox checked readOnly />
                {ReceivedText}
              </>
            ) : row.expiry_date ? (
              ValidUntilText + ": " + row.expiry_date
            ) : (
              ""
            )}
          </>
        ),
      },
      {
        field: "recipient_name",
        headerName: AidReceivedText,
        flex: 1,
        renderCell: ({ value, row }) => (
          <>
            {row.is_collected
              ? ReceivedByText +
                " " +
                value +
                " " +
                OnText +
                " " +
                row.collection_date
              : ""}
          </>
        ),
      },
    ],
    []
  );
}
