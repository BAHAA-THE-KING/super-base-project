import { CardContent, SvgIcon } from "@mui/material";
import { useForm } from "react-hook-form";

import { FormInput, FormSelect } from "src/components";
import { BCard, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { Uncle } from "src/types/data/SingleBeneficiary";

import SvgUncle from "src/icons/Uncle";

type Props = {
  uncle: Uncle;
  isEditable: boolean;
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
export function SupporterCard({ uncle, isEditable }: Props) {
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

  const { control } = useForm({ defaultValues: { uncle } });

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
          {SupporterInfoText}
        </BTypography>
      </CardContent>
      <CardContent>
        <FormInput
          inputProps={{ slotProps: { input: { readOnly: !isEditable } } }}
          sx={{ my: 1 }}
          control={control}
          label={FirstNameText}
          name={`uncle.first_name`}
          rules={{ required: true }}
        />
        <FormInput
          inputProps={{ slotProps: { input: { readOnly: !isEditable } } }}
          sx={{ my: 1 }}
          control={control}
          label={LastNameText}
          name={`uncle.last_name`}
          rules={{ required: true }}
        />
        <FormSelect
          inputProps={{ slotProps: { input: { readOnly: !isEditable } } }}
          sx={{ my: 1 }}
          control={control}
          label={KinshipText}
          name={`uncle.from`}
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
          name={`uncle.job`}
          rules={{ required: true }}
        />
        <FormInput
          inputProps={{ slotProps: { input: { readOnly: !isEditable } } }}
          sx={{ my: 1 }}
          control={control}
          label={ProvidedAidText}
          name={`uncle.provided_aid`}
          rules={{ required: true }}
          multiline
        />
      </CardContent>
    </BCard>
  );
}
