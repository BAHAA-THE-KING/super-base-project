import { Stack } from "@mui/material";
import { useParams } from "react-router";

import { BButton, BCircularProgress } from "src/components/Base";
import { RequestsTable } from "./components";

import { useBaseTranslation } from "src/hooks";

import { useRequestsData } from "./data";

const i18ns = ["add_request"];
export function ShowBeneficiaryRequests() {
  const { beneficiaryId } = useParams();

  const [AddRequestText] = useBaseTranslation(i18ns);

  const { isLoading, requests } = useRequestsData(Number(beneficiaryId));

  return (
    <Stack alignItems={"flex-start"}>
      {isLoading ? (
        <Stack justifyContent={"center"} alignItems={"center"}>
          <BCircularProgress />
        </Stack>
      ) : null}
      <BButton variant="contained" sx={{ mb: 2 }}>
        {AddRequestText}
      </BButton>
      <RequestsTable requests={requests} />
    </Stack>
  );
}
