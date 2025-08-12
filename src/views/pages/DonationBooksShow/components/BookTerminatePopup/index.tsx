import { Box } from "@mui/material";

import { BButton, BTypography } from "src/components/Base";
import { Popup } from "src/components";

import { useBaseTranslation } from "src/hooks";

import { DonationBook } from "src/types/data/DonationBook";

type Props = {
  book: DonationBook | null;
  handleTerminate: () => void;
  close: () => void;
};

const i18ns = ["you_sure_to_terminate_plan", "yes_terminate_it"];
export function BookTerminatePopup({ book, handleTerminate, close }: Props) {
  const [YouSureDoTerminatePlanText, YesTerminateItText] =
    useBaseTranslation(i18ns);
  return (
    <Popup open={Boolean(book)} close={close}>
      <BTypography variant="h5">{YouSureDoTerminatePlanText}</BTypography>
      <BTypography fontSize={"large"} mt={3}>
        {book?.number}
      </BTypography>
      <Box mt={5}>
        <BButton variant="contained" color="error" onClick={handleTerminate}>
          {YesTerminateItText}
        </BButton>
      </Box>
    </Popup>
  );
}
