import { useGroup } from "src/views/APIs/useGroup";

import { GroupAll } from "src/types/data/GroupAll";

export function useGroupsData() {
  const { showGroups } = useGroup();

  const { data: groupsResponse } = showGroups();

  const groups: GroupAll[] =
    groupsResponse?.data.map((e) => ({
      id: e.id,
      name: e.name,
      salary: e.salary.toString(),
      number_of_beneficiaries: e.number_of_beneficiaries,
      percent_of_beneficiaries: e.percentage_of_beneficiaries,
      conditions: e.conditions.map((e) => ({
        id: e.id,
        name: e.name,
      })),
    })) ?? [];

  const getGroupsLoading = groupsResponse?.message === "wait";

  return { groups, getGroupsLoading };
}
