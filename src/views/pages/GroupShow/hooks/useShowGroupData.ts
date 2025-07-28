import { useConditions } from "src/views/APIs/useConditions";
import { useGroup as useGroup1 } from "../data";
import { useGroup } from "src/views/APIs/useGroup";

export function useShowGroupData(groupId: number) {
  const { getAllConditions } = useConditions();
  const { createGroup, deleteGroup } = useGroup();

  const { group, isLoading: isLoading2 } = useGroup1(groupId);

  const { data: conditionsData, isLoading: isLoading1 } = getAllConditions();

  const conditions = conditionsData?.data ?? [];

  const isLoading = isLoading1 || isLoading2;

  return { group, conditions, createGroup, deleteGroup, isLoading };
}
