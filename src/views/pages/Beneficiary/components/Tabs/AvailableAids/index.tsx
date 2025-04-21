import {
  Checkbox,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import {
  AttachMoney as AttachMoneyIcon,
  Inventory as InventoryIcon,
} from "@mui/icons-material";
import { FaHandHoldingUsd as FaHandHoldingUsdIcon } from "react-icons/fa";
import { FiPackage as FiPackageIcon } from "react-icons/fi";
import { FaPrescriptionBottleAlt as FaPrescriptionBottleAltIcon } from "react-icons/fa";

import { BCircularProgress, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";
import { useAidsData } from "../../../data";

type Props = {
  beneficiary_id: number;
};

const i18ns = [
  "monthly_salary",
  "aids",
  "emergency_aids",
  "special_materials",
  "prescription_exchange",
  "received",
  "valid_until",
  "received_by",
  "on",
];
export function AvailableAids({ beneficiary_id }: Props) {
  const [
    MonthlySalaryText,
    AidsText,
    EmergencyAidsText,
    SpecialMaterialsText,
    PrescriptionExchangeText,
    ReceivedText,
    ValidUntilText,
    ReceivedByText,
    OnText,
  ] = useBaseTranslation(i18ns);
  const { isLoading, aids } = useAidsData(beneficiary_id);

  return (
    <>
      {isLoading ? (
        <Stack justifyContent={"center"} alignItems={"center"}>
          <BCircularProgress />
        </Stack>
      ) : null}
      <TableContainer>
        <Table>
          <TableBody>
            {aids.map((aid) => (
              <TableRow
                key={aid.id}
                sx={(theme) => ({
                  borderBlockEnd: `1px solid ${theme.palette.divider}`,
                  "&:last-child": {
                    borderBlockEnd: "none",
                  },
                  td: { wordBreak: "keep-all", whiteSpace: "nowrap" },
                })}
              >
                <TableCell>
                  {aid.type === "monthly salary" ? (
                    <AttachMoneyIcon color="success" />
                  ) : aid.type === "aids" ? (
                    <SvgIcon color="primary">
                      <FiPackageIcon />
                    </SvgIcon>
                  ) : aid.type === "emergency aids" ? (
                    <SvgIcon color="warning">
                      <FaHandHoldingUsdIcon />
                    </SvgIcon>
                  ) : aid.type === "special materials" ? (
                    <InventoryIcon color="secondary" />
                  ) : aid.type === "prescription exchange" ? (
                    <SvgIcon color="error">
                      <FaPrescriptionBottleAltIcon />
                    </SvgIcon>
                  ) : (
                    ""
                  )}
                </TableCell>
                <TableCell>
                  <BTypography fontWeight={"bold"}>
                    {aid.type === "monthly salary"
                      ? MonthlySalaryText
                      : aid.type === "aids"
                      ? AidsText
                      : aid.type === "emergency aids"
                      ? EmergencyAidsText
                      : aid.type === "special materials"
                      ? SpecialMaterialsText
                      : aid.type === "prescription exchange"
                      ? PrescriptionExchangeText
                      : ""}
                  </BTypography>
                </TableCell>
                <TableCell>{aid.description}</TableCell>
                <TableCell>
                  {aid.is_collected ? (
                    <>
                      <Checkbox checked readOnly />
                      {ReceivedText}
                    </>
                  ) : aid.expiry_date ? (
                    ValidUntilText + ": " + aid.expiry_date
                  ) : (
                    ""
                  )}
                </TableCell>
                <TableCell>
                  {aid.is_collected
                    ? ReceivedByText +
                      " " +
                      aid.recipient_name +
                      " " +
                      OnText +
                      " " +
                      aid.collection_date
                    : ""}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
