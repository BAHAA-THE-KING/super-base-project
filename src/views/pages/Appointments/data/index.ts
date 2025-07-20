import { useMemo } from "react";

import { useData } from "../../BeneficiariesAll/data";

import { AppointmentCreate } from "src/types/data/AppointmentCreate";
import { AppointmentTable } from "src/types/data/AppointmentTable";
import { useDoctorsData } from "../../Doctors/data";

export function useAppointmentsData() {
  const appointments = useMemo<AppointmentTable[]>(
    () => [
      {
        id: 1,
        beneficiary_id: 101,
        beneficiary_name: "John Doe",
        beneficiary_national_number: "1234567890",
        doctor_id: 135,
        doctor_name: "Dr. Smith",
        date: "2025/07/01",
        from: "00:00",
        to: "01:00",
        reason: "Consultation",
        wantDiscount: "Low income, needs financial assistance",
        status: "canceled",
        history: [
          {
            id: 35,
            date: "2025/06/01",
            status: "finished",
            doctor_name: "Dr. Smith",
            result: "Follow-up required",
          },
          {
            id: 87,
            date: "2025/05/01",
            status: "missed",
            doctor_name: "Dr. Smith",
            result: "Patient did not show up",
          },
        ],
      },
      {
        id: 2,
        beneficiary_id: 102,
        beneficiary_name: "Jane Smith",
        beneficiary_national_number: "2345678901",
        doctor_id: 684,
        doctor_name: "Dr. Brown",
        date: "2025/07/02",
        from: "01:00",
        to: "02:00",
        status: "finished",
        history: [
          {
            id: 28,
            date: "2025/06/15",
            status: "finished",
            doctor_name: "Dr. Brown",
            result: "Routine check",
          },
          {
            id: 78,
            date: "2025/05/01",
            status: "missed",
            doctor_name: "Dr. Smith",
            result: "Give the patient some citamol",
          },
        ],
      },
      {
        id: 3,
        beneficiary_id: 103,
        beneficiary_name: "Alice Johnson",
        beneficiary_national_number: "3456789012",
        doctor_id: 89,
        doctor_name: "Dr. Lee",
        date: "2025/07/20",
        from: "02:00",
        to: "03:00",
        reason: "Routine check",
        status: "pending",
        history: [
          {
            id: 39,
            date: "2025/06/20",
            status: "canceled",
            doctor_name: "Dr. Lee",
            result: "Patient canceled",
          },
        ],
      },
      {
        id: 4,
        beneficiary_id: 104,
        beneficiary_name: "Bob Williams",
        beneficiary_national_number: "4567890123",
        doctor_id: 357,
        doctor_name: "Dr. Patel",
        date: "2025/07/18",
        from: "01:00",
        to: "02:00",
        wantDiscount: "Student, cannot afford full price",
        status: "pending",
        history: [
          {
            id: 543,
            date: "2025/06/18",
            status: "finished",
            doctor_name: "Dr. Patel",
            result: "First visit",
          },
        ],
      },
      {
        id: 5,
        beneficiary_id: 105,
        beneficiary_name: "Carol Martinez",
        beneficiary_national_number: "5678901234",
        doctor_id: 98,
        doctor_name: "Dr. Kim",
        date: "2025/07/01",
        from: "04:00",
        to: "05:00",
        status: "finished",
        history: [
          {
            id: 56,
            date: "2025/06/01",
            status: "missed",
            doctor_name: "Dr. Kim",
            result: "No show",
          },
        ],
      },
      {
        id: 6,
        beneficiary_id: 106,
        beneficiary_name: "David Anderson",
        beneficiary_national_number: "6789012345",
        doctor_id: 135,
        doctor_name: "Dr. Chen",
        date: "2025/07/18",
        from: "05:00",
        to: "06:00",
        status: "missed",
        history: [
          {
            id: 78,
            date: "2025/06/18",
            status: "finished",
            doctor_name: "Dr. Chen",
            result: "Prescribed medication",
          },
        ],
      },
      {
        id: 7,
        beneficiary_id: 107,
        beneficiary_name: "Eve Thomas",
        beneficiary_national_number: "7890123456",
        doctor_id: 135,
        doctor_name: "Dr. Wilson",
        date: "2025/07/18",
        from: "06:00",
        to: "07:00",
        status: "pending",
        history: [
          {
            id: 91,
            date: "2025/06/18",
            status: "finished",
            doctor_name: "Dr. Wilson",
            result: "Routine check",
          },
        ],
      },
      {
        id: 8,
        beneficiary_id: 108,
        beneficiary_name: "Frank Garcia",
        beneficiary_national_number: "8901234567",
        doctor_id: 135,
        doctor_name: "Dr. Clark",
        date: "2025/07/19",
        from: "02:00",
        to: "03:00",
        status: "canceled",
        history: [
          {
            id: 136,
            date: "2025/06/19",
            status: "pending",
            doctor_name: "Dr. Clark",
            result: "Awaiting confirmation",
          },
        ],
      },
      {
        id: 9,
        beneficiary_id: 109,
        beneficiary_name: "Grace Lee",
        beneficiary_national_number: "9012345678",
        doctor_id: 135,
        doctor_name: "Dr. Lewis",
        date: "2025/07/01",
        from: "08:00",
        to: "09:00",
        wantDiscount: "Unemployed, requests discount",
        status: "pending",
        history: [
          {
            id: 86,
            date: "2025/06/01",
            status: "finished",
            doctor_name: "Dr. Lewis",
            result: "Follow-up scheduled",
          },
        ],
      },
      {
        id: 10,
        beneficiary_id: 110,
        beneficiary_name: "Henry Walker",
        beneficiary_national_number: "0123456789",
        doctor_id: 135,
        doctor_name: "Dr. Young",
        date: "2025/07/01",
        from: "09:00",
        to: "10:00",
        reason: "Routine check",
        status: "finished",
        history: [
          {
            id: 12,
            date: "2025/06/01",
            status: "finished",
            doctor_name: "Dr. Young",
            result: "All clear",
          },
        ],
      },
    ],
    []
  );
  const beneficiaries = useData().map((e) => ({
    id: e.id,
    name: e.first_name + " " + e.last_name,
    national_number: e.national_number,
  }));
  const doctors = useDoctorsData().doctors.map((e) => ({
    id: e.id,
    name: e.name,
    attendance_schedules: e.attendance_schedules,
  }));

  return {
    appointments,
    beneficiaries,
    doctors,
    isLoading: false,
    createAppointment: (params: { data: Omit<AppointmentCreate, "id"> }) =>
      new Promise(() => {}),
    editAppointment: (params: {
      data: { id: number; status: Pick<AppointmentTable, "status"> };
    }) => new Promise(() => {}),
    editHealthInfo: (params: { data: { id: number; healthInfo: string } }) =>
      new Promise(() => {}),
    addAppointmentResult: (params: {
      data: { id: number; appointmentResult: string };
    }) => new Promise(() => {}),
  };
}
