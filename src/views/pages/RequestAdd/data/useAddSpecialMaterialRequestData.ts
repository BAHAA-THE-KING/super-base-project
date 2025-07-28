import { useMemo } from "react";
import { useLoading } from "src/globals";

import { useBeneficiaries, useSpecialMaterialRequest } from "src/views/APIs";

export function useAddSpecialMaterialRequestData() {
  const { getAllBeneficiaries } = useBeneficiaries();
  const { createSpecialMaterials } = useSpecialMaterialRequest();

  const { data: beneficiariesData } = getAllBeneficiaries({});

  const beneficiaries = useMemo(
    () =>
      beneficiariesData?.data?.map((e) => ({
        id: e.id,
        name:
          e.first_name +
          " " +
          e.father_name +
          " " +
          e.last_name +
          " /" +
          e.national_number,
      })) ?? [],
    [beneficiariesData]
  );

  const createSpecialMaterialsRequest = ({
    beneficiary_id,
    item,
  }: {
    beneficiary_id: number;
    item: string;
  }) => createSpecialMaterials({ data: { beneficiary_id, item } });

  const isLoading = beneficiariesData?.message === "wait";
  const [_, setLoading] = useLoading();
  setLoading(isLoading);

  return { beneficiaries, createSpecialMaterialsRequest };
}
