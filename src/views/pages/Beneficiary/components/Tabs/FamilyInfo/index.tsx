import { Stack } from "@mui/material";

import { PartnerCard, ChildCard } from "../..";

import {
  Child,
  Partner,
  SingleBeneficiary,
} from "src/types/data/SingleBeneficiary";
import { chunkArray } from "src/utils";
import { Box } from "@mui/material";

type Props = {
  beneficiary: SingleBeneficiary;
};

export function FamilyInfo({ beneficiary }: Props) {
  const members = chunkArray(
    [
      { key: beneficiary.partner, partner: beneficiary.partner },
      ...beneficiary.children
        .sort(
          (e1, e2) =>
            new Date(e1.birth_date).getTime() -
            new Date(e2.birth_date).getTime()
        )
        .map((e) => ({ key: e.id, child: e })),
    ] as { key?: number; child?: Child; partner?: Partner }[],
    3,
    true,
    () => ({ key: new Date().getTime() })
  );

  return (
    <Stack flexDirection={"column"}>
      {members.map((e) => (
        <Stack
          key={e.reduce((p, e) => p + "," + e.key, "")}
          flexDirection={"row"}
        >
          {e.map((e) =>
            e.partner ? (
              <PartnerCard
                key={e.partner.id}
                partner={e.partner}
                beneficiaryGender={beneficiary.gender.id}
              />
            ) : e.child ? (
              <ChildCard key={e.child.id} child={e.child} />
            ) : (
              <Box key={e.key} flex={1}></Box>
            )
          )}
        </Stack>
      ))}
    </Stack>
  );
}
