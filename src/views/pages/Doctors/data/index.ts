import { useMemo } from "react";
import { Doctor } from "src/types/data/Doctor";

export function useDoctorsData() {
  const doctors = useMemo<Doctor[]>(
    () => [
      {
        id: 6584,
        name: "Dr. Smith Layla",
        attendance_schedules: [
          {
            from: "09:00",
            to: "13:00",
            days: ["mon", "tue", "wed"],
          },
          {
            from: "14:00",
            to: "18:00",
            days: ["tue", "thu"],
          },
          {
            from: "10:00",
            to: "16:00",
            days: ["fri"],
          },
          {
            from: "08:00",
            to: "12:00",
            days: ["sat", "sun"],
          },
          {
            from: "13:00",
            to: "17:00",
            days: ["mon", "tue", "wed", "thu", "fri"],
          },
        ],
        address: "Somewhere far away in the woods",
        birth: "Damascus 1990/01/01",
        mobile: "0932584765",
        price: "7503.14$",
        specification: "Cardiologist",
      },
      {
        id: 3887,
        name: "Dr. Fatima Ali",
        attendance_schedules: [
          {
            from: "09:00",
            to: "13:00",
            days: ["mon", "tue", "wed"],
          },
          {
            from: "14:00",
            to: "18:00",
            days: ["tue", "thu"],
          },
          {
            from: "10:00",
            to: "16:00",
            days: ["fri"],
          },
          {
            from: "08:00",
            to: "12:00",
            days: ["sat", "sun"],
          },
          {
            from: "13:00",
            to: "17:00",
            days: ["mon", "tue", "wed", "thu", "fri"],
          },
        ],
        address: "Somewhere far away in the woods",
        birth: "Damascus 1990/01/01",
        mobile: "0932268444",
        price: "5733.72$",
        specification: "General",
      },
      {
        id: 1383,
        name: "Dr. Fatima Ali",
        attendance_schedules: [
          {
            from: "09:00",
            to: "13:00",
            days: ["mon", "tue", "wed"],
          },
          {
            from: "14:00",
            to: "18:00",
            days: ["tue", "thu"],
          },
          {
            from: "10:00",
            to: "16:00",
            days: ["fri"],
          },
          {
            from: "08:00",
            to: "12:00",
            days: ["sat", "sun"],
          },
          {
            from: "13:00",
            to: "17:00",
            days: ["mon", "tue", "wed", "thu", "fri"],
          },
        ],
        address: "Somewhere far away in the woods",
        birth: "Damascus 1990/01/01",
        mobile: "0987569844",
        price: "5226.60$",
        specification: "Cardiologist",
      },
      {
        id: 4571,
        name: "Dr. Ali Smith",
        attendance_schedules: [
          {
            from: "09:00",
            to: "13:00",
            days: ["mon", "tue", "wed"],
          },
          {
            from: "14:00",
            to: "18:00",
            days: ["tue", "thu"],
          },
          {
            from: "10:00",
            to: "16:00",
            days: ["fri"],
          },
          {
            from: "08:00",
            to: "12:00",
            days: ["sat", "sun"],
          },
          {
            from: "13:00",
            to: "17:00",
            days: ["mon", "tue", "wed", "thu", "fri"],
          },
        ],
        address: "Somewhere far away in the woods",
        birth: "Damascus 1990/01/01",
        mobile: "0932268444",
        price: "2100.54$",
        specification: "Dentist",
      },
      {
        id: 7689,
        name: "Dr. Ali Smith",
        attendance_schedules: [
          {
            from: "09:00",
            to: "13:00",
            days: ["mon", "tue", "wed"],
          },
          {
            from: "14:00",
            to: "18:00",
            days: ["tue", "thu"],
          },
          {
            from: "10:00",
            to: "16:00",
            days: ["fri"],
          },
          {
            from: "08:00",
            to: "12:00",
            days: ["sat", "sun"],
          },
          {
            from: "13:00",
            to: "17:00",
            days: ["mon", "tue", "wed", "thu", "fri"],
          },
        ],
        address: "Somewhere far away in the woods",
        birth: "Damascus 1990/01/01",
        mobile: "0987569844",
        price: "8595.36$",
        specification: "Cardiologist",
      },
      {
        id: 8325,
        name: "Dr. Fatima Ali",
        attendance_schedules: [
          {
            from: "09:00",
            to: "13:00",
            days: ["mon", "tue", "wed"],
          },
          {
            from: "14:00",
            to: "18:00",
            days: ["tue", "thu"],
          },
          {
            from: "10:00",
            to: "16:00",
            days: ["fri"],
          },
          {
            from: "08:00",
            to: "12:00",
            days: ["sat", "sun"],
          },
          {
            from: "13:00",
            to: "17:00",
            days: ["mon", "tue", "wed", "thu", "fri"],
          },
        ],
        address: "Somewhere far away in the woods",
        birth: "Damascus 1990/01/01",
        mobile: "0978415624",
        price: "6979.83$",
        specification: "Pediatrician",
      },
      {
        id: 9589,
        name: "Dr. John Fatima",
        attendance_schedules: [
          {
            from: "09:00",
            to: "13:00",
            days: ["mon", "tue", "wed"],
          },
          {
            from: "14:00",
            to: "18:00",
            days: ["tue", "thu"],
          },
          {
            from: "10:00",
            to: "16:00",
            days: ["fri"],
          },
          {
            from: "08:00",
            to: "12:00",
            days: ["sat", "sun"],
          },
          {
            from: "13:00",
            to: "17:00",
            days: ["mon", "tue", "wed", "thu", "fri"],
          },
        ],
        address: "Somewhere far away in the woods",
        birth: "Damascus 1990/01/01",
        mobile: "0978415624",
        price: "3336.52$",
        specification: "Surgeon",
      },
      {
        id: 2644,
        name: "Dr. Fatima Ali",
        attendance_schedules: [
          {
            from: "09:00",
            to: "13:00",
            days: ["mon", "tue", "wed"],
          },
          {
            from: "14:00",
            to: "18:00",
            days: ["tue", "thu"],
          },
          {
            from: "10:00",
            to: "16:00",
            days: ["fri"],
          },
          {
            from: "08:00",
            to: "12:00",
            days: ["sat", "sun"],
          },
          {
            from: "13:00",
            to: "17:00",
            days: ["mon", "tue", "wed", "thu", "fri"],
          },
        ],
        address: "Somewhere far away in the woods",
        birth: "Damascus 1990/01/01",
        mobile: "0932584765",
        price: "434.40$",
        specification: "General",
      },
      {
        id: 9508,
        name: "Dr. Fatima Ali",
        attendance_schedules: [
          {
            from: "09:00",
            to: "13:00",
            days: ["mon", "tue", "wed"],
          },
          {
            from: "14:00",
            to: "18:00",
            days: ["tue", "thu"],
          },
          {
            from: "10:00",
            to: "16:00",
            days: ["fri"],
          },
          {
            from: "08:00",
            to: "12:00",
            days: ["sat", "sun"],
          },
          {
            from: "13:00",
            to: "17:00",
            days: ["mon", "tue", "wed", "thu", "fri"],
          },
        ],
        address: "Somewhere far away in the woods",
        birth: "Damascus 1990/01/01",
        mobile: "0978415624",
        price: "482.45$",
        specification: "General",
      },
      {
        id: 5970,
        name: "Dr. John Fatima",
        attendance_schedules: [
          {
            from: "09:00",
            to: "13:00",
            days: ["mon", "tue", "wed"],
          },
          {
            from: "14:00",
            to: "18:00",
            days: ["tue", "thu"],
          },
          {
            from: "10:00",
            to: "16:00",
            days: ["fri"],
          },
          {
            from: "08:00",
            to: "12:00",
            days: ["sat", "sun"],
          },
          {
            from: "13:00",
            to: "17:00",
            days: ["mon", "tue", "wed", "thu", "fri"],
          },
        ],
        address: "Somewhere far away in the woods",
        birth: "Damascus 1990/01/01",
        mobile: "0932584765",
        price: "5546.21$",
        specification: "Dentist",
      },
    ],
    []
  );
  return {
    doctors,
    isLoading: false,
    createDoctor: (params: { data: Omit<Doctor, "id"> }) =>
      new Promise(() => {}),
    editDoctor: (params: { data: Omit<Doctor, "id"> }) => new Promise(() => {}),
    deleteDoctor: (params: { id: number }) => new Promise(() => {}),
  };
}
