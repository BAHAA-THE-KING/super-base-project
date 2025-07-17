import { useMemo } from "react";
import { SecretaryType } from "src/types/data/Secretary";

export function useSecretaryData() {
  const secretaries = useMemo<SecretaryType[]>(
    () => [
      {
        id: 9816,
        name: "Dr. Layla John",
        attendance_schedule: {
          from: "13:00",
          to: "17:00",
          days: ["mon", "tue", "wed", "thu", "fri"],
        },
        address: "Somewhere far away in the woods",
        birth: "Damascus 1990/01/01",
        mobile: "0978415624",
        salary: "5603.76$",
      },
      {
        id: 8375,
        name: "Dr. Fatima Ali",
        attendance_schedule: {
          from: "10:00",
          to: "16:00",
          days: ["fri"],
        },
        address: "Somewhere far away in the woods",
        birth: "Damascus 1990/01/01",
        mobile: "0965884756",
        salary: "2926.11$",
      },
      {
        id: 8752,
        name: "Dr. John Fatima",
        attendance_schedule: {
          from: "14:00",
          to: "18:00",
          days: ["tue", "thu"],
        },
        address: "Somewhere far away in the woods",
        birth: "Damascus 1990/01/01",
        mobile: "0965884756",
        salary: "4046.40$",
      },
      {
        id: 3777,
        name: "Dr. John Fatima",
        attendance_schedule: {
          from: "10:00",
          to: "16:00",
          days: ["fri"],
        },
        address: "Somewhere far away in the woods",
        birth: "Damascus 1990/01/01",
        mobile: "0932584765",
        salary: "3531.70$",
      },
      {
        id: 5463,
        name: "Dr. John Fatima",
        attendance_schedule: {
          from: "10:00",
          to: "16:00",
          days: ["fri"],
        },
        address: "Somewhere far away in the woods",
        birth: "Damascus 1990/01/01",
        mobile: "0932584765",
        salary: "5511.97$",
      },
      {
        id: 7148,
        name: "Dr. Layla John",
        attendance_schedule: {
          from: "13:00",
          to: "17:00",
          days: ["mon", "tue", "wed", "thu", "fri"],
        },
        address: "Somewhere far away in the woods",
        birth: "Damascus 1990/01/01",
        mobile: "0978415624",
        salary: "4502.42$",
      },
      {
        id: 5439,
        name: "Dr. Ali Smith",
        attendance_schedule: {
          from: "10:00",
          to: "16:00",
          days: ["fri"],
        },
        address: "Somewhere far away in the woods",
        birth: "Damascus 1990/01/01",
        mobile: "0965884756",
        salary: "6402.94$",
      },
      {
        id: 9339,
        name: "Dr. Smith Layla",
        attendance_schedule: {
          from: "13:00",
          to: "17:00",
          days: ["mon", "tue", "wed", "thu", "fri"],
        },
        address: "Somewhere far away in the woods",
        birth: "Damascus 1990/01/01",
        mobile: "0978415624",
        salary: "6458.46$",
      },
      {
        id: 7991,
        name: "Dr. Ali Smith",
        attendance_schedule: {
          from: "10:00",
          to: "16:00",
          days: ["fri"],
        },
        address: "Somewhere far away in the woods",
        birth: "Damascus 1990/01/01",
        mobile: "0987569844",
        salary: "8730.97$",
      },
      {
        id: 6557,
        name: "Dr. John Fatima",
        attendance_schedule: {
          from: "10:00",
          to: "16:00",
          days: ["fri"],
        },
        address: "Somewhere far away in the woods",
        birth: "Damascus 1990/01/01",
        mobile: "0978415624",
        salary: "4604.93$",
      },
    ],
    []
  );
  return {
    secretaries,
    isLoading: false,
    createSecretary: (params: { data: Omit<SecretaryType, "id"> }) =>
      new Promise(() => {}),
    editSecretary: (params: { data: Omit<SecretaryType, "id"> }) =>
      new Promise(() => {}),
    deleteSecretary: (params: { id: number }) => new Promise(() => {}),
  };
}
