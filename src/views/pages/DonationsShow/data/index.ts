import { useMemo } from "react";

export function useDonationShowData(donationId: number) {
  const donation = useMemo(
    () => ({
      id: donationId,
      from: "Oakwood Community Center",
      amount: 1500,
      details: "Proceeds from a bake sale event.",
    }),
    []
  );

  const getDonationLoading = false;

  const createDonationLoading = false;
  const editDonationLoading = false;
  const createDonation = async (data: any) => {};
  const editDonation = async (data: any) => {};

  return {
    donation,
    getDonationLoading,
    createDonation,
    createDonationLoading,
    editDonation,
    editDonationLoading,
  };
}
