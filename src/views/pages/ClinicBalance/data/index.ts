import { useMemo } from "react";

import { ClinicBalanceRecord } from "src/types/data/ClinicBalanceRecord";

export function useBalanceData() {
  const records = useMemo<ClinicBalanceRecord[]>(
    () => [
      {
        id: 1,
        date: "2024-06-01",
        amount: 150.0,
        reason: "Consultation Fee",
        person: "Dr. John Doe",
      },
      {
        id: 2,
        date: "2024-06-02",
        amount: 200.0,
        reason: "Lab Test",
        person: "Dr. Jane Smith",
      },
      {
        id: 3,
        date: "2024-06-03",
        amount: 100.0,
        reason: "Medication",
        person: "Nurse Alex Brown",
      },
      {
        id: 4,
        date: "2024-06-04",
        amount: -250.0,
        reason: "Surgery",
        person: "Dr. Emily White",
      },
      {
        id: 5,
        date: "2024-06-05",
        amount: 80.0,
        reason: "Follow-up",
        person: "Dr. John Doe",
      },
    ],
    []
  );
  function createRecord(data: Omit<ClinicBalanceRecord, "id">) {}
  const addRecord = (data: Omit<ClinicBalanceRecord, "id">) =>
    createRecord(data);

  return {
    records,
    addRecord,
    isLoading: false,
  };
}
