import { Box } from "@mui/material";

import { BButton, BTypography } from "src/components/Base";
import { Popup } from "src/components";

import { useBaseTranslation } from "src/hooks";
import { Plan } from "src/views/pages/Plans/data";

type Props = {
  plan: Plan | null;
  handleTerminate: () => void;
  close: () => void;
};

const i18ns = [
  "you_sure_to_terminate_plan",
  "the_plan_completeness_is",
  "yes_terminate_it",
];
export function PlanTerminatePopup({ plan, handleTerminate, close }: Props) {
  const [
    YouSureDoTerminatePlanText,
    ThePlanCompletenessIsText,
    YesTerminateItText,
  ] = useBaseTranslation(i18ns);
  return (
    <Popup open={Boolean(plan)} close={close}>
      <BTypography variant="h5">{YouSureDoTerminatePlanText}</BTypography>
      <BTypography fontSize={"large"} mt={3}>
        {plan?.name}
      </BTypography>
      <BTypography>
        {ThePlanCompletenessIsText} {plan?.percent}%
      </BTypography>
      <Box mt={5}>
        <BButton variant="contained" color="error" onClick={handleTerminate}>
          {YesTerminateItText}
        </BButton>
      </Box>
    </Popup>
  );
}
