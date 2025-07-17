import { Box } from "@mui/material";

import { BButton, BTypography } from "src/components/Base";
import { Popup } from "src/components";

import { useBaseTranslation } from "src/hooks";

type Props = {
  doctor: {
    id: number;
    name: string;
  } | null;
  handleDelete: () => void;
  close: () => void;
};

const i18ns = ["you_sure_to_terminate_doctor", "yes_terminate_it", "que"];
export function DoctorDeletePopup({ doctor, handleDelete, close }: Props) {
  const [YouSureDoTerminateDoctorText, YesTerminateHimText, QueText] =
    useBaseTranslation(i18ns);
  return (
    <Popup open={Boolean(doctor)} close={close}>
      <BTypography variant="h5">
        {YouSureDoTerminateDoctorText} {doctor?.name} {QueText}
      </BTypography>
      <Box mt={5}>
        <BButton variant="contained" color="error" onClick={handleDelete}>
          {YesTerminateHimText}
        </BButton>
      </Box>
    </Popup>
  );
}
