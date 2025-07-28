import { useGroup } from "src/views/APIs/useGroup";

export function useGroupsData() {
  const { showGroups } = useGroup();

  const { data: groupsResponse, isLoading: isLoading1 } = showGroups();

  const groups =
    groupsResponse?.data.map((e) => ({
      id: e.id,
      name: e.name,
      salary: e.salary,
      // TODO: Fix
      number_of_beneficiaries: 10,
      percent_of_beneficiaries: 1,
      conditions: [],
    })) ?? [];

  const isLoading = isLoading1;

  return { groups, isLoading };
}
