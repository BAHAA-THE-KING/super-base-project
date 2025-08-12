import { CardContent } from "@mui/material";

import { BButton, BCard, BDataGrid, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";
import { useBatchColumns } from "../../hooks";

import { Batch } from "src/types/data/DonationBook";

type Props = {
  batches: Batch[];
};

const i18ns = ["batches", "add_new_batch"];
export function BatchesInfo({ batches }: Props) {
  const [BatchesText, AddNewBatchText] = useBaseTranslation(i18ns);

  const columns = useBatchColumns();

  return (
    <BCard sx={{ m: 1 }} animations={{ transitions: "slideInBottom" }}>
      <CardContent>
        <BTypography variant="h5" fontWeight={"bold"}>
          {BatchesText}
        </BTypography>
      </CardContent>
      <CardContent>
        <BButton variant="contained">{AddNewBatchText}</BButton>
      </CardContent>
      <CardContent>
        <BDataGrid columns={columns} rows={batches} checkboxSelection />
      </CardContent>
    </BCard>
  );
}
