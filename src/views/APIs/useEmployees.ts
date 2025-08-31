import { useGetAPI, usePostAPI, usePutAPI } from "src/APIs";

type CreateEmployeeResponse = {
  data?: {
    id: number;
    first_name: string;
    last_name: string;
    father_name: string;
    role: string;
    birth_date: string;
    birth_place: string;
    phone: string;
    address: string;
    salary: number;
    joined_in: string;
  };
  message: string;
};
type CreateEmployeeRequest = {
  first_name: string;
  last_name: string;
  father_name: string;
  role: string;
  salary: number;
  address: string;
  birth_date: string;
  birth_place: string;
  phone: string;
  joined_in: string;
};

type UpdateEmployeeResponse = {
  data?: {
    id: number;
    first_name: string;
    last_name: string;
    father_name: string;
    role: string;
    birth_date: string;
    birth_place: string;
    phone: string;
    address: string;
    salary: number;
    joined_in: string;
  };
  message: string;
};
type UpdateEmployeeRequest = {
  first_name: string;
  last_name: string;
  father_name: string;
  role: string;
  salary: number;
  address: string;
  birth_date: string;
  birth_place: string;
  phone: string;
  joined_in: string;
};

type ShowEmployeeResponse = {
  data?: {
    id: number;
    first_name: string;
    last_name: string;
    father_name: string;
    role: string;
    birth_date: string;
    birth_place: string;
    phone: string;
    address: string;
    salary: number;
    joined_in: string;
  };
  message: string;
};

type IndexEmployeeResponse = {
  data: {
    data: {
      id: number;
      first_name: string;
      last_name: string;
      father_name: string;
      role: string;
      birth_date: string;
      birth_place: string;
      phone: string;
      address: string;
      salary: number;
      joined_in: string;
    }[];
    total: number;
  };
  message: string;
};

export function useEmployees() {
  const getIndexEmployeesAPI = (params: any) =>
    useGetAPI<IndexEmployeeResponse>("/dashboard/employees/index", {
      params,
      invalidateKeys: ["employees"],
    });

  const createEmployeeAPI = usePostAPI<
    CreateEmployeeResponse,
    CreateEmployeeRequest
  >("/dashboard/employees/create", {
    invalidateKeys: ["employees"],
  }).mutateAsync;

  const updateEmployeeAPI = usePutAPI<
    UpdateEmployeeResponse,
    UpdateEmployeeRequest
  >("/dashboard/employees/update/:id", {
    invalidateKeys: ["employees"],
  }).mutateAsync;

  const showEmployeeAPI = (employeeId: number) =>
    useGetAPI<ShowEmployeeResponse>("/dashboard/employees/show/:employeeId", {
      params: { employeeId },
      enabled: Boolean(employeeId),
      keys: ["employees"],
      defaultData: {
        message: "wait",
      },
    });

  return {
    createEmployeeAPI,
    updateEmployeeAPI,
    showEmployeeAPI,
    getIndexEmployeesAPI,
  };
}
