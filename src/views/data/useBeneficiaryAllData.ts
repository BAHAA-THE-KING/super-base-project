import { useMemo, useRef, useState } from "react";

import { useBeneficiaries } from "src/views/APIs";

import { BeneficiaryTable } from "src/types/data/BeneficiaryTable";

export function useBeneficiaryAllData(filters: any) {
  const {
    getIndexedBeneficiaries,
    deactivateBeneficiary: deactivateBeneficiaryAPI,
  } = useBeneficiaries();

  const { data: response } = getIndexedBeneficiaries(filters);

  const beneficiaries: BeneficiaryTable[] = useMemo(
    () =>
      (response?.data?.data ?? []).map((e) => ({
        id: e.id,
        first_name: e.first_name,
        last_name: e.last_name,
        father_name: e.father_name,
        mother_name: e.mother_name,
        birth_date: e.birth_date.split("T")[0],
        birth_place: e.birth_place,
        national_number: e.national_number,
        job: e.job,
        phone_number: e.phone_number,
        mobile_number: e.mobile_number,
        residence_type: e.residence_type,
        group_name: e.group.name,
        group_color: e.group.color,
        monthly_income: e.monthly_income,
        request_status: e.request_status,
        family_members: e.family_members_number,
      })),
    [response?.data?.data, response?.data?.data?.length]
  );
  const totalRows = useRef(0);

  if (response?.data?.total !== undefined) {
    totalRows.current = response.data.total;
  }

  const getBeneficiariesLoading = !response || response?.message === "wait";

  const [deactivateBeneficiaryLoading, setDeactivateBeneficiaryLoading] =
    useState(false);
  const deactivateBeneficiary = (beneficiaryId: number) => {
    setDeactivateBeneficiaryLoading(true);
    return deactivateBeneficiaryAPI({
      data: { is_active: false },
      params: { beneficiaryId },
    }).then(() => setDeactivateBeneficiaryLoading(false));
  };

  return {
    beneficiaries,
    totalRows: totalRows.current,
    getBeneficiariesLoading,
    deactivateBeneficiary,
    deactivateBeneficiaryLoading,
  };
}
