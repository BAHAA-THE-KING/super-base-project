import { Box, Grid2 } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { FormDate, FormInput, FormSelect, Popup } from "src/components";
import { BButton, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

type Props = {
  open: boolean;
  close: () => void;
  onAdd: (data: {
    date: string;
    amount: number;
    reason: string;
    person: string;
  }) => void;
};

const i18ns = [
  "add_new_record",
  "date",
  "amount",
  "reason",
  "person",
  "save_new_record",
  "salary",
  "appointment_payment",
];
export function AddRecordPopup({ open, close, onAdd }: Props) {
  const [
    AddNewRecordText,
    DateText,
    AmountText,
    ReasonText,
    PersonText,
    SaveNewRecordText,
    SalaryText,
    AppointmentPaymentText,
  ] = useBaseTranslation(i18ns);

  const { control, reset, handleSubmit } = useForm<{
    date: string;
    amount: number;
    reason: string;
    person: string;
  }>({
    defaultValues: {
      date: new Date().toLocaleDateString("fr-Ca"),
      amount: 0,
      reason: "",
      person: "",
    },
  });

  useEffect(() => {
    reset({
      date: new Date().toLocaleDateString("fr-Ca"),
      amount: 0,
      reason: "",
      person: "",
    });
  }, [open]);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    onAdd(data);
  });

  return (
    <Popup open={open} close={close}>
      <BTypography variant="h5">{AddNewRecordText}</BTypography>
      <Box mt={5}>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <FormDate
              control={control}
              label={DateText}
              name="date"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <FormInput
              control={control}
              label={AmountText}
              name="amount"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <FormSelect
              options={[
                {
                  id: "salary",
                  name: SalaryText,
                },
                {
                  id: "appointment-payment",
                  name: AppointmentPaymentText,
                },
              ]}
              control={control}
              label={ReasonText}
              name="reason"
              rules={{ required: true }}
              canType
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <FormInput
              control={control}
              label={PersonText}
              name="person"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={12} mt={3}>
            <Box>
              <BButton variant="contained" color="primary" onClick={onSubmit}>
                {SaveNewRecordText}
              </BButton>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </Popup>
  );
}
