import { useRef } from "react";

import { AppointmentTable } from "src/types/data/AppointmentTable";
import { useAppointments } from "../APIs";

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

export function useAppointmentsAllData(filters: any) {
  const { getFilteredAppointments } = useAppointments();
  const { data: appointmentsResponse } = getFilteredAppointments(filters);

  const appointments: AppointmentTable[] =
    appointmentsResponse?.data?.data.map(
      (e) =>
        ({
          id: e.id,
          beneficiary_id: e.owner_id,
          beneficiary_name: e.owner.first_name + " " + e.owner.last_name,
          beneficiary_national_number: "e.owner.national_number", //TODO: Fix it
          date: e.date,
          doctor_id: e.doctor.id,
          doctor_name: e.doctor.name,
          from: e.start_time,
          status: e.status,
          to: add30m(e.start_time),
          healthInfo: e.owner.medical_history,
          history: [],
          price: e.price.toString(),
          result: e.result,
          wantDiscount: e?.discount?.reason,
          reason: e?.discount?.reason,
        } as AppointmentTable)
    ) ?? ([] as any[]);

  const totalRows = useRef(0);
  if (appointmentsResponse?.data?.total !== undefined) {
    totalRows.current = appointmentsResponse.data.total;
  }

  const getAppointmentsLoading = appointmentsResponse?.message === "wait";

  return {
    appointments,
    getAppointmentsLoading,
    totalRows: totalRows.current,
  };
}
