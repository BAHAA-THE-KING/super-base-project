import { useGetAPI, usePostAPI, usePutAPI } from "src/APIs";

// Base types for all request types
type MeetPartner = {
  id: number;
  first_name: string;
  last_name: string;
  job: string;
  gender: string;
  health_status: string;
};

type MeetUncle = {
  id: number;
  from: string;
  first_name: string;
  last_name: string;
  job: string;
  provided_aid: string;
};

type MeetChild = {
  id: number;
  name: string;
  birth_date: string;
  gender: string;
  is_alive: boolean;
  partner_name: string;
  residence_place: string;
};

// Entity for create_beneficiary requests
type MeetEntity = {
  id: number;
  first_name: string;
  last_name: string;
  father_name: string;
  mother_name: string;
  birth_date: string;
  birth_place: string;
  national_number: string;
  job: string;
  health_status: string;
  phone_number: string;
  address: string;
  residence_type: string;
  monthly_income: number;
  case_description: string;
  group_id: number;
  request_status: string;
  partners: MeetPartner[];
  uncles: MeetUncle[];
  children: MeetChild[];
};

// Entity for emergency_assistance requests
type EmergencyAssistanceEntity = {
  id: number;
  amount: number;
  reason: string;
  request_status: string;
  received_at: string;
  beneficiary: {
    id: number;
    first_name: string;
    last_name: string;
    national_number: string;
  };
};

// Entity for special_materials requests
type SpecialMaterialEntity = {
  id: number;
  item: string;
  request_status: string;
  received_at: string;
  reason: string;
  beneficiary: {
    id: number;
    first_name: string;
    last_name: string;
    national_number: string;
  };
};

// Entity for withdrawal_orders requests
type WithdrawalOrderEntity = {
  id: number;
  amount: number;
  reason: string;
  request_status: string;
  received_at: string;
};

// Base request type
type BaseMeetRequest = {
  id: number;
  status: string;
  reason: string | null;
  request_type: string;
};

// Specific request types for each request_type
type CreateBeneficiaryRequest = BaseMeetRequest & {
  request_type: "create_beneficiary";
  entity: MeetEntity;
};

type EmergencyAssistanceRequest = BaseMeetRequest & {
  request_type: "instant_aid";
  entity: EmergencyAssistanceEntity;
};

type SpecialMaterialRequest = BaseMeetRequest & {
  request_type: "need_request";
  entity: SpecialMaterialEntity;
};

type WithdrawalOrderRequest = BaseMeetRequest & {
  request_type: "withdrawal_orders";
  entity: WithdrawalOrderEntity;
};

// Union type for all request types
type MeetRequest =
  | CreateBeneficiaryRequest
  | EmergencyAssistanceRequest
  | SpecialMaterialRequest
  | WithdrawalOrderRequest;

// Generic response type
type GetMeetResponse<T extends MeetRequest = MeetRequest> = {
  data: T[];
  message: string;
};

// Request type enum for type safety
export type RequestType =
  | "create_beneficiary"
  | "instant_aid"
  | "need_request"
  | "withdrawal_orders";

// Create meet types
type CreateMeetRequest = {
  name: string;
  date: string;
};

type CreateMeetResponse = {
  data: {
    id: number;
    name: string;
    status: string;
    date: string;
  };
  message: string;
};

type AllMeetResponse = {
  data: {
    id: number;
    name: string;
    status: string;
    date: string;
  }[];
  message: string;
};

type SubmitMeetRequest = {
  requests: {
    request_id: number;
    status: "accepted" | "rejected";
    reason: string;
  }[];
};
type SubmitMeetResponse = {};

export function useMeet() {
  // Generic function to get requests for any meet type
  const getRequestsForMeet = <T extends MeetRequest = MeetRequest>(
    meetId: number,
    request_type: RequestType
  ) =>
    useGetAPI<GetMeetResponse<T>>("/dashboard/meets/:id/requests", {
      params: { id: meetId, request_type },
      keys: ["meets"],
      defaultData: {
        message: "wait",
        data: [],
      },
    });

  // Specific functions for each request type for better type safety
  const getCreateBeneficiaryRequests = (meetId: number) =>
    getRequestsForMeet<CreateBeneficiaryRequest>(meetId, "create_beneficiary");

  const getEmergencyAssistanceRequests = (meetId: number) =>
    getRequestsForMeet<EmergencyAssistanceRequest>(meetId, "instant_aid");

  const getSpecialMaterialRequests = (meetId: number) =>
    getRequestsForMeet<SpecialMaterialRequest>(meetId, "need_request");

  const getWithdrawalOrderRequests = (meetId: number) =>
    getRequestsForMeet<WithdrawalOrderRequest>(meetId, "withdrawal_orders");

  const addMeet = usePostAPI<CreateMeetResponse, CreateMeetRequest>(
    "/dashboard/meets/create",
    { invalidateKeys: ["meets"] }
  ).mutateAsync;

  const getAllMeets = (params: { status: string }) =>
    useGetAPI<AllMeetResponse>("/dashboard/meets/all", {
      params,
      keys: ["meets"],
      defaultData: {
        data: [],
        message: "wait",
      },
    });

  const submitMeet = usePutAPI<SubmitMeetResponse, SubmitMeetRequest>(
    "/dashboard/meets/:meetId/submit-results",
    { invalidateKeys: ["meets"] }
  ).mutateAsync;

  return {
    getRequestsForMeet,
    getCreateBeneficiaryRequests,
    getEmergencyAssistanceRequests,
    getSpecialMaterialRequests,
    getWithdrawalOrderRequests,
    addMeet,
    getAllMeets,
    submitMeet,
  };
}
