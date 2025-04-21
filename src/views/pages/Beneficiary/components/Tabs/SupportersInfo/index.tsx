import { Grid2 } from "@mui/material";

import { BTypography } from "src/components/Base";

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
      {beneficiary.uncles.map((uncle) => (
        <Grid2 size={{ xs: 12, md: 6 }} key={uncle.id}>
          <BTypography my={2}>
            {FirstNameText}: {uncle.first_name}
          </BTypography>
          <BTypography my={2}>
            {LastNameText}: {uncle.last_name}
          </BTypography>
          <BTypography my={2}>
            {KinshipText}:{" "}
            {uncle.from === "mother" ? MaternalUncleText : UncleText}
          </BTypography>
          <BTypography my={2}>
            {JobText}: {uncle.job}
          </BTypography>
          <BTypography mt={2}>{ProvidedAidText}:</BTypography>
          <BTypography mb={2}>{uncle.provided_aid}</BTypography>
        </Grid2>
      ))}
    </Grid2>
  );
}
