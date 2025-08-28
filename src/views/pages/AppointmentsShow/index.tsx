import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Skeleton, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import { AppointmentForm, AppointmentDetails } from "./components";

import { varAlpha } from "src/themes/styles";

import { MessagesContext } from "src/contexts";

import { AppointmentCreate } from "src/types/data/AppointmentCreate";
import { AppointmentTable } from "src/types/data/AppointmentTable";
import { useAppointmentData } from "src/views/data";

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
    appointment,
    getAppointmentLoading,
    beneficiaries,
    getBeneficiariesLoading,
    doctors,
    getDoctorsLoading,
    createAppointment,
    createAppointmentLoading,
    updateAppointmentStatus,
    updateAppointmentResult,
    updateAppointmentLoading,
    deleteAppointment,
    deleteAppointmentLoading,
    createPatient,
    createPatientLoading,
    updatePatientHealthInfo,
    updatePatientLoading,
  } = useAppointmentData(appointmentId);

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
    reset({
      beneficiary_id: 0,
      beneficiary_national_number: "",
      doctor_id: 0,
      date: "",
      from: "",
      to: "",
      reason: "",
      wantDiscount: "",
      showWantDiscount: false,
    });
  }, [isAdd]);
  useEffect(() => {
    if (appointment) reset(appointment);
  }, [appointment]);

  const submit = handleSubmit((data) => {
    createAppointment(data).then((res) =>
      navigate("/clinic/appointments/" + res.data.id)
    );
  });

  const { aiInfo } = useContext(MessagesContext);

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
      {(!isAdd && getAppointmentLoading) ||
      (isAdd && (getBeneficiariesLoading || getDoctorsLoading)) ? (
        <>
          <Skeleton width={"100%"} height={800} variant="rounded" />
        </>
      ) : isAdd ? (
        <AppointmentForm
          control={control}
          beneficiaries={beneficiaries}
          doctors={doctors}
          isValid={isValid}
          isDirty={isDirty}
          watch={watch}
          setValue={setValue}
          submit={submit}
          aiInfo={aiInfo}
          loading={createAppointmentLoading}
          createPatient={createPatient}
          createPatientLoading={createPatientLoading}
        />
      ) : appointment ? (
        <AppointmentDetails
          appointment={appointment}
          editAppointmentStatus={updateAppointmentStatus}
          addAppointmentResult={updateAppointmentResult}
          editAppointmentLoading={updateAppointmentLoading}
          editHealthInfo={updatePatientHealthInfo}
          editHealthInfoLoading={updatePatientLoading}
        />
      ) : null}
    </Stack>
  );
}
