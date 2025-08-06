import { useMemo, useState } from "react";

import { useBeneficiaries, useSpecialMaterialRequest } from "src/views/APIs";

export function useAddSpecialMaterialRequestData(requestId: number) {
  const { getAllBeneficiaries } = useBeneficiaries();
  const { createSpecialMaterials, getSingleSpecialMaterials } =
    useSpecialMaterialRequest();

  const { data: beneficiariesResponse } = getAllBeneficiaries({});

  const beneficiaries = useMemo(
    () =>
      beneficiariesResponse?.data?.map((e) => ({
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
    [beneficiariesResponse]
  );

  const [
    createSpecialMaterialsRequestLoading,
    setCreateSpecialMaterialsRequestLoading,
  ] = useState(false);
  const createSpecialMaterialsRequest = ({
    beneficiary_id,
    item,
  }: {
    beneficiary_id: number;
    item: string;
  }) => {
    setCreateSpecialMaterialsRequestLoading(true);
    return createSpecialMaterials({ data: { beneficiary_id, item } }).finally(
      () => setCreateSpecialMaterialsRequestLoading(false)
    );
  };

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

  const getBeneficiariesLoading = beneficiariesResponse?.message === "wait";
  const getRequestLoading = specialMaterialResponse?.message === "wait";

  return {
    beneficiaries,
    createSpecialMaterialsRequest,
    request,
    getBeneficiariesLoading,
    getRequestLoading,
    createSpecialMaterialsRequestLoading,
  };
}
