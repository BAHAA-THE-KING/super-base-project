import { useMemo } from "react";

import { useLoading } from "src/globals";

import { useBeneficiaries, usePrescriptionRequest } from "src/views/APIs";

export function useAddPrescriptionRequestData() {
  const { getAllBeneficiaries } = useBeneficiaries();
  const { createPrescription } = usePrescriptionRequest();

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

  const createPrescriptionRequest = ({
    beneficiary_id,
    description,
  }: {
    beneficiary_id: number;
    description: string;
  }) => createPrescription({ data: { beneficiary_id, description } });

  const isLoading = beneficiariesData?.message === "wait";
  const [_, setLoading] = useLoading();
  setLoading(isLoading);

  return { beneficiaries, createPrescriptionRequest };
}
