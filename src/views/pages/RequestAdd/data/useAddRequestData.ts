import { useMemo } from "react";

import { useBeneficiaries, useItems } from "src/views/APIs";

export function useAddRequestData(withItems?: boolean) {
  const { getAllBeneficiaries } = useBeneficiaries();
  const { getAllItems } = useItems();

  const { data: beneficiariesData, isLoading: isLoading1 } =
    getAllBeneficiaries({});
  const { data: itemsData, isLoading: isLoading2 } = getAllItems(
    {},
    { enabled: Boolean(withItems) }
  );

  const beneficiaries = useMemo(
    () => beneficiariesData ?? [],
    [beneficiariesData]
  );
  const items = useMemo(() => itemsData?.data ?? [], [itemsData]);

  const isLoading = isLoading1 || isLoading2;

  return { beneficiaries, items, isLoading };
}
