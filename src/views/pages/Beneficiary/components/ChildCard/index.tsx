import { CardContent, SvgIcon } from "@mui/material";
import { useForm } from "react-hook-form";

import SvgSon from "src/icons/Son";
import SvgDaughter from "src/icons/Daughter";

import { FormCheckbox, FormInput, FormSelect } from "src/components";
import { BCard, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { Child } from "src/types/data/SingleBeneficiary";

type Props = {
  child: Child;
  isEditable: boolean;
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
export function ChildCard({ child, isEditable }: Props) {
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
    <BCard sx={{ m: 1, flex: 1 }} animations={{ transitions: "slideInBottom" }}>
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
          inputProps={{ slotProps: { input: { readOnly: !isEditable } } }}
          sx={{ my: 1 }}
          control={control}
          label={NameText}
          name={`child.name`}
          rules={{ required: true }}
        />
        <FormSelect
          inputProps={{ slotProps: { input: { readOnly: !isEditable } } }}
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
          inputProps={{ slotProps: { input: { readOnly: !isEditable } } }}
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
          disabled={!isEditable}
        />
        {child.gender.id === "female" ? (
          <FormInput
            inputProps={{ slotProps: { input: { readOnly: !isEditable } } }}
            sx={{ my: 1 }}
            control={control}
            label={PartnerNameText}
            name={`child.partner_name`}
            rules={{ required: true }}
          />
        ) : null}
        <FormInput
          inputProps={{ slotProps: { input: { readOnly: !isEditable } } }}
          sx={{ my: 1 }}
          control={control}
          label={ResidencePlaceText}
          name={`child.residence_place`}
          rules={{ required: true }}
        />
      </CardContent>
    </BCard>
  );
}
