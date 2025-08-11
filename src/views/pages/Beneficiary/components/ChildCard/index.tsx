import { CardContent, SvgIcon } from "@mui/material";
import { Control } from "react-hook-form";

import SvgSon from "src/icons/Son";
import SvgDaughter from "src/icons/Daughter";

import { FormCheckbox, FormInput, FormSelect } from "src/components";
import { BButton, BCard, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { Child, SingleBeneficiary } from "src/types/data/SingleBeneficiary";
import { Delete } from "@mui/icons-material";

type Props = {
  child: Child;
  control: Control<SingleBeneficiary>;
  isEditable: boolean;
  idx: number;
  remove: (i: number) => void;
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
export function ChildCard({ child, control, isEditable, idx, remove }: Props) {
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

  return (
    <BCard sx={{ flex: 1 }} animations={{ transitions: "slideInBottom" }}>
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
          {child.gender === "male" ? <SvgSon /> : <SvgDaughter />}
        </SvgIcon>
        <BTypography variant="body2" fontWeight={"bold"}>
          {isEditable && (
            <BButton
              color="error"
              icon={<Delete />}
              onClick={() => remove(idx)}
            />
          )}
          {child.gender === "male" ? SonInfoText : DaughterInfoText}
        </BTypography>
      </CardContent>
      <CardContent>
        <FormInput
          inputProps={{ slotProps: { input: { readOnly: !isEditable } } }}
          sx={{ my: 1 }}
          control={control}
          label={NameText}
          name={`children.${idx}.name`}
          rules={{ required: true }}
        />
        <FormSelect
          readOnly={!isEditable}
          sx={{ my: 1 }}
          control={control}
          label={GenderText}
          name={`children.${idx}.gender`}
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
          name={`children.${idx}.birth_date`}
          rules={{ required: true }}
        />
        <FormCheckbox
          sx={{ my: 1 }}
          control={control}
          label={IsAliveText}
          name={`children.${idx}.is_alive`}
          disabled={!isEditable}
        />
        {child.gender === "female" ? (
          <FormInput
            inputProps={{ slotProps: { input: { readOnly: !isEditable } } }}
            sx={{ my: 1 }}
            control={control}
            label={PartnerNameText}
            name={`children.${idx}.partner_name`}
            rules={{ required: true }}
          />
        ) : null}
        <FormInput
          inputProps={{ slotProps: { input: { readOnly: !isEditable } } }}
          sx={{ my: 1 }}
          control={control}
          label={ResidencePlaceText}
          name={`children.${idx}.residence_place`}
          rules={{ required: true }}
        />
      </CardContent>
    </BCard>
  );
}
