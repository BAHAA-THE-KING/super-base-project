import { Grid2 } from "@mui/material";

import { PartnerCard, ChildCard } from "../..";

import {
  Child,
  Partner,
  SingleBeneficiary,
} from "src/types/data/SingleBeneficiary";

type Props = {
  beneficiary: SingleBeneficiary;
};

export function FamilyInfo({ beneficiary }: Props) {
  const members = [
    { key: "partner", partner: beneficiary.partner },
    ...beneficiary.children
      .sort(
        (e1, e2) =>
          new Date(e1.birth_date).getTime() - new Date(e2.birth_date).getTime()
      )
      .map((e) => ({ key: e.id, child: e })),
  ] as { key?: number; child?: Child; partner?: Partner }[];

  return (
    <Grid2 container>
      {members.map((e) => (
        <Grid2
          key={e.key}
          size={{ xs: 12, md: 4 }}
          display={"flex"}
          alignItems={"stretch"}
        >
          {e.partner ? (
            <PartnerCard
              partner={e.partner}
              beneficiaryGender={beneficiary.gender.id}
            />
          ) : e.child ? (
            <ChildCard child={e.child} />
          ) : null}
        </Grid2>
      ))}
    </Grid2>
  );
}
