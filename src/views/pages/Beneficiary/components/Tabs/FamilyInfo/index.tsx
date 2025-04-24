import React from "react";
import { Grid2 } from "@mui/material";
import { useForm } from "react-hook-form";

import { FormCheckbox, FormInput, FormSelect } from "src/components";
import { BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { SingleBeneficiary } from "src/types/data/SingleBeneficiary";

type Props = {
  beneficiary: SingleBeneficiary;
};

const i18ns = [
  "husband_info",
  "wife_info",
  "first_name",
  "last_name",
  "job",
  "health_status",
  "children_info",
  "name",
  "gender",
  "birth_date",
  "is_alive",
  "partner_name",
  "residence_place",
  "male",
  "female",
];
export function FamilyInfo({ beneficiary }: Props) {
  const [
    HusbandInfoText,
    WifeInfoText,
    FirstNameText,
    LastNameText,
    JobText,
    HealthStatusText,
    ChildrenInfoText,
    NameText,
    GenderText,
    BirthDateText,
    IsAliveText,
    PartnerNameText,
    ResidencePlaceText,
    MaleText,
    FemaleText,
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
      <Grid2 size={{ xs: 12, md: 3.8 }}>
        <BTypography variant="h6" fontWeight={"bold"} mb={3}>
          {beneficiary.gender.id === "male" ? WifeInfoText : HusbandInfoText}
        </BTypography>
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
      </Grid2>
      <Grid2 size={{ xs: 12, md: 0.1 }}></Grid2>
      <Grid2 container size={{ xs: 12, md: 7.8 }}>
        <Grid2 size={{ xs: 12 }}>
          <BTypography variant="h6" fontWeight={"bold"} mb={3}>
            {ChildrenInfoText}
          </BTypography>
        </Grid2>
        <Grid2
          container
          size={{ xs: 12 }}
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
          {beneficiary.children.map((child, i) => (
            <React.Fragment key={child.id}>
              <Grid2 size={{ xs: 12, md: 5.7 }}>
                <FormInput
                  sx={{ my: 1 }}
                  control={control}
                  label={NameText}
                  name={`children.${i}.name`}
                  rules={{ required: true }}
                />
                <FormSelect
                  sx={{ my: 1 }}
                  control={control}
                  label={GenderText}
                  name={`children.${i}.gender`}
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
                  name={`children.${i}.birth_date`}
                  rules={{ required: true }}
                />
                <FormCheckbox
                  sx={{ my: 1 }}
                  control={control}
                  label={IsAliveText}
                  name={`children.${i}.is_alive`}
                />
                {child.gender.id === "female" ? (
                  <FormInput
                    sx={{ my: 1 }}
                    control={control}
                    label={PartnerNameText}
                    name={`children.${i}.partner_name`}
                    rules={{ required: true }}
                  />
                ) : null}
                <FormInput
                  sx={{ my: 1 }}
                  control={control}
                  label={ResidencePlaceText}
                  name={`children.${i}.residence_place`}
                  rules={{ required: true }}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 0.1 }}></Grid2>
            </React.Fragment>
          ))}
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
