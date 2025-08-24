import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import { AppointmentForm, AppointmentDetails } from "./components";

import { useAppointmentsData } from "../AppointmentsAll/data";

import { varAlpha } from "src/themes/styles";

import { AppointmentCreate } from "src/types/data/AppointmentCreate";
import { AppointmentTable } from "src/types/data/AppointmentTable";

type Form = AppointmentCreate &
  AppointmentTable & { showWantDiscount: boolean };

export function AppointmentsShow({ isAdd = false }: { isAdd?: boolean }) {
  const navigate = useNavigate();
  const { appointmentId: appointmentIdParam } = useParams();
  const appointmentId = Number(appointmentIdParam);
  if ((!appointmentId || appointmentId <= 0) && !isAdd) {
    navigate("/clinic/appointments");
    return <></>;
  }

  const {
    appointments,
    beneficiaries,
    doctors,
    isLoading,
    createAppointment,
    editAppointment,
    editHealthInfo,
    addAppointmentResult,
  } = useAppointmentsData();
  const appointment = appointments.find((e) => e.id === appointmentId)!;

  const {
    reset,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { isDirty, isValid },
  } = useForm<Form>({
    defaultValues: {
      beneficiary_id: 0,
      beneficiary_national_number: "",
      doctor_id: 0,
      date: "",
      from: "",
      to: "",
      reason: "",
      wantDiscount: "",
      showWantDiscount: false,
    },
  });

  useEffect(() => {
    if (appointment) reset(appointment);
  }, [appointment]);

  const submit = handleSubmit((data) => {
    createAppointment({ data }).then(() => navigate("/clinic/appointments"));
  });

  return (
    <Stack
      width={"100%"}
      minHeight={"100%"}
      borderRadius={1}
      flexDirection={{
        sx: "column",
        md: "row",
      }}
      justifyContent={"flex-start"}
      p={3}
      sx={(theme) => ({
        backgroundColor:
          theme.palette.mode === "dark"
            ? varAlpha(theme.palette.primary.darkerChannel, 0.2)
            : theme.palette.primary.lighter,
      })}
    >
      {isAdd ? (
        <AppointmentForm
          control={control}
          beneficiaries={beneficiaries}
          doctors={doctors}
          isValid={isValid}
          isDirty={isDirty}
          watch={watch}
          setValue={setValue}
          submit={submit}
        />
      ) : (
        <AppointmentDetails
          appointment={appointment}
          editAppointment={editAppointment}
          editHealthInfo={editHealthInfo}
          addAppointmentResult={addAppointmentResult}
        />
      )}
    </Stack>
  );
}
