import { useMemo } from "react";

import { useBeneficiaries } from "src/views/APIs";

export function useAddRequestData() {
  const { getAllBeneficiaries } = useBeneficiaries();

  const { data, isLoading } = getAllBeneficiaries({});

  const beneficiaries = useMemo(() => data ?? [], [data]);

  return { beneficiaries, isLoading };
}
