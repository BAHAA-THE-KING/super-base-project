import { useMemo, useState } from "react";

import { useGroup } from "src/views/APIs/useGroup";
import { useConditions } from "../APIs/useConditions";

import { Group } from "src/types/data/Group";
import { Condition } from "src/types/data/SingleBeneficiary";

export function useGroupData(groupId: number) {
  const { showGroup, createGroupAPI, deleteGroupAPI, editGroupAPI } =
    useGroup();
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

  const [createGroupLoading, setCreateGroupLoading] = useState(false);
  const [editGroupLoading, setEditGroupLoading] = useState(false);
  const [deleteGroupLoading, setDeleteGroupLoading] = useState(false);

  const createGroup = (group: {
    name: string;
    salary: string;
    color: string;
    conditions: {
      id: number;
      params: string;
    }[];
  }) => {
    setCreateGroupLoading(true);
    return createGroupAPI({ data: group }).finally(() =>
      setCreateGroupLoading(false)
    );
  };

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
  ) => {
    setEditGroupLoading(true);
    return editGroupAPI({
      params: { groupId },
      data: {
        name: group.name,
        color: group.color,
        conditions: group?.conditions?.map((e) => ({
          id: e.id,
          params: e.params,
        })),
      },
    }).finally(() => setEditGroupLoading(false));
  };

  const deleteGroup = (id: number) => {
    setDeleteGroupLoading(true);
    return deleteGroupAPI({ id }).finally(() => setDeleteGroupLoading(false));
  };

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
    createGroupLoading,
    editGroupLoading,
    deleteGroupLoading,
  };
}
