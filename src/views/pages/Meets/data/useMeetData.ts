import { SingleBeneficiary } from "src/types/data/SingleBeneficiary";
import { AidRequest } from "../../RequestAdd/data/useShowEmergencyRequestData";
import { useMeet } from "src/views/APIs";

import image from "./image.png";

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

export function useMeetData(meetId: number = 1) {
  const {
    getCreateBeneficiaryRequests,
    getEmergencyAssistanceRequests,
    getSpecialMaterialRequests,
    getWithdrawalOrderRequests,
  } = useMeet();

  // Get requests for each type
  const { data: membershipRequestsData, isLoading: isLoadingMembership } =
    getCreateBeneficiaryRequests(meetId);

  const { data: emergencyAssistanceData, isLoading: isLoadingEmergency } =
    getEmergencyAssistanceRequests(meetId);

  const { data: specialMaterialsData, isLoading: isLoadingSpecial } =
    getSpecialMaterialRequests(meetId);

  const { data: withdrawalOrdersData, isLoading: isLoadingWithdrawal } =
    getWithdrawalOrderRequests(meetId);

  // Map API data to component data structures
  const membershipRequests: Partial<BeneficiaryRequest>[] =
    membershipRequestsData?.data?.map((request: any) => ({
      id: request.entity.id,
      image_url: image, // Default image for now
      first_name: request.entity.first_name,
      last_name: request.entity.last_name,
      birth_date: request.entity.birth_date.split("T")[0],
      address: request.entity.address,
      case_description: request.entity.case_description,
      request_id: request.id,
      children: request.entity.children,
      partner: request.entity.partners[0], // Assuming first partner
    })) || [];

  const emergencyAssistanceRequests: Partial<EmergencyAssistanceRequest>[] =
    emergencyAssistanceData?.data?.map((request) => ({
      id: request.entity.id,
      beneficiary: {
        id: request.entity.beneficiary.id,
        name: `${request.entity.beneficiary.first_name} ${request.entity.beneficiary.last_name}`,
      },
      reason: request.entity.reason,
      urgency_level: "medium" as const, // Default value
      requested_amount: request.entity.amount,
    })) || [];

  const specialMaterialRequests: Partial<SpecialMaterialRequest>[] =
    specialMaterialsData?.data?.map((request) => ({
      id: request.entity.id,
      beneficiary: {
        id: request.entity.beneficiary.id,
        name: `${request.entity.beneficiary.first_name} ${request.entity.beneficiary.last_name}`,
      },
      reason: request.entity.reason || "",
      urgency_level: "medium" as const, // Default value
      requested_item: request.entity.item,
    })) || [];

  const withdrawalOrderRequests: Partial<WithdrawalOrderRequest>[] =
    withdrawalOrdersData?.data?.map((request: any) => ({
      id: request.entity.id,
      beneficiary: {
        id: request.entity.beneficiary.id,
        name: `${request.entity.id}`, // You might need to get beneficiary name from elsewhere
      },
      reason: request.entity.reason,
      urgency_level: "medium" as const, // Default value
      requested_amount: request.entity.amount,
    })) || [];

  const isLoading =
    isLoadingMembership ||
    isLoadingEmergency ||
    isLoadingSpecial ||
    isLoadingWithdrawal;

  return {
    membershipRequests,
    emergencyAssistanceRequests,
    specialMaterialRequests,
    withdrawalOrderRequests,
    isLoading,
  };
}
