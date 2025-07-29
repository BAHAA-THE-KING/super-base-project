import { Stack } from "@mui/material";

import { SpecialMaterialRequest } from "../../data";
import { SpecialMaterialForm } from "src/views/pages/RequestAdd/components";

type Props = {
  request: SpecialMaterialRequest;
};

export function ShowSpecialMaterialRequest({ request }: Props) {
  return (
    <Stack>
      <SpecialMaterialForm
        beneficiaryId={request.beneficiary.id}
        requestMode
        requestId={request.id}
      />
    </Stack>
  );
}
