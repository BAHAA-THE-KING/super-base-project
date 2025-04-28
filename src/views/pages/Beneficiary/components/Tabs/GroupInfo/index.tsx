import { Stack } from "@mui/material";

import { BCircularProgress } from "src/components/Base";

import { useGroupsData } from "../../../data";

import { SingleBeneficiary } from "src/types/data/SingleBeneficiary";
import { GroupCard } from "../../GroupCard";

type Props = {
  beneficiary: SingleBeneficiary;
};

export function GroupInfo({ beneficiary }: Props) {
  const { isLoading, groups } = useGroupsData();
  return (
    <Stack
      flexDirection={{
        xs: "column",
        md: "row",
      }}
      overflow={"auto"}
    >
      {isLoading ? (
        <Stack justifyContent={"center"} alignItems={"center"}>
          <BCircularProgress />
        </Stack>
      ) : null}
      {groups.map((group) => (
        <GroupCard group={group} isActive={group.id === beneficiary.group.id} />
      ))}
    </Stack>
  );
}
