import { useMemo, useState } from "react";

import { useEmployees } from "src/views/APIs";

import { Employee } from "src/types/data/Employee";

export function useEmployeeShowData(employeeId: number) {
  const { createEmployeeAPI, showEmployeeAPI, updateEmployeeAPI } =
    useEmployees();

  const { data: employeeResponse } = showEmployeeAPI(employeeId);

  const employeeData = employeeResponse?.data;
  const employee = useMemo<Employee | null>(
    () =>
      employeeData
        ? {
            ...employeeData,
            national_number: "123456",
            mobile: employeeData.phone,
            joined_at: employeeData.joined_in,
          }
        : null,
    [employeeData]
  );
  const getEmployeeLoading = false;

  const [createEmployeeLoading, setCreateEmployeeLoading] = useState(false);
  const createEmployee = (employee: Employee) => {
    setCreateEmployeeLoading(true);
    return createEmployeeAPI({
      data: {
        first_name: employee.first_name,
        last_name: employee.last_name,
        father_name: employee.father_name,
        role: employee.role,
        salary: employee.salary,
        address: employee.address,
        birth_date: employee.birth_date,
        birth_place: employee.birth_place,
        phone: employee.mobile,
        joined_in: employee.joined_at,
      },
    }).finally(() => setCreateEmployeeLoading(false));
  };

  const [updateEmployeeLoading, setUpdateEmployeeLoading] = useState(false);
  const updateEmployee = (employee: Employee) => {
    setUpdateEmployeeLoading(true);
    return updateEmployeeAPI({
      params: { id: employee.id },
      data: {
        first_name: employee.first_name,
        last_name: employee.last_name,
        father_name: employee.father_name,
        role: employee.role,
        salary: employee.salary,
        address: employee.address,
        birth_date: employee.birth_date,
        birth_place: employee.birth_place,
        phone: employee.mobile,
        joined_in: employee.joined_at,
      },
    }).finally(() => setUpdateEmployeeLoading(false));
  };

  const [createTaskLoading] = useState(false);
  const createNewTask = (_: {
    employee_id: number;
    date: string;
    from: string;
    to: string;
    got_money: number;
    person_id: number;
  }) => {};

  return {
    employee,
    getEmployeeLoading,
    createEmployee,
    createEmployeeLoading,
    updateEmployee,
    updateEmployeeLoading,
    createNewTask,
    createTaskLoading,
  };
}
