import { CardContent, SvgIcon } from "@mui/material";
import { Control } from "react-hook-form";

import { FormInput, FormSelect } from "src/components";
import { BButton, BCard, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { SingleBeneficiary } from "src/types/data/SingleBeneficiary";

import SvgUncle from "src/icons/Uncle";
import { Delete } from "@mui/icons-material";

type Props = {
  control: Control<SingleBeneficiary>;
  isEditable: boolean;
  idx: number;
  remove: (i: number) => void;
};

const i18ns = [
  "supporter_info",
  "first_name",
  "last_name",
  "kinship",
  "maternal_uncle",
  "uncle",
  "job",
  "provided_aid",
];
export function SupporterCard({ control, isEditable, idx, remove }: Props) {
  const [
    SupporterInfoText,
    FirstNameText,
    LastNameText,
    KinshipText,
    MaternalUncleText,
    UncleText,
    JobText,
    ProvidedAidText,
  ] = useBaseTranslation(i18ns);

  return (
    <BCard animations={{ transitions: "slideInBottom" }}>
      <CardContent>
        <SvgIcon
          sx={(theme) => ({
            m: 3,
            scale: 3.5,
            borderRadius: "50%",
            bgcolor: theme.palette.success[theme.palette.mode],
            float: "inline-end",
          })}
        >
          <SvgUncle />
        </SvgIcon>
        <BTypography variant="body2" fontWeight={"bold"}>
          {isEditable && (
            <BButton
              color="error"
              icon={<Delete />}
              onClick={() => remove(idx)}
            />
          )}
          {SupporterInfoText}
        </BTypography>
      </CardContent>
      <CardContent>
        <FormInput
          inputProps={{ slotProps: { input: { readOnly: !isEditable } } }}
          sx={{ my: 1 }}
          control={control}
          label={FirstNameText}
          name={`uncles.${idx}.first_name`}
          rules={{ required: true }}
        />
        <FormInput
          inputProps={{ slotProps: { input: { readOnly: !isEditable } } }}
          sx={{ my: 1 }}
          control={control}
          label={LastNameText}
          name={`uncles.${idx}.last_name`}
          rules={{ required: true }}
        />
        <FormSelect
          // inputProps={{ slotProps: { input: { readOnly: !isEditable } } }}
          sx={{ my: 1 }}
          control={control}
          label={KinshipText}
          name={`uncles.${idx}.from`}
          rules={{ required: true }}
          options={[
            { id: "mother", name: MaternalUncleText },
            { id: "father", name: UncleText },
          ]}
        />
        <FormInput
          inputProps={{ slotProps: { input: { readOnly: !isEditable } } }}
          sx={{ my: 1 }}
          control={control}
          label={JobText}
          name={`uncles.${idx}.job`}
          rules={{ required: true }}
        />
        <FormInput
          inputProps={{ slotProps: { input: { readOnly: !isEditable } } }}
          sx={{ my: 1 }}
          control={control}
          label={ProvidedAidText}
          name={`uncles.${idx}.provided_aid`}
          rules={{ required: true }}
          multiline
        />
      </CardContent>
    </BCard>
  );
}
