import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import { DonationInfo } from "./components";

import { useDonationShowData } from "./data";

import { varAlpha } from "src/themes/styles";

type Form = {
  id: number;
  from: string;
  amount: number;
  details: string;
};

export function DonationsShow({ isAdd = false }: { isAdd?: boolean }) {
  const navigate = useNavigate();
  const { donationId: donationIdParam } = useParams();
  const donationId = Number(donationIdParam);
  if ((!donationId || donationId <= 0) && !isAdd) {
    navigate("/accountant/donations");
    return <></>;
  }

  const {
    donation,
    getDonationLoading,
    createDonation,
    createDonationLoading,
    editDonation,
    editDonationLoading,
  } = useDonationShowData(donationId);

  const {
    reset,
    handleSubmit,
    control,
    formState: { isDirty, isValid },
  } = useForm<Form>({
    defaultValues: {
      from: "",
      id: 0,
      amount: 0,
      details: "",
    },
  });

  useEffect(() => {
    if (donation) reset(donation);
  }, [donation]);

  const submit = handleSubmit((data) => {
    createDonation({ data }).then(() => navigate("/accountant/donations"));
  });

  return (
    <Stack
      width={"100%"}
      height={"100%"}
      borderRadius={1}
      flexDirection={{
        sx: "column",
        md: "row",
      }}
      justifyContent={"flex-start"}
      p={3}
      sx={(theme) => ({
        backgroundColor:
          theme.palette.mode === "dark"
            ? varAlpha(theme.palette.primary.darkerChannel, 0.2)
            : theme.palette.primary.lighter,
      })}
    >
      <DonationInfo
        control={control}
        isAdd={isAdd}
        isValid={isValid}
        isDirty={isDirty}
        submit={submit}
      />
    </Stack>
  );
}
