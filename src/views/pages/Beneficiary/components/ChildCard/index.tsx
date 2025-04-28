import { Card, CardContent, SvgIcon } from "@mui/material";
import { useForm } from "react-hook-form";

import { FormCheckbox, FormInput, FormSelect } from "src/components";
import { BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { Child } from "src/types/data/SingleBeneficiary";

import SvgSon from "src/icons/Son";
import SvgDaughter from "src/icons/Daughter";

type Props = {
  child: Child;
};

const i18ns = [
  "name",
  "gender",
  "birth_date",
  "is_alive",
  "partner_name",
  "residence_place",
  "male",
  "female",
  "son_info",
  "daughter_info",
];
export function ChildCard({ child }: Props) {
  const [
    NameText,
    GenderText,
    BirthDateText,
    IsAliveText,
    PartnerNameText,
    ResidencePlaceText,
    MaleText,
    FemaleText,
    SonInfoText,
    DaughterInfoText,
  ] = useBaseTranslation(i18ns);

  const { control } = useForm({ defaultValues: { child } });

  return (
    <Card sx={{ m: 1, flex: 1 }}>
      <CardContent>
        <SvgIcon
          sx={(theme) => ({
            m: 3,
            scale: 3.5,
            borderRadius: "50%",
            bgcolor: theme.palette.secondary[theme.palette.mode],
            float: "inline-end",
          })}
        >
          {child.gender.id === "male" ? <SvgSon /> : <SvgDaughter />}
        </SvgIcon>
        <BTypography variant="body2" fontWeight={"bold"}>
          {child.gender.id === "male" ? SonInfoText : DaughterInfoText}
        </BTypography>
      </CardContent>
      <CardContent>
        <FormInput
          sx={{ my: 1 }}
          control={control}
          label={NameText}
          name={`child.name`}
          rules={{ required: true }}
        />
        <FormSelect
          sx={{ my: 1 }}
          control={control}
          label={GenderText}
          name={`child.gender`}
          rules={{ required: true }}
          options={[
            { id: "male", name: MaleText },
            { id: "female", name: FemaleText },
          ]}
        />
        <FormInput
          sx={{ my: 1 }}
          control={control}
          label={BirthDateText}
          name={`child.birth_date`}
          rules={{ required: true }}
        />
        <FormCheckbox
          sx={{ my: 1 }}
          control={control}
          label={IsAliveText}
          name={`child.is_alive`}
        />
        {child.gender.id === "female" ? (
          <FormInput
            sx={{ my: 1 }}
            control={control}
            label={PartnerNameText}
            name={`child.partner_name`}
            rules={{ required: true }}
          />
        ) : null}
        <FormInput
          sx={{ my: 1 }}
          control={control}
          label={ResidencePlaceText}
          name={`child.residence_place`}
          rules={{ required: true }}
        />
      </CardContent>
    </Card>
  );
}
