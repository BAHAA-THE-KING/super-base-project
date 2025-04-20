import { Checkbox, Grid2 } from "@mui/material";

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
          {beneficiary.gender === "male" ? WifeInfoText : HusbandInfoText}
        </BTypography>
        <BTypography my={2}>
          {FirstNameText}: {beneficiary.partner.first_name}
        </BTypography>
        <BTypography my={2}>
          {LastNameText}: {beneficiary.partner.last_name}
        </BTypography>
        <BTypography my={2}>
          {JobText}: {beneficiary.partner.job}
        </BTypography>
        <BTypography my={2}>
          {HealthStatusText}: {beneficiary.partner.health_status}
        </BTypography>
      </Grid2>
      <Grid2 container size={{ xs: 12, md: 8 }}>
        <Grid2 size={{ xs: 12 }}>
          <BTypography variant="h6" fontWeight={"bold"} mb={3}>
            {ChildrenInfoText}
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
          {beneficiary.children.map((child) => (
            <Grid2 size={{ xs: 12, md: 6 }} key={child.id}>
              <BTypography my={2} fontWeight={"bold"}>
                {NameText}: {child.name}
              </BTypography>
              <BTypography my={2}>
                {GenderText}: {child.gender}
              </BTypography>
              <BTypography my={2}>
                {BirthDateText}: {child.birth_date}
              </BTypography>
              <BTypography my={2}>
                {IsAliveText}: <Checkbox checked={child.is_alive} readOnly />
              </BTypography>
              {child.gender === "female" ? (
                <BTypography my={2}>
                  {PartnerNameText}: {child.partner_name}
                </BTypography>
              ) : null}
              <BTypography my={2}>
                {ResidencePlaceText}: {child.residence_place}
              </BTypography>
            </Grid2>
          ))}
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
