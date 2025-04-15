import { Box } from "@mui/material";

import { useData } from "./data";
import { useParams } from "react-router";

export function ShowBeneficiaries() {
  const { beneficiaryId } = useParams();
  const beneficiary = useData(Number(beneficiaryId));

  return <Box>{beneficiary.first_name}</Box>;
}
