import { Doctor } from "src/types/data/Doctor";
import { useDoctors } from "../APIs";
import { useRef } from "react";

export function useDoctorsAllData(filters: any) {
  const { getFilteredDoctors } = useDoctors();
  const { data: doctorsResponse } = getFilteredDoctors(filters);

  const doctors: Doctor[] =
    doctorsResponse?.data?.data.map((e) => ({
      id: e.id,
      name: e.name,
      address: e.address,
      birth: e.birth_place + " " + e.birth_date,
      mobile: e.phone,
      price: e.session_price.toString(),
      specification: e.specialization,
      attendance_schedules: [],
    })) ?? ([] as any[]);

  const totalRows = useRef(0);
  if (doctorsResponse?.data?.total !== undefined) {
    totalRows.current = doctorsResponse.data.total;
  }

  const getDoctorsLoading = doctorsResponse?.message === "wait";

  return {
    doctors,
    getDoctorsLoading,
    totalRows: totalRows.current,
  };
}
