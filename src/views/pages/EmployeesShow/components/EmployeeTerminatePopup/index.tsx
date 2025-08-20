import { Box } from "@mui/material";

import { BButton, BTypography } from "src/components/Base";
import { Popup } from "src/components";

import { useBaseTranslation } from "src/hooks";

import { Employee } from "src/types/data/Employee";

type Props = {
  employee: Employee | null;
  handleTerminate: () => void;
  close: () => void;
};

const i18ns = ["you_sure_to_terminate_employee", "yes_terminate_him"];
export function EmployeeTerminatePopup({
  employee,
  handleTerminate,
  close,
}: Props) {
  const [YouSureDoTerminateEmployeeText, YesTerminateHimText] =
    useBaseTranslation(i18ns);
  return (
    <Popup open={Boolean(employee)} close={close}>
      <BTypography variant="h5">{YouSureDoTerminateEmployeeText}</BTypography>
      <BTypography fontSize={"large"} mt={3}>
        {employee?.first_name} {employee?.last_name}
      </BTypography>
      <Box mt={5}>
        <BButton variant="contained" color="error" onClick={handleTerminate}>
          {YesTerminateHimText}
        </BButton>
      </Box>
    </Popup>
  );
}
