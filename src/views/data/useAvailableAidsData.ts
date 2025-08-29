import { useMemo } from "react";

import {
  useEmergencyRequests,
  usePlans,
  usePrescriptionRequest,
  useSalary,
  useSpecialMaterialRequest,
} from "../APIs";

import { AvailableAid } from "src/types/data/AvailableAid";

export function useAvailableAidsData(beneficiary_id: number) {
  const { getAllEmergencyRequests } = useEmergencyRequests();
  const { getAllPrescriptionRequests } = usePrescriptionRequest();
  const { getAllSpecialMaterialRequests } = useSpecialMaterialRequest();
  const { getPlansTurn } = usePlans();
  const { getAvailableSalaries } = useSalary();

  const { data: SpecialMaterialResponse } = getAllSpecialMaterialRequests({
    beneficiary_id,
    request_status: "accepted",
  });
  const { data: EmergencyResponse } = getAllEmergencyRequests({
    beneficiary_id,
    request_status: "accepted",
  });
  const { data: PrescriptionResponse } = getAllPrescriptionRequests({
    beneficiary_id,
    request_status: "accepted",
  });
  const { data: PlansResponse } = getPlansTurn({ beneficiary_id });
  const { data: SalaryResponse } = getAvailableSalaries(beneficiary_id);

  const aids: AvailableAid[] = useMemo(
    () => [
      ...(SpecialMaterialResponse?.data?.map(
        (e) =>
          ({
            id: e.id,
            type: "special materials",
            reason: e.reason,
            // amount: Number(e.amount),
            item_name: e.item,
          } as AvailableAid)
      ) ?? []),
      ...(EmergencyResponse?.data?.map(
        (e) =>
          ({
            id: e.id,
            type: "emergency aids",
            reason: e.reason,
            amount: e.amount,
          } as AvailableAid)
      ) ?? []),
      ...(PrescriptionResponse?.data?.map(
        (e) =>
          ({
            id: e.id,
            type: "prescription exchange",
            reason: e.reason,
          } as AvailableAid)
      ) ?? []),
      ...(PlansResponse?.data?.in_turn?.map(
        (e) =>
          ({
            id: e.id,
            type: "aids",
            item_name: e.name,
            amount: Number(e.portion),
            expiry_date: e.beneficiary.turn_until,
          } as AvailableAid)
      ) ?? []),
      ...(SalaryResponse?.data?.map(
        (e) =>
          ({
            id: e.id,
            type: "monthly salary",
            amount: e.amount,
          } as AvailableAid)
      ) ?? []),
    ],
    [
      SpecialMaterialResponse,
      EmergencyResponse,
      PrescriptionResponse,
      PlansResponse,
      SalaryResponse,
    ]
  );

  const getAidsLoading =
    SpecialMaterialResponse?.message === "wait" ||
    EmergencyResponse?.message === "wait" ||
    PrescriptionResponse?.message === "wait" ||
    PlansResponse?.message === "wait" ||
    SalaryResponse?.message === "wait";

  return { aids, getAidsLoading };
}
