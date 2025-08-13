import { useState } from "react";
import { CardContent } from "@mui/material";

import { Add as AddIcon } from "@mui/icons-material";

import { BButton, BCard, BDataGrid, BTypography } from "src/components/Base";
import { BatchPopup } from "..";

import { useBaseTranslation } from "src/hooks";
import { useBatchColumns } from "../../hooks";

import { Batch, DonationBook } from "src/types/data/DonationBook";

type Props = {
  book: DonationBook;
};

const i18ns = ["batches", "add_new_batch"];
export function BatchesInfo({ book }: Props) {
  const [BatchesText, AddNewBatchText] = useBaseTranslation(i18ns);

  const columns = useBatchColumns();

  const [popupOpen, setPopupOpen] = useState(false);

  const batches: Batch[] = book.batches ?? [];

  return (
    <BCard sx={{ m: 1 }} animations={{ transitions: "slideInBottom" }}>
      <CardContent>
        <BTypography variant="h5" fontWeight={"bold"}>
          {BatchesText}
        </BTypography>
      </CardContent>
      <CardContent>
        <BButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setPopupOpen(true)}
        >
          {AddNewBatchText}
        </BButton>
        <BatchPopup
          open={popupOpen}
          close={() => setPopupOpen(false)}
          book={book}
        />
      </CardContent>
      <CardContent>
        <BDataGrid columns={columns} rows={batches} checkboxSelection />
      </CardContent>
    </BCard>
  );
}
