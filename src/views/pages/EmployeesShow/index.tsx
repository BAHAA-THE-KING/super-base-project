import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Skeleton, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import {
  GeneralEmployeeInfo,
  HistoryInfo,
  EmployeeTerminatePopup,
} from "./components";

import { useShowEmployeeData } from "./data";

import { MessagesContext } from "src/contexts";

import { varAlpha } from "src/themes/styles";

type Form = {
  first_name: string;
  last_name: string;
  father_name: string;
  national_number: string;
  birth_date: string;
  birth_place: string;
  joined_at: string;
  salary: number;
};

export function EmployeesShow({ isAdd = false }: { isAdd?: boolean }) {
  const navigate = useNavigate();
  const { employeeId: employeeIdParam } = useParams();
  const employeeId = Number(employeeIdParam) ?? 0;
  if ((!employeeId || employeeId <= 0) && !isAdd) {
    navigate("/accountant/employees");
    return <></>;
  }

  const { employee, createEmployee, updateEmployee, getEmployeeLoading } =
    useShowEmployeeData(employeeId);

  const [wantToTerminate, setWantToTerminate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  if (isEdit && !employee) {
    navigate(-1);
    return <></>;
  }

  const {
    reset,
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm<Form>({
    defaultValues: employee ?? {
      first_name: "",
      last_name: "",
      father_name: "",
      national_number: "",
      birth_date: "",
      birth_place: "",
      joined_at: "",
      salary: 0,
    },
  });

  useEffect(() => {
    if (isEdit && employee) reset(employee);
  }, [employee, isEdit]);

  const submit = handleSubmit(async (data) => {
    if (isAdd) {
      const newEmployee = await createEmployee(data);
      navigate(newEmployee.data.id.toString(), { replace: true });
    } else if (isEdit) {
      await updateEmployee({
        id: employeeId,
        ...data,
      });
      setIsEdit(false);
    }
  });
  function handleTerminate() {}

  const { aiInfo } = useContext(MessagesContext);

  return (
    <Stack
      width={"100%"}
      height={"100%"}
      borderRadius={1}
      flexDirection={"column"}
      justifyContent={"flex-start"}
      alignItems={"stretch"}
      p={2}
      sx={(theme) => ({
        backgroundColor:
          theme.palette.mode === "dark"
            ? varAlpha(theme.palette.secondary.darkerChannel, 0.2)
            : theme.palette.secondary.lighter,
      })}
    >
      {isEdit && getEmployeeLoading ? (
        <>
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={350}
            sx={{ my: 1 }}
          />
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={400}
            sx={{ my: 3 }}
          />
        </>
      ) : (
        <>
          <GeneralEmployeeInfo
            control={control}
            isDirty={isDirty}
            handleSubmit={submit}
            handleTerminate={() => setWantToTerminate(true)}
            isAdd={isAdd}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            aiInfo={aiInfo}
          />
          {isAdd ? null : employee ? <HistoryInfo employee={employee} /> : null}
          <EmployeeTerminatePopup
            employee={wantToTerminate ? employee : null}
            handleTerminate={handleTerminate}
            close={() => setWantToTerminate(false)}
          />
        </>
      )}
    </Stack>
  );
}
