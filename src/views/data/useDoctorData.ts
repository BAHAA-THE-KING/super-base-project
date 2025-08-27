import { useCallback, useState } from "react";

import { useDoctors } from "../APIs";

import { jsonToFormdata } from "src/utils";

import { Doctor } from "src/types/data/Doctor";
import { useBaseTranslation } from "src/hooks";

const i18ns = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
export function useDoctorData(id: number) {
  const [
    SundayText,
    MondayText,
    TuesdayText,
    WednesdayText,
    ThursdayText,
    FridayText,
    SaturdayText,
  ] = useBaseTranslation(i18ns);
  const getDayByNumber = useCallback((day: number): string => {
    const days = [
      SundayText,
      MondayText,
      TuesdayText,
      WednesdayText,
      ThursdayText,
      FridayText,
      SaturdayText,
    ];
    return days[day];
  }, []);

  const {
    createDoctor: createDoctorAPI,
    updateDoctor: updateDoctorAPI,
    getDoctor,
    deleteDoctor: deleteDoctorAPI,
  } = useDoctors();
  const { data: doctorsResponse } = getDoctor(id);

  const doctorData = doctorsResponse?.data;

  const doctor: Doctor | null = doctorData
    ? {
        id: doctorData.id,
        name: doctorData.name,
        address: doctorData.address,
        birth_date: doctorData.birth_date,
        birth_place: doctorData.birth_place,
        mobile: doctorData.phone,
        price: doctorData.session_price.toString(),
        specification: doctorData.specialization,
        attendance_schedules: doctorData.working_hours.map((e) => ({
          days: [{ id: Number(e.day), name: getDayByNumber(Number(e.day)) }],
          from: e.start_time,
          to: e.end_time,
        })),
      }
    : null;
    console.log(doctor);
    

  const getDoctorLoading = doctorsResponse?.message === "wait";
  const [createDoctorLoading, setCreateDoctorLoading] = useState(false);
  const [updateDoctorLoading, setUpdateDoctorLoading] = useState(false);
  const [deleteDoctorLoading, setDeleteDoctorLoading] = useState(false);

  const createDoctor = (data: Doctor) => {
    setCreateDoctorLoading(true);
    return createDoctorAPI({
      data: jsonToFormdata({
        name: data.name,
        address: data.address,
        birth_date: data.birth_date,
        birth_place: data.birth_place,
        phone: data.mobile,
        session_price: Number(data.price),
        specialization: data.specification,
        working_hours: data.attendance_schedules
          .map((e) =>
            e.days.map((d) => ({
              day: d.id.toString(),
              start_time: e.from,
              end_time: e.to,
            }))
          )
          .flat(),
      }),
    }).finally(() => setCreateDoctorLoading(false));
  };
  const updateDoctor = (data: Doctor, id: number) => {
    setUpdateDoctorLoading(true);
    return updateDoctorAPI({
      data: jsonToFormdata({
        name: data.name,
        address: data.address,
        birth_date: data.birth_date,
        birth_place: data.birth_place,
        phone: data.mobile,
        session_price: Number(data.price),
        specialization: data.specification,
        working_hours: data.attendance_schedules
          .map((e) =>
            e.days.map((d) => ({
              day: d.id.toString(),
              start_time: e.from,
              end_time: e.to,
            }))
          )
          .flat(),
      }),
      params: { id },
    }).finally(() => setUpdateDoctorLoading(false));
  };
  const deleteDoctor = (id: number) => {
    setDeleteDoctorLoading(true);
    return deleteDoctorAPI({ id }).finally(() => setDeleteDoctorLoading(false));
  };

  return {
    doctor,
    getDoctorLoading,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    createDoctorLoading,
    updateDoctorLoading,
    deleteDoctorLoading,
  };
}
