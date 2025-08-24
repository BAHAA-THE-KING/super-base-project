import { CardContent, SvgIcon } from "@mui/material";
import { Control, useForm, useWatch } from "react-hook-form";

import SvgFather from "src/icons/Father";
import SvgMother from "src/icons/Mother";

import { FormInput } from "src/components";
import { BCard, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { SingleBeneficiary } from "src/types/data/SingleBeneficiary";

type Props = {
  control: Control<SingleBeneficiary>;
  beneficiaryGender: "male" | "female" | "";
  isEditable: boolean;
};

const i18ns = [
  "husband_info",
  "wife_info",
  "first_name",
  "last_name",
  "job",
  "health_status",
];
export function PartnerCard({ control, beneficiaryGender, isEditable }: Props) {
  const [
    HusbandInfoText,
    WifeInfoText,
    FirstNameText,
    LastNameText,
    JobText,
    HealthStatusText,
  ] = useBaseTranslation(i18ns);

  const { partner } = useWatch({ control });

  return (
    <BCard sx={{ flex: 1 }} animations={{ transitions: "slideInBottom" }}>
      <CardContent>
        <SvgIcon
          sx={(theme) => ({
            m: 3,
            scale: 3.5,
            borderRadius: "50%",
            bgcolor: theme.palette.primary[theme.palette.mode],
            float: "inline-end",
          })}
        >
          {partner!.gender === "male" ? <SvgFather /> : <SvgMother />}
        </SvgIcon>
        <BTypography variant="body2" fontWeight={"bold"}>
          {beneficiaryGender === "male" ? WifeInfoText : HusbandInfoText}
        </BTypography>
      </CardContent>
      <CardContent>
        <FormInput
          inputProps={{ slotProps: { input: { readOnly: !isEditable } } }}
          sx={{ my: 1 }}
          control={control}
          label={FirstNameText}
          name="partner.first_name"
          rules={{ required: true }}
        />
        <FormInput
          inputProps={{ slotProps: { input: { readOnly: !isEditable } } }}
          sx={{ my: 1 }}
          control={control}
          label={LastNameText}
          name="partner.last_name"
          rules={{ required: true }}
        />
        <FormInput
          inputProps={{ slotProps: { input: { readOnly: !isEditable } } }}
          sx={{ my: 1 }}
          control={control}
          label={JobText}
          name="partner.job"
          rules={{ required: true }}
        />
        <FormInput
          inputProps={{ slotProps: { input: { readOnly: !isEditable } } }}
          sx={{ my: 1 }}
          control={control}
          label={HealthStatusText}
          name="partner.health_status"
          rules={{ required: true }}
        />
      </CardContent>
    </BCard>
  );
}
