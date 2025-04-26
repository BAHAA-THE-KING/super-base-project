import { Grid2 } from "@mui/material";

import { PartnerCard, ChildCard } from "../..";

import { SingleBeneficiary } from "src/types/data/SingleBeneficiary";

type Props = {
  beneficiary: SingleBeneficiary;
};

export function FamilyInfo({ beneficiary }: Props) {
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={{ xs: 12, md: 4 }}>
        <PartnerCard
          partner={beneficiary.partner}
          beneficiaryGender={beneficiary.gender.id}
        />
      </Grid2>
      {beneficiary.children.map((child) => (
        <Grid2 key={child.id} size={{ xs: 12, md: 4 }}>
          <ChildCard child={child} />
        </Grid2>
      ))}
    </Grid2>
  );
}
