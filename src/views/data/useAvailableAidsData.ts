import { useMemo, useState } from "react";

import {
  useDeliverAid,
  useEmergencyRequests,
  useItems,
  usePlans,
  usePrescriptionRequest,
  useSalary,
  useSpecialMaterialRequest,
} from "../APIs";

import { AvailableAid, Item } from "src/types/data/AvailableAid";

export function useAvailableAidsData(beneficiary_id: number) {
  const { getAllEmergencyRequests } = useEmergencyRequests();
  const { getAllPrescriptionRequests } = usePrescriptionRequest();
  const { getAllSpecialMaterialRequests } = useSpecialMaterialRequest();
  const { getPlansTurn } = usePlans();
  const { getAvailableSalaries } = useSalary();
  const { getAllItems } = useItems();
  const { deliverAPI } = useDeliverAid();

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

  const { data: ItemsResponse } = getAllItems({});

  const aids: AvailableAid[] = useMemo(
    () => [
      ...(SpecialMaterialResponse?.data?.map(
        (e) =>
          ({
            id: e.id,
            beneficiary_id: e.beneficiary.id,
            type: "special materials",
            reason: e.reason,
            amount: Number(e.amount),
            // category_id: e.item, TODO:
            category_name: e.item,
          } as AvailableAid)
      ) ?? []),
      ...(EmergencyResponse?.data?.map(
        (e) =>
          ({
            id: e.id,
            beneficiary_id: e.beneficiary.id,
            type: "emergency aids",
            reason: e.reason,
            amount: e.amount,
          } as AvailableAid)
      ) ?? []),
      ...(PrescriptionResponse?.data?.map(
        (e) =>
          ({
            id: e.id,
            beneficiary_id: e.beneficiary.id,
            type: "prescription exchange",
            reason: e.reason,
          } as AvailableAid)
      ) ?? []),
      ...(PlansResponse?.data?.in_turn?.map(
        (e) =>
          ({
            id: e.beneficiary.pivot_id,
            beneficiary_id: e.beneficiary.beneficiary_id,
            type: "aids",
            category_id: e.category.id,
            category_name: e.category.name,
            amount: Number(e.portion),
            expiry_date: e.beneficiary.turn_until,
          } as AvailableAid)
      ) ?? []),
      ...(SalaryResponse?.data?.map(
        (e) =>
          ({
            id: e.id,
            beneficiary_id: e.beneficiary_id,
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

  const items: Item[] =
    ItemsResponse?.data
      ?.filter((e) => e.amount)
      ?.map((e) => ({
        id: e.id,
        name: e.name,
        amount: e.amount + " " + e.unit,
      })) ?? [];

  const getAidsLoading =
    SpecialMaterialResponse?.message === "wait" ||
    EmergencyResponse?.message === "wait" ||
    PrescriptionResponse?.message === "wait" ||
    PlansResponse?.message === "wait" ||
    SalaryResponse?.message === "wait";

  const getItemsLoading = ItemsResponse?.message === "wait";

  const [deliverAidLoading, setDeliverAidLoading] = useState(false);
  const deliverAid = (qr: string, aid: AvailableAid, item_id?: number) => {
    setDeliverAidLoading(true);
    return deliverAPI({
      data: {
        qr_code: qr,
        beneficiary_id: aid.beneficiary_id,
        type:
          aid.type === "aids"
            ? "plan"
            : aid.type === "emergency aids"
            ? "instant_aid"
            : aid.type === "monthly salary"
            ? "salary"
            : aid.type === "special materials"
            ? "need_request"
            : "plan", // wrong
        item_id,
        entity_id: aid.id,
      },
    }).finally(() => setDeliverAidLoading(false));
  };

  return {
    aids,
    getAidsLoading,
    items,
    getItemsLoading,
    deliverAid,
    deliverAidLoading,
  };
}
