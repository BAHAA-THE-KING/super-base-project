import { useMemo } from "react";

import { useGroup } from "src/views/APIs/useGroup";
import { useConditions } from "../APIs/useConditions";

import { Group } from "src/types/data/Group";
import { Condition } from "src/types/data/SingleBeneficiary";

export function useGroupData(groupId: number) {
  const { showGroup, createGroupAPI, deleteGroup, editGroupAPI } = useGroup();
  const { getAllConditions } = useConditions();

  const { data: groupResponse } = showGroup(groupId);
  const { data: conditionsResponse } = getAllConditions();

  const groupData = groupResponse?.data;
  const conditionsData = conditionsResponse?.data;

  const group = useMemo<Group | null>(
    () =>
      groupData
        ? {
            id: groupData.id,
            color: groupData.color,
            name: groupData.name,
            salary: groupData.salary.toString(),
            conditions: groupData.conditions.map((e) => ({
              id: e.id,
              name: e.name,
              param: {
                op: JSON.parse(e.param).operation,
                value: JSON.parse(e.param).value,
              },
            })),
            number_of_beneficiaries: groupData.number_of_beneficiaries,
            percent_of_beneficiaries: groupData.percentage_of_beneficiaries,
          }
        : null,
    [groupData]
  );
  const conditions = useMemo<Condition[]>(
    () =>
      conditionsData?.map((e) => ({
        id: e.id,
        name: e.name,
      })) ?? [],
    [conditionsResponse]
  );

  const createGroup = (group: {
    name: string;
    salary: string;
    color: string;
    conditions: {
      id: number;
      params: string;
    }[];
  }) => createGroupAPI({ data: group });

  const editGroup = (
    groupId: number,
    group: {
      name?: string;
      salary?: number;
      color?: string;
      conditions?: {
        id: number;
        params: string;
      }[];
    }
  ) =>
    editGroupAPI({
      params: { groupId },
      data: {
        name: group.name,
        color: group.color,
        conditions: group?.conditions?.map((e) => ({
          id: e.id,
          params: e.params,
        })),
      },
    });

  const getGroupLoading = groupResponse?.message === "wait";
  const getConditionsLoading = conditionsResponse?.message === "wait";

  return {
    group,
    createGroup,
    editGroup,
    deleteGroup,
    conditions,
    getGroupLoading,
    getConditionsLoading,
  };
}
