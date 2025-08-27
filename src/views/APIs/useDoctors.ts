import { useGetAPI, usePostAPI, usePutAPI } from "src/APIs";

type FilteredDoctorsResponse = {
  data?: {
    current_page: number;
    data: {
      id: number;
      name: string;
      address: string;
      birth_date: string;
      specialization: string;
      phone: string;
      birth_place: string;
      session_price: number;
      is_active: number;
    }[];

    total: number;
  };
  message: string;
};

type CreateDoctorResponse = {
  data: {
    id: number;
    name: string;
    address: string;
    birth_date: string;
    birth_place: string;
    phone: string;
    session_price: number;
    specialization: string;
    is_active: number;
    working_hours: {
      id: number;
      day: string;
      start_time: string;
      end_time: string;
    }[];
  };
  message: string;
};
type CreateDoctorRequest = {
  name: string;
  address: string;
  birth_date: string;
  birth_place: string;
  phone: string;
  session_price: number;
  specialization: string;
  working_hours: {
    day: string;
    start_time: string;
    end_time: string;
  }[];
};

type UpdateDoctorResponse = {
  data: {
    id: number;
    name: string;
    address: string;
    birth_date: string;
    birth_place: string;
    phone: string;
    session_price: number;
    specialization: string;
    is_active: number;
    working_hours: {
      id: number;
      day: string;
      start_time: string;
      end_time: string;
    }[];
  };
  message: string;
};
type UpdateDoctorRequest = {
  name: string;
  address: string;
  birth_date: string;
  birth_place: string;
  phone: string;
  session_price: number;
  specialization: string;
  working_hours: {
    day: string;
    start_time: string;
    end_time: string;
  }[];
};

export function useDoctors() {
  const getFilteredDoctors = (params: any) =>
    useGetAPI<FilteredDoctorsResponse>("/dashboard/doctors/index", {
      params,
      defaultData: { message: "wait" },
      keys: ["doctors", params],
    });

  const createDoctor = usePostAPI<CreateDoctorResponse, CreateDoctorRequest>(
    "/dashboard/doctors/create",
    {
      invalidateKeys: ["doctors"],
    }
  ).mutateAsync;

  const updateDoctor = usePutAPI<UpdateDoctorResponse, UpdateDoctorRequest>(
    "/dashboard/doctors/update/:id",
    {
      invalidateKeys: ["doctors"],
    }
  ).mutateAsync;

  return { getFilteredDoctors, createDoctor, updateDoctor };
}
