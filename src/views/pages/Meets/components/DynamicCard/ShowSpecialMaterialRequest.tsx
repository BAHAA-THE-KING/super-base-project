import { Stack } from "@mui/material";

import { SpecialMaterialForm } from "src/views/pages/RequestAdd/components";

import { SpecialMaterialRequest } from "src/views/data";

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
