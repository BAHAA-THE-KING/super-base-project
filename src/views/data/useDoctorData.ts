import { Doctor } from "src/types/data/Doctor";
import { useDoctors } from "../APIs";
import { useState } from "react";

export function useDoctorData(id: number) {
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
        birth: doctorData.birth_place + " " + doctorData.birth_date,
        mobile: doctorData.phone,
        price: doctorData.session_price.toString(),
        specification: doctorData.specialization,
        attendance_schedules: doctorData.working_hours.map((e) => ({
          days: [e.day],
          from: e.start_time,
          to: e.end_time,
        })),
      }
    : null;

  const getDoctorLoading = doctorsResponse?.message === "wait";
  const [createDoctorLoading, setCreateDoctorLoading] = useState(false);
  const [updateDoctorLoading, setUpdateDoctorLoading] = useState(false);
  const [deleteDoctorLoading, setDeleteDoctorLoading] = useState(false);

  const createDoctor = (data: Doctor) => {
    setCreateDoctorLoading(true);
    return createDoctorAPI({
      data: {
        name: data.name,
        address: data.address,
        birth_date: data.birth,
        birth_place: data.birth,
        phone: data.mobile,
        session_price: Number(data.price),
        specialization: data.specification,
        working_hours: data.attendance_schedules
          .map((e) =>
            e.days.map((d) => ({
              day: d,
              start_time: e.from,
              end_time: e.to,
            }))
          )
          .flat(),
      },
    }).finally(() => setCreateDoctorLoading(false));
  };
  const updateDoctor = (data: Doctor, id: number) => {
    setUpdateDoctorLoading(true);
    return updateDoctorAPI({
      data: {
        name: data.name,
        address: data.address,
        birth_date: data.birth,
        birth_place: data.birth,
        phone: data.mobile,
        session_price: Number(data.price),
        specialization: data.specification,
        working_hours: data.attendance_schedules
          .map((e) =>
            e.days.map((d) => ({
              day: d,
              start_time: e.from,
              end_time: e.to,
            }))
          )
          .flat(),
      },
      params: { id },
    }).finally(() => setUpdateDoctorLoading(false));
  };
  const deleteDoctor = (id: number) => {
    setDeleteDoctorLoading(true);
    return deleteDoctorAPI(id).finally(() => setDeleteDoctorLoading(false));
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
