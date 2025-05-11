import { useMemo } from "react";
import { useGroupsData } from "../../Groups/data";
import { Condition } from "src/types/data/SingleBeneficiary";

export function useGroup(groupId: number) {
  const { groups, isLoading } = useGroupsData();
  const group = useMemo(() => groups.find((e) => e.id === groupId), [groupId]);

  return { group, isLoading };
}

export function useConditions() {
  const conditions = useMemo<Condition[]>(
    () => [
      {
        id: 1,
        name: "more than 1 member under 18 years old",
      },
      {
        id: 2,
        name: "monthly income less than 500000",
      },

      {
        id: 3,
        name: "more than 2 members",
      },
      {
        id: 4,
        name: "more than 1 disabled member",
      },
      {
        id: 5,
        name: "monthly income more than 700000",
      },
      {
        id: 6,
        name: "more than 3 members under 18 years old",
      },
      {
        id: 7,
        name: "more than 2 elderly members",
      },
      {
        id: 9,
        name: "more than 3 members under 18 years old",
      },
      {
        id: 85,
        name: "more than 5 members",
      },
    ],
    []
  );

  return { conditions, isLoading: false };
}
