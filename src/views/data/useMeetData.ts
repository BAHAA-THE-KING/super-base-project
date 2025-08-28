import { useMemo, useState } from "react";

import { useMeet } from "src/views/APIs";

import { SingleBeneficiary } from "src/types/data/SingleBeneficiary";
import { AidRequest } from "src/types/data/AidRequest";

export type BeneficiaryRequest = Pick<
  SingleBeneficiary,
  | "id"
  | "image_url"
  | "first_name"
  | "last_name"
  | "birth_date"
  | "address"
  | "case_description"
  | "request_id"
  | "children"
  | "partner"
>;

export type EmergencyAssistanceRequest = AidRequest;

export type SpecialMaterialRequest = {
  id: number;
  beneficiary: { id: number; name: string };
  reason: string;
  urgency_level: "low" | "medium" | "high";
  requested_item: string;
};

export type WithdrawalOrderRequest = {
  id: number;
  beneficiary: { id: number; name: string };
  reason: string;
  urgency_level: "low" | "medium" | "high";
  requested_amount: number;
};

export function useMeetData(meetId?: number) {
  const {
    getCreateBeneficiaryRequests,
    getEmergencyAssistanceRequests,
    getSpecialMaterialRequests,
    getWithdrawalOrderRequests,
    addMeet,
    getAllMeets,
    submitMeet: submitMeetAPI,
  } = useMeet();

  // Get requests for each type
  const { data: membershipRequestsData } = getCreateBeneficiaryRequests(meetId);

  const { data: emergencyAssistanceData } =
    getEmergencyAssistanceRequests(meetId);

  const { data: specialMaterialsData } = getSpecialMaterialRequests(meetId);

  const { data: withdrawalOrdersData } = getWithdrawalOrderRequests(meetId);

  // Map API data to component data structures
  const membershipRequests: Partial<BeneficiaryRequest>[] = useMemo(
    () =>
      membershipRequestsData?.data?.map((request) => ({
        id: request.entity.id,
        image_url: request.entity.personalImage.file,
        first_name: request.entity.first_name,
        last_name: request.entity.last_name,
        birth_date: request.entity.birth_date.split("T")[0],
        address: request.entity.address,
        case_description: request.entity.case_description,
        request_id: request.id,
        children: request.entity.children.map((e) => ({
          ...e,
          beneficiary_id: request.entity.id,
        })),
        partner: {
          ...request.entity.partners[0],
          beneficiary_id: request.entity.id,
        } as BeneficiaryRequest["partner"], // Assuming first partner
      })) || [],
    [membershipRequestsData?.data]
  );

  const emergencyAssistanceRequests: Partial<EmergencyAssistanceRequest>[] =
    useMemo(
      () =>
        emergencyAssistanceData?.data?.map((request) => ({
          id: request.entity.id,
          beneficiary: {
            id: request.entity.beneficiary.id,
            name: `${request.entity.beneficiary.first_name} ${request.entity.beneficiary.last_name}`,
          },
          reason: request.entity.reason,
          urgency_level: "medium" as const, // Default value
          requested_amount: request.entity.amount,
        })) || [],
      [emergencyAssistanceData?.data]
    );

  const specialMaterialRequests: Partial<SpecialMaterialRequest>[] = useMemo(
    () =>
      specialMaterialsData?.data?.map((request) => ({
        id: request.entity.id,
        beneficiary: {
          id: request.entity.beneficiary.id,
          name: `${request.entity.beneficiary.first_name} ${request.entity.beneficiary.last_name}`,
        },
        reason: request.entity.reason || "",
        urgency_level: "medium" as const, // Default value
        requested_item: request.entity.item,
      })) || [],
    [specialMaterialsData?.data]
  );

  const withdrawalOrderRequests: Partial<WithdrawalOrderRequest>[] = useMemo(
    () =>
      withdrawalOrdersData?.data?.map((request: any) => ({
        id: request.entity.id,
        beneficiary: {
          id: request.entity.beneficiary.id,
          name: `${request.entity.first_name} ${request.entity.last_name}`, // You might need to get beneficiary name from elsewhere
        },
        reason: request.entity.reason,
        urgency_level: "medium" as const, // Default value
        requested_amount: request.entity.amount,
      })) || [],
    [withdrawalOrdersData?.data]
  );

  const [createMeetLoading, setCreateMeetLoading] = useState(false);

  const createMeet = (data: { name: string; date: string }) => {
    setCreateMeetLoading(true);
    return addMeet({ data }).finally(() => setCreateMeetLoading(false));
  };

  const [submitMeetLoading, setSubmitMeetLoading] = useState(false);

  const submitMeet = (data: {
    meetId: number;
    requests: {
      request_id: number;
      status: "accepted" | "rejected";
      reason: string;
    }[];
  }) => {
    setSubmitMeetLoading(true);
    return submitMeetAPI({ data, params: { meetId } }).finally(() =>
      setSubmitMeetLoading(false)
    );
  };

  const { data: pendingMeetsResponse } = getAllMeets({ status: "pending" });

  const pendingMeets = pendingMeetsResponse?.data;
  const pendingMeetsLoading = pendingMeetsResponse?.message === "wait";

  const isLoading =
    membershipRequestsData?.message === "wait" ||
    emergencyAssistanceData?.message === "wait" ||
    specialMaterialsData?.message === "wait" ||
    withdrawalOrdersData?.message === "wait" ||
    pendingMeetsResponse?.message === "wait" ||
    createMeetLoading;
  return {
    membershipRequests,
    emergencyAssistanceRequests,
    specialMaterialRequests,
    withdrawalOrderRequests,
    createMeet,
    pendingMeets,
    pendingMeetsLoading,
    isLoading,
    submitMeet,
    submitMeetLoading,
  };
}
