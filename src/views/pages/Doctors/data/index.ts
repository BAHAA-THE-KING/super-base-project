import { useMemo } from "react";
import { Doctor } from "src/types/data/Doctor";

function generateRandomDoctor(): Doctor {
  const names = [
    "Dr. Smith Layla",
    "Dr. Ali Smith",
    "Dr. Fatima Ali",
    "Dr. John Fatima",
    "Dr. Layla John",
  ];
  const specifications = [
    "Cardiologist",
    "Pediatrician",
    "Dentist",
    "Surgeon",
    "General",
  ];
  const schedules = [
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
  ];
  const mobiles = [
    "0987569844",
    "0932584765",
    "0978415624",
    "0965884756",
    "0932268444",
  ];
  const random = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
  return {
    id: Math.floor(Math.random() * 10000),
    name: random(names),
    attendance_schedules: schedules,
    address: "Somewhere far away in the woods",
    birth: "Damascus 1990/01/01",
    mobile: random(mobiles),
    price: (Math.random() * 10000).toFixed(2) + "$",
    specification: random(specifications),
  };
}

export function useDoctorsData() {
  const doctors = useMemo<Doctor[]>(
    () => Array.from({ length: 10 }, generateRandomDoctor),
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
