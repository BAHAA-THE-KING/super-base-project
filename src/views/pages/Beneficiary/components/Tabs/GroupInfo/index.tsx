import { Checkbox, Grid2 } from "@mui/material";
import React from "react";

import { BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { SingleBeneficiary } from "src/types/data/SingleBeneficiary";

type Props = {
  beneficiary: SingleBeneficiary;
};

const i18ns = [
  "group_details",
  "name",
  "salary",
  "conditions",
  "the_beneficiary_has",
];
export function GroupInfo({ beneficiary }: Props) {
  const [
    GroupDetailsText,
    NameText,
    SalaryText,
    ConditionsText,
    TheBeneficiaryHasText,
  ] = useBaseTranslation(i18ns);
  return (
    <Grid2
      container
      spacing={3}
      sx={(theme) => ({
        "&>.MuiGrid2-root": {
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
      <Grid2 size={{ xs: 12, md: 4 }}>
        <BTypography variant="h6" fontWeight={"bold"} mb={3}>
          {GroupDetailsText}
        </BTypography>
        <BTypography my={2}>
          {NameText}: {beneficiary.group.name}
        </BTypography>
        <BTypography my={2}>
          {SalaryText}: {beneficiary.group.salary}
        </BTypography>
      </Grid2>
      <Grid2 container size={{ xs: 12, md: 8 }}>
        <Grid2 size={{ xs: 12 }}>
          <BTypography fontWeight={"bold"} my={2}>
            {ConditionsText}
          </BTypography>
        </Grid2>
        <Grid2
          container
          size={{ xs: 12 }}
          sx={(theme) => ({
            "&>.MuiGrid2-root": {
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
          {beneficiary.group.group_conditions.map((group_condition) => (
            <Grid2 size={{ xs: 12, md: 6 }} key={group_condition.id}>
              <BTypography my={2}>{group_condition.condition.name}</BTypography>
              <BTypography my={2}>
                <Checkbox checked readOnly /> {TheBeneficiaryHasText}{" "}
                {group_condition.params}
              </BTypography>
            </Grid2>
          ))}
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
