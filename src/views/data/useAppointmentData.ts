import { useMemo, useState } from "react";

import {
  useAppointments,
  useBeneficiaries,
  useClinicPatients,
  useDoctors,
} from "../APIs";

import {
  AppointmentBeneficiary,
  AppointmentCreate,
  AppointmentDoctor,
} from "src/types/data/AppointmentCreate";
import { AppointmentTable } from "src/types/data/AppointmentTable";

function add30m(time: string) {
  let hh: any = Number(time.split(":")[0]);
  let mm: any = Number(time.split(":")[1]);

  mm += 30;

  if (mm >= 60) {
    hh++;
    mm = 0;
  }
  if (hh >= 24) hh = 0;

  if (mm < 10) mm = "0" + mm;
  else mm = mm.toString();
  if (hh < 10) hh = "0" + hh;
  else hh = hh.toString();

  return hh + ":" + mm;
}

type Appointment = AppointmentCreate & AppointmentTable;

export function useAppointmentData(id: number) {
  const {
    getAllAppointments,
    getAppointment,
    createAppointment: createAppointmentAPI,
    updateAppointment: updateAppointmentAPI,
    deleteAppointment: deleteAppointmentAPI,
  } = useAppointments();
  const { getAllDoctors } = useDoctors();
  const { getAllBeneficiaries } = useBeneficiaries();
  const { getAllPatients } = useClinicPatients();

  const { data: appointmentsResponse } = getAppointment(id);
  const { data: doctorsResponse } = getAllDoctors({});
  const { data: beneficiariesResponse } = getAllBeneficiaries({});
  const { data: patientsResponse } = getAllPatients({});

  const appointmentData = appointmentsResponse?.data;
  const doctorsData = doctorsResponse?.data;
  const beneficiariesData = beneficiariesResponse?.data;
  const patientsData = patientsResponse?.data;

  const { data: appointmentsHistoryResponse } = getAllAppointments({
    owner_id: appointmentData?.owner_id,
    owner_type: appointmentData?.owner_type,
  });
  const appointmentsHistoryData = appointmentsHistoryResponse?.data;

  const appointment: AppointmentTable | null = useMemo(
    () =>
      appointmentData && appointmentsHistoryData
        ? {
            id: appointmentData.id,
            beneficiary_id: appointmentData.owner_id,
            beneficiary_name:
              appointmentData.owner.first_name +
              " " +
              appointmentData.owner.last_name,
            beneficiary_national_number: appointmentData.owner.national_number,
            date: appointmentData.date.split("T")[0],
            doctor_id: appointmentData.doctor.id,
            doctor_name: appointmentData.doctor.name,
            from: appointmentData.start_time,
            status:
              appointmentData.status === "done"
                ? "finished"
                : appointmentData.status === "canceled"
                ? "canceled"
                : appointmentData.status === "retarded"
                ? "missed"
                : "pending",
            to: add30m(appointmentData.start_time),
            healthInfo: appointmentData.owner.medical_history,
            history: appointmentsHistoryData
              .map((e) => ({
                id: e.id,
                doctor_name: e.doctor.name,
                date: e.date.split("T")[0],
                status: e.status as "done" | "canceled" | "retarded",
                result: e.result,
              }))
              .reverse() as AppointmentTable["history"],
            price: appointmentData.price.toString(),
            result: appointmentData.result,
            showWantDiscount: Boolean(appointmentData.discount?.reason),
            wantDiscount: appointmentData.discount?.reason,
            reason: appointmentData.reason,
          }
        : null,
    [appointmentData, appointmentsHistoryData]
  );
  const doctors = useMemo<AppointmentDoctor[]>(
    () =>
      doctorsData?.map(
        (e) =>
          ({
            id: e.id,
            name: e.name,
            attendance_schedules: e.working_hours.map((e) => ({
              days: [Number(e.day)],
              from: e.start_time,
              to: e.end_time,
            })),
          } as AppointmentDoctor)
      ) ?? [],
    [doctorsData]
  );
  const beneficiaries = useMemo<AppointmentBeneficiary[]>(
    () => [
      ...(beneficiariesData?.map(
        (e) =>
          ({
            id: e.id,
            name: e.first_name + " " + e.last_name,
            national_number: e.national_number,
            type: "beneficiary",
          } as AppointmentBeneficiary)
      ) ?? []),
      ...(patientsData?.map(
        (e) =>
          ({
            id: e.id,
            name: e.first_name + " " + e.last_name,
            national_number: e.national_number,
            type: "patient",
          } as AppointmentBeneficiary)
      ) ?? []),
    ],
    [beneficiariesData, patientsData]
  );

  const getAppointmentLoading =
    appointmentsResponse?.message === "wait" ||
    appointmentsHistoryResponse?.message === "wait";
  const getDoctorsLoading = doctorsResponse?.message === "wait";
  const getBeneficiariesLoading =
    beneficiariesResponse?.message === "wait" ||
    patientsResponse?.message === "wait";

  const [createAppointmentLoading, setCreateAppointmentLoading] =
    useState(false);
  const [updateAppointmentLoading, setUpdateAppointmentLoading] =
    useState(false);
  const [deleteAppointmentLoading, setDeleteAppointmentLoading] =
    useState(false);

  const createAppointment = (data: Appointment) => {
    setCreateAppointmentLoading(true);
    return createAppointmentAPI({
      data: {
        owner_id: data.beneficiary_id,
        owner_type:
          data.beneficiary_type === "beneficiary" ? "normal" : "clinic",
        date: data.date,
        doctor_id: data.doctor_id,
        start_time: data.from,
        reason: data.reason,
        discount: data.wantDiscount
          ? {
              amount: "100",
              reason: data.wantDiscount,
            }
          : undefined,
      },
    }).finally(() => setCreateAppointmentLoading(false));
  };
  const updateAppointmentStatus = (
    status: "pending" | "missed" | "finished" | "canceled",
    id: number
  ) => {
    setUpdateAppointmentLoading(true);
    return updateAppointmentAPI({
      data: {
        status:
          status === "finished"
            ? "done"
            : status === "canceled"
            ? "canceled"
            : status === "missed"
            ? "retarded"
            : undefined,
      },
      params: { id },
    }).finally(() => setUpdateAppointmentLoading(false));
  };
  const updateAppointmentResult = (result: string, id: number) => {
    setUpdateAppointmentLoading(true);
    return updateAppointmentAPI({
      data: { result, status: "done" },
      params: { id },
    }).finally(() => setUpdateAppointmentLoading(false));
  };
  const updateAppointmentsHealthInfo = (healthInfo: string, id: number) => {
    setUpdateAppointmentLoading(true);
    // TODO: need to call update bene or patient not appo
    return updateAppointmentAPI({
      data: { medical_history: healthInfo },
      params: { id },
    }).finally(() => setUpdateAppointmentLoading(false));
  };
  const deleteAppointment = (id: number) => {
    setDeleteAppointmentLoading(true);
    return deleteAppointmentAPI({ id }).finally(() =>
      setDeleteAppointmentLoading(false)
    );
  };

  return {
    appointment,
    getAppointmentLoading,
    doctors,
    getDoctorsLoading,
    beneficiaries,
    getBeneficiariesLoading,
    createAppointment,
    updateAppointmentStatus,
    updateAppointmentResult,
    updateAppointmentsHealthInfo,
    deleteAppointment,
    createAppointmentLoading,
    updateAppointmentLoading,
    deleteAppointmentLoading,
  };
}
