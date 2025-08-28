import { useDeleteAPI, useGetAPI, usePostAPI, usePutAPI } from "src/APIs";

type AllAppointmentsResponse = {
  data?: {
    id: number;
    owner_id: number;
    owner_type: string;
    date: string;
    start_time: string;
    end_time: string;
    price: number;
    status: string;
    result: string;
    doctor: {
      id: number;
      name: string;
      address: string;
      birth_date: string;
      specialization: string;
      phone: string;
      birth_place: string;
      session_price: number;
      is_active: number;
    };
    owner: {
      id: number;
      first_name: string;
      father_name: string;
      last_name: string;
      birth_date: string;
      phone_number: string;
      address: string;
      medical_history: string;
    };
    discount: {
      reason: string;
    };
  }[];
  message: string;
};

type FilteredAppointmentsResponse = {
  data?: {
    data: {
      id: number;
      owner_id: number;
      owner_type: string;
      date: string;
      start_time: string;
      end_time: string;
      price: number;
      reason: string;
      status?: "done" | "canceled" | "retarded";
      result: string;
      doctor: {
        id: number;
        name: string;
        address: string;
        birth_date: string;
        specialization: string;
        phone: string;
        birth_place: string;
        session_price: number;
        is_active: number;
      };
      owner: {
        id: number;
        first_name: string;
        father_name: string;
        last_name: string;
        national_number: string;
        birth_date: string;
        phone_number: string;
        address: string;
        medical_history: string;
      };
      discount: {
        reason: string;
      };
    }[];
    total: number;
  };
  message: string;
};

type AppointmentResponse = {
  data?: {
    id: number;
    owner_id: number;
    owner_type: string;
    date: string;
    start_time: string;
    end_time: string;
    price: number;
    reason: string;
    status?: "done" | "canceled" | "retarded";
    result: string;
    doctor: {
      id: number;
      name: string;
      address: string;
      birth_date: string;
      specialization: string;
      phone: string;
      birth_place: string;
      session_price: number;
      is_active: number;
    };
    owner: {
      id: number;
      first_name: string;
      father_name: string;
      last_name: string;
      national_number: string;
      birth_date: string;
      phone_number: string;
      address: string;
      medical_history: string;
    };
    discount: {
      reason: string;
    };
  };
  message: string;
};

type CreateAppointmentResponse = {
  data: {
    id: number;
    owner_id: number;
    owner_type: string;
    date: string;
    start_time: string;
    end_time: string;
    price: number;
    reason: string;
    status: string;
    result: string;
    doctor: {
      id: number;
      name: string;
      address: string;
      birth_date: string;
      specialization: string;
      phone: string;
      birth_place: string;
      session_price: number;
      is_active: number;
    };
    owner: {
      id: number;
      first_name: string;
      father_name: string;
      last_name: string;
      birth_date: string;
      phone_number: string;
      address: string;
      medical_history: string;
    };
    discount: {
      reason: string;
    };
  };
  message: string;
};
type CreateAppointmentRequest = {
  owner_id: number;
  owner_type: "normal" | "clinic";
  date: string;
  doctor_id: number;
  start_time: string;
  reason: string;
  discount?: {
    reason?: string;
  };
};

type UpdateAppointmentResponse = {
  data: {
    owner_id: number;
    owner_type: "normal" | "clinic";
    date: string;
    doctor_id: number;
    reason: string;
    start_time: string;
    result: string;
    status: "done" | "canceled" | "retarded";
    discount: {
      reason: string;
    };
  };
  message: string;
};
type UpdateAppointmentRequest = Partial<{
  owner_id: number;
  owner_type: "normal" | "clinic";
  date: string;
  doctor_id: number;
  start_time: string;
  reason: string;
  result: string;
  status: "done" | "canceled" | "retarded";
  discount?: {
    reason?: string;
  };
}>;

type DeleteAppointmentResponse = {
  id: number;
  owner_id: number;
  owner_type: string;
  date: string;
  start_time: string;
  end_time: string;
  price: number;
  status: string;
  result: string;
  doctor: {
    id: number;
    name: string;
    address: string;
    birth_date: string;
    specialization: string;
    phone: string;
    birth_place: string;
    session_price: number;
    is_active: number;
  };
  owner: {
    id: number;
    first_name: string;
    father_name: string;
    last_name: string;
    birth_date: string;
    phone_number: string;
    address: string;
    medical_history: string;
  };
  discount: {
    reason: string;
  };
};

export function useAppointments() {
  const getAllAppointments = (params: any) =>
    useGetAPI<AllAppointmentsResponse>("/dashboard/appointments/all", {
      params,
      defaultData: { message: "wait" },
      keys: ["appointments", "all", params],
    });

  const getFilteredAppointments = (params: any) =>
    useGetAPI<FilteredAppointmentsResponse>("/dashboard/appointments/index", {
      params,
      defaultData: { message: "wait" },
      keys: ["appointments", params],
    });

  const getAppointment = (id: number) =>
    useGetAPI<AppointmentResponse>("/dashboard/appointments/show/:id", {
      params: { id },
      defaultData: { message: "wait" },
      enabled: Boolean(id),
      keys: ["appointments", id],
    });

  const createAppointment = usePostAPI<
    CreateAppointmentResponse,
    CreateAppointmentRequest
  >("/dashboard/appointments/create", {
    invalidateKeys: ["appointments"],
  }).mutateAsync;

  const updateAppointment = usePutAPI<
    UpdateAppointmentResponse,
    UpdateAppointmentRequest
  >("/dashboard/appointments/update/:id", {
    invalidateKeys: ["appointments"],
  }).mutateAsync;

  const deleteAppointment = useDeleteAPI<DeleteAppointmentResponse>(
    "/dashboard/appointments/delete/:id",
    {
      invalidateKeys: ["appointments"],
    }
  ).mutateAsync;

  return {
    getAllAppointments,
    getFilteredAppointments,
    getAppointment,
    createAppointment,
    updateAppointment,
    deleteAppointment,
  };
}
