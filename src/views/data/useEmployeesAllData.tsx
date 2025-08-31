import { useRef } from "react";

import { useEmployees } from "src/views/APIs";

import { Employee } from "src/types/data/Employee";

export function useEmployeesAllData(params: any) {
  const { getIndexEmployeesAPI } = useEmployees();

  const { data: employeesResponse } = getIndexEmployeesAPI(params);
  const employeesData = employeesResponse?.data;
  const employees: Employee[] =
    employeesData?.data.map((e) => ({
      ...e,
      national_number: "123456",
      mobile: e.phone,
      joined_at: e.joined_in,
    })) ?? [];

  const totalRows = useRef(0);

  if (employeesResponse?.data?.total !== undefined) {
    totalRows.current = employeesResponse.data.total;
  }

  const getEmployeesLoading = employeesResponse?.message === "wait";

  return {
    employees,
    totalRows: totalRows.current,
    getEmployeesLoading,
  };
}
