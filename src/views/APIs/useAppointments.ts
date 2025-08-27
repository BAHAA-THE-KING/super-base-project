import { useDeleteAPI, useGetAPI, usePostAPI, usePutAPI } from "src/APIs";

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
        amount: number;
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
      amount: number;
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
      amount: number;
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
  discount: {
    reason: string;
    amount: string;
  };
};

type UpdateAppointmentResponse = {
  data: {
    owner_id: number;
    owner_type: "normal" | "clinic";
    date: string;
    doctor_id: number;
    start_time: string;
    discount: {
      reason: string;
      amount: string;
    };
  };
  message: string;
};
type UpdateAppointmentRequest = {
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

type DeleteAppointmentResponse = {
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

export function useAppointments() {
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
    getFilteredAppointments,
    getAppointment,
    createAppointment,
    updateAppointment,
    deleteAppointment,
  };
}
