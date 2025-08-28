import { useState } from "react";

import { useClinicBalance } from "../APIs";

import { ClinicBalanceRecord } from "src/types/data/ClinicBalanceRecord";
import { useBaseTranslation } from "src/hooks";

const i18ns = ["appointment_price", "secretary", "doctor"];
export function useClinicBalanceData(params: any) {
  const [AppointmentPriceText, SecretaryText, DoctorText] =
    useBaseTranslation(i18ns);
  const { getBalanceAPI, updateBalanceRecordsAPI } = useClinicBalance();

  const { data: balanceResponse } = getBalanceAPI(params);
  const balance: ClinicBalanceRecord[] =
    balanceResponse?.data?.map((e) => ({
      id: e.id,
      date: e.date.split("T")[0],
      amount: e.amount,
      status: e.status === "approved" ? "accepted" : e.status,
      reason: e.reason,
      person:
        (e.owner_type === "App\\Models\\Appointment"
          ? AppointmentPriceText
          : e.owner_type === "App\\Models\\Secretary"
          ? SecretaryText
          : e.owner_type === "App\\Models\\Doctor"
          ? DoctorText
          : "") +
        " " +
        (e.owner_type === "App\\Models\\Appointment"
          ? e.beneficiary.first_name + " " + e.beneficiary.last_name
          : e.owner_type === "App\\Models\\Secretary"
          ? e.owner.name
          : e.owner_type === "App\\Models\\Doctor"
          ? e.owner.name
          : ""),
    })) ?? [];
  const getBalanceLoading = balanceResponse?.message === "wait";

  const [acceptPaymentLoading, setAcceptPaymentLoading] = useState(false);
  const acceptPayment = (ids: number[]) => {
    setAcceptPaymentLoading(true);
    return updateBalanceRecordsAPI({ data: { payments: ids } }).finally(() =>
      setAcceptPaymentLoading(false)
    );
  };

  return {
    balance,
    getBalanceLoading,
    acceptPayment,
    acceptPaymentLoading,
  };
}
