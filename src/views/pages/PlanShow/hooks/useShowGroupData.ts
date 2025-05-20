import { useConditions, useGroup } from "../data";

export function useShowGroupData(groupId: number) {
  const { group, isLoading: isLoading2 } = useGroup(groupId);
  const { conditions, isLoading: isLoading1 } = useConditions();

  const isLoading = isLoading1 || isLoading2;

  return { group, conditions, isLoading };
}
