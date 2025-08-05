import { Stack } from "@mui/material";

import { BCircularProgress, BDataGrid } from "src/components/Base";

import { useAvailableAidsColumns } from "../../../hooks";
import { useAidsData } from "src/views/data/useBeneficiaryData";

type Props = {
  beneficiary_id: number;
};

export function AvailableAids({ beneficiary_id }: Props) {
  const { isLoading, aids } = useAidsData(beneficiary_id);

  const columns = useAvailableAidsColumns();

  return (
    <>
      {isLoading ? (
        <Stack justifyContent={"center"} alignItems={"center"}>
          <BCircularProgress />
        </Stack>
      ) : null}
      <BDataGrid columns={columns} rows={aids} />
    </>
  );
}
