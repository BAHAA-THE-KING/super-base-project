import { useMemo, useState } from "react";

import { useGroup } from "src/views/APIs/useGroup";
import { useBeneficiaries } from "src/views/APIs";

import { Group } from "src/types/data/SingleBeneficiary";

export function useBeneficiaryGroupsData(
  beneficiaryId: number,
  requestMode = false
) {
  const { getAvailableGroupsAPI, changeBeneficiaryGroupAPI } =
    useBeneficiaries();

  const { showGroups } = useGroup();
  const { data: allGroupsResponse } = showGroups();
  const { data: availableGroupResponse } = getAvailableGroupsAPI(beneficiaryId);

  const allGroups: Group[] = useMemo(
    () =>
      allGroupsResponse?.data?.map((e) => ({
        id: e.id,
        name: e.name,
        salary: e.salary.toString(),
        color: e.color as
          | "primary"
          | "secondary"
          | "error"
          | "info"
          | "success"
          | "warning",
        group_conditions:
          e?.conditions?.map((ee) => ({
            id: ee.id,
            params: JSON.parse(ee.param),
            condition: {
              id: ee.id,
              name: ee.name,
            },
            // TODO: need to be filled
            is_satisfied: false,
          })) ?? [],
      })) ?? [],
    [allGroupsResponse]
  );
  const availableGroups: Group[] = useMemo(
    () =>
      availableGroupResponse?.data?.map((e) => ({
        id: e.id,
        name: e.name,
        salary: e.salary.toString(),
        color: e.color as
          | "primary"
          | "secondary"
          | "error"
          | "info"
          | "success"
          | "warning",
        group_conditions:
          e?.conditions?.map((ee) => ({
            id: ee.id,
            params: JSON.parse(ee.param),
            condition: {
              id: ee.id,
              name: ee.name,
            },
            // TODO: need to be filled
            is_satisfied: false,
          })) ?? [],
      })) ?? [],
    [availableGroupResponse]
  );

  const groups = requestMode ? availableGroups : allGroups;

  const getGroupsLoading =
    allGroupsResponse?.message === "wait" ||
    availableGroupResponse?.message === "wait";

  const [changeGroupLoading, setChangeGroupLoading] = useState(false);

  const changeBeneficiaryGroup = (groupId: number) => {
    setChangeGroupLoading(true);
    return changeBeneficiaryGroupAPI({
      data: { groupId },
      params: { beneficiaryId, groupId },
    }).finally(() => setChangeGroupLoading(false));
  };

  return {
    groups,
    getGroupsLoading,
    changeBeneficiaryGroup,
    changeGroupLoading,
  };
}
