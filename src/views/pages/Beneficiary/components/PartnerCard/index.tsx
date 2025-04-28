import { Card, CardContent, SvgIcon } from "@mui/material";
import { useForm } from "react-hook-form";

import { FormInput } from "src/components";
import { BTypography } from "src/components/Base";
import { useBaseTranslation } from "src/hooks";
import SvgFather from "src/icons/Father";
import SvgMother from "src/icons/Mother";

import { Partner } from "src/types/data/SingleBeneficiary";

type Props = {
  partner: Partner;
  beneficiaryGender: "male" | "female";
};

const i18ns = [
  "husband_info",
  "wife_info",
  "first_name",
  "last_name",
  "job",
  "health_status",
];
export function PartnerCard({ partner, beneficiaryGender }: Props) {
  const [
    HusbandInfoText,
    WifeInfoText,
    FirstNameText,
    LastNameText,
    JobText,
    HealthStatusText,
  ] = useBaseTranslation(i18ns);

  const { control } = useForm({ defaultValues: { partner } });

  return (
    <Card sx={{ m: 1, flex: 1 }}>
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
          {partner.gender.id === "male" ? <SvgFather /> : <SvgMother />}
        </SvgIcon>
        <BTypography variant="body2" fontWeight={"bold"}>
          {beneficiaryGender === "male" ? WifeInfoText : HusbandInfoText}
        </BTypography>
      </CardContent>
      <CardContent>
        <FormInput
          sx={{ my: 1 }}
          control={control}
          label={FirstNameText}
          name="partner.first_name"
          rules={{ required: true }}
        />
        <FormInput
          sx={{ my: 1 }}
          control={control}
          label={LastNameText}
          name="partner.last_name"
          rules={{ required: true }}
        />
        <FormInput
          sx={{ my: 1 }}
          control={control}
          label={JobText}
          name="partner.job"
          rules={{ required: true }}
        />
        <FormInput
          sx={{ my: 1 }}
          control={control}
          label={HealthStatusText}
          name="partner.health_status"
          rules={{ required: true }}
        />
      </CardContent>
    </Card>
  );
}
