import { useGetAPI, usePostAPI, usePutAPI } from "src/APIs";

type AllPatientsResponse = {
  data?: {
    id: number;
    first_name: string;
    father_name: string;
    last_name: string;
    address: string;
    birth_date: string;
    phone_number: string;
    medical_history: string;
    national_number: string;
  }[];
  message: string;
};

type CreatePatientResponse = {
  data: {
    id: number;
    first_name: string;
    father_name: string;
    last_name: string;
    address: string;
    birth_date: string;
    phone_number: string;
    medical_history: string;
    national_number: string;
  };
  message: string;
};
type CreatePatientRequest = {
  first_name: string;
  father_name: string;
  last_name: string;
  address: string;
  birth_date: string;
  phone_number: string;
  medical_history: string;
  national_number: string;
};

type UpdatePatientResponse = {
  data: {
    first_name: string;
    father_name: string;
    last_name: string;
    address: string;
    birth_date: string;
    phone_number: string;
    medical_history: string;
    national_number: string;
  };
  message: string;
};
type UpdatePatientRequest = Partial<{
  first_name: string;
  father_name: string;
  last_name: string;
  address: string;
  birth_date: string;
  phone_number: string;
  medical_history: string;
  national_number: string;
}>;

export function useClinicPatients() {
  const getAllPatients = (params: any) =>
    useGetAPI<AllPatientsResponse>("/dashboard/clinic_beneficiaries/all", {
      params,
      defaultData: { message: "wait" },
      keys: ["patients", "all", params],
    });

  const createPatient = usePostAPI<CreatePatientResponse, CreatePatientRequest>(
    "/dashboard/clinic_beneficiaries/create",
    {
      invalidateKeys: ["patients"],
    }
  ).mutateAsync;

  const updatePatient = usePutAPI<UpdatePatientResponse, UpdatePatientRequest>(
    "/dashboard/clinic_beneficiaries/update/:id",
    {
      invalidateKeys: ["patients"],
    }
  ).mutateAsync;

  return {
    getAllPatients,
    createPatient,
    updatePatient,
  };
}
