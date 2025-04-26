import React from "react";
import { Grid2 } from "@mui/material";

import { SingleBeneficiary } from "src/types/data/SingleBeneficiary";
import { SupporterCard } from "../../SupporterCard";

type Props = {
  beneficiary: SingleBeneficiary;
};

export function SupportersInfo({ beneficiary }: Props) {
  return (
    <Grid2 container spacing={3}>
      {beneficiary.uncles.map((uncle) => (
        <React.Fragment key={uncle.id}>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <SupporterCard uncle={uncle} />
          </Grid2>
        </React.Fragment>
      ))}
    </Grid2>
  );
}
