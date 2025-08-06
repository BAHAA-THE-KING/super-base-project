import { useMemo } from "react";

import { useBeneficiaries, useSpecialMaterialRequest } from "src/views/APIs";

export function useAddSpecialMaterialRequestData(requestId: number) {
  const { getAllBeneficiaries } = useBeneficiaries();
  const { createSpecialMaterials, getSingleSpecialMaterials } =
    useSpecialMaterialRequest();

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

  const { data: specialMaterialResponse } =
    getSingleSpecialMaterials(requestId);
  const specialMaterialData = specialMaterialResponse?.data;

  const request = specialMaterialData
    ? {
        id: specialMaterialData.id,
        beneficiary_id: specialMaterialData.beneficiary.id,
        reason: "",
        urgency_level: "medium" as const,
        requested_item: specialMaterialData.item,
      }
    : null;

  return { beneficiaries, createSpecialMaterialsRequest, request };
}
