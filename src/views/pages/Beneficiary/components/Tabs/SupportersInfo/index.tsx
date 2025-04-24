import React from "react";
import { Grid2 } from "@mui/material";
import { useForm } from "react-hook-form";

import { FormInput, FormSelect } from "src/components";

import { useBaseTranslation } from "src/hooks";

import { SingleBeneficiary } from "src/types/data/SingleBeneficiary";

type Props = {
  beneficiary: SingleBeneficiary;
};

const i18ns = [
  "first_name",
  "last_name",
  "kinship",
  "maternal_uncle",
  "uncle",
  "job",
  "provided_aid",
];
export function SupportersInfo({ beneficiary }: Props) {
  const [
    FirstNameText,
    LastNameText,
    KinshipText,
    MaternalUncleText,
    UncleText,
    JobText,
    ProvidedAidText,
  ] = useBaseTranslation(i18ns);

  const { control } = useForm<SingleBeneficiary>({
    defaultValues: beneficiary,
  });

  return (
    <Grid2
      container
      spacing={3}
      sx={(theme) => ({
        "&>.MuiGrid2-root:nth-child(even)": {
          borderBlockEnd: {
            xs: `1px solid ${theme.palette.divider}`,
            md: "none",
          },
          borderInlineEnd: {
            xs: "none",
            md: `1px solid ${theme.palette.divider}`,
          },
          "&:last-child": {
            borderInlineEnd: "none",
            borderBlockEnd: "none",
          },
        },
      })}
    >
      {beneficiary.uncles.map((uncle, i) => (
        <React.Fragment key={uncle.id}>
          <Grid2 size={{ xs: 12, md: 3.8 }}>
            <FormInput
              sx={{ my: 1 }}
              control={control}
              label={FirstNameText}
              name={`uncles.${i}.first_name`}
              rules={{ required: true }}
            />
            <FormInput
              sx={{ my: 1 }}
              control={control}
              label={LastNameText}
              name={`uncles.${i}.last_name`}
              rules={{ required: true }}
            />
            <FormSelect
              sx={{ my: 1 }}
              control={control}
              label={KinshipText}
              name={`uncles.${i}.from`}
              rules={{ required: true }}
              options={[
                { id: "mother", name: MaternalUncleText },
                { id: "father", name: UncleText },
              ]}
            />
            <FormInput
              sx={{ my: 1 }}
              control={control}
              label={JobText}
              name={`uncles.${i}.job`}
              rules={{ required: true }}
            />
            <FormInput
              sx={{ my: 1 }}
              control={control}
              label={ProvidedAidText}
              name={`uncles.${i}.provided_aid`}
              rules={{ required: true }}
              multiline
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 0.1 }}></Grid2>
        </React.Fragment>
      ))}
    </Grid2>
  );
}
