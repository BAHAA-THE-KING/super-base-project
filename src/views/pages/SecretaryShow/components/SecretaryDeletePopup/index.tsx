import { Box } from "@mui/material";

import { BButton, BTypography } from "src/components/Base";
import { Popup } from "src/components";

import { useBaseTranslation } from "src/hooks";

type Props = {
  secretary: {
    id: number;
    name: string;
  } | null;
  handleDelete: () => void;
  close: () => void;
};

const i18ns = ["you_sure_to_terminate_secretary", "yes_terminate_it", "que"];
export function SecretaryDeletePopup({
  secretary,
  handleDelete,
  close,
}: Props) {
  const [YouSureDoTerminateSecretaryText, YesTerminateHimText, QueText] =
    useBaseTranslation(i18ns);
  return (
    <Popup open={Boolean(secretary)} close={close}>
      <BTypography variant="h5">
        {YouSureDoTerminateSecretaryText} {secretary?.name} {QueText}
      </BTypography>
      <Box mt={5}>
        <BButton variant="contained" color="error" onClick={handleDelete}>
          {YesTerminateHimText}
        </BButton>
      </Box>
    </Popup>
  );
}
