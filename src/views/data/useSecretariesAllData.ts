import { useRef } from "react";

import { useSecretaries } from "../APIs";

import { SecretaryType } from "src/types/data/Secretary";

export function useSecretariesAllData(filters: any) {
  const { getFilteredSecretaries } = useSecretaries();
  const { data: secretariesResponse } = getFilteredSecretaries(filters);

  const secretaries: SecretaryType[] =
    secretariesResponse?.data?.data.map((e) => ({
      id: e.id,
      name: e.name,
      address: e.address,
      birth_date: e.birth_date,
      birth_place: e.birth_place,
      mobile: e.phone,
      salary: e.salary.toString(),
    })) ?? [];

  const totalRows = useRef(0);
  if (secretariesResponse?.data?.total !== undefined) {
    totalRows.current = secretariesResponse.data.total;
  }

  const getSecretariesLoading = secretariesResponse?.message === "wait";

  return {
    secretaries,
    getSecretariesLoading,
    totalRows: totalRows.current,
  };
}
