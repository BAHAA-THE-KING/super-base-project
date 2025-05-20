import { Avatar } from "@mui/material";
import { Card, CardContent, Stack } from "@mui/material";

import { BCheckbox, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { PlanBeneficiary } from "src/views/pages/Plans/data";

type Props = {
  nextBeneficiaries: PlanBeneficiary[];
};

const i18ns = ["order", "add_new_condition"];
export function NextBeneficiariesPlanInfo({ nextBeneficiaries }: Props) {
  const [OrderText, AddNewConditionText] = useBaseTranslation(i18ns);

  return (
    <Card
      sx={{
        m: 1,
        width: "100%",
      }}
    >
      <CardContent>
        <BTypography variant="h5" fontWeight={"bold"}>
          {OrderText}
        </BTypography>
      </CardContent>
      <CardContent>
        <Stack>
          {nextBeneficiaries.map((beneficiary, i) => (
            <Stack
              key={beneficiary.id}
              flexDirection={"row"}
              justifyContent={"flex-start"}
              alignItems={"center"}
              my={1}
            >
              <BCheckbox checked={beneficiary.has_taken} />
              <Avatar src={""} />
              <BTypography>
                {beneficiary.first_name +
                  " " +
                  beneficiary.father_name +
                  " " +
                  beneficiary.last_name}
              </BTypography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
