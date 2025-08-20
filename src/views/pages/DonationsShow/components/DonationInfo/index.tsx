import { CardContent, Grid2, Stack } from "@mui/material";
import { Control } from "react-hook-form";

import { BButton, BCard, BTypography } from "src/components/Base";
import { FormInput } from "src/components";

import { useBaseTranslation } from "src/hooks";

type Form = {
  id: number;
  from: string;
  amount: number;
  details: string;
};

type Props = {
  control: Control<Form>;
  isAdd: boolean;
  isValid: boolean;
  isDirty: boolean;
  submit: () => void;
};

const i18ns = [
  "number",
  "from",
  "amount",
  "details",
  "edit",
  "save_changes",
  "cancel",
  "save_new_expense",
  "add_new_expense",
  "edit_expense",
];

export function DonationInfo({
  control,
  isAdd,
  isValid,
  isDirty,
  submit,
}: Props) {
  const [
    NumberText,
    FromText,
    AmountText,
    DetailsText,
    EditText,
    SaveChangesText,
    CancelText,
    SaveNewExpenseText,
    AddNewExpenseText,
    EditExpenseText,
  ] = useBaseTranslation(i18ns);

  return (
    <BCard
      sx={{
        m: 1,
        width: "100%",
      }}
      animations={{ transitions: "slideInBottom" }}
    >
      <CardContent>
        <Stack flexDirection={"row"} alignItems={"center"}>
          <BTypography variant="h5" fontWeight={"bold"}>
            {AddNewExpenseText}
          </BTypography>
        </Stack>
      </CardContent>
      <CardContent>
        <Grid2 container spacing={3}>
          {isAdd ? null : (
            <Grid2 size={{ xs: 4 }}>
              <FormInput
                sx={{ my: 1 }}
                control={control}
                label={NumberText}
                name="id"
                rules={{ required: true }}
                disabled
              />
            </Grid2>
          )}
          <Grid2 size={{ xs: 12 }}></Grid2>
          <Grid2 size={{ xs: 4 }}>
            <FormInput
              sx={{ my: 1 }}
              control={control}
              label={FromText}
              name="from"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 4 }}>
            <FormInput
              sx={{ my: 1 }}
              control={control}
              label={AmountText}
              name="amount"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }}></Grid2>
          <Grid2 size={{ xs: 4 }}>
            <FormInput
              sx={{ my: 1 }}
              control={control}
              label={DetailsText}
              name="details"
              rules={{ required: true }}
              multiline
              inputProps={{
                variant: "outlined",
              }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }}></Grid2>
          <Grid2 size={{ xs: "auto" }}>
            {isAdd && (
              <Stack
                flexDirection={{
                  sx: "column",
                  md: "row",
                }}
                justifyContent={{
                  sx: "flex-start",
                  md: isAdd ? "flex-end" : "space-between",
                }}
                alignItems={"stretch"}
              >
                <BButton
                  variant="contained"
                  disabled={isAdd ? !isValid : !isDirty}
                  onClick={submit}
                >
                  {SaveNewExpenseText}
                </BButton>
              </Stack>
            )}
          </Grid2>
        </Grid2>
      </CardContent>
    </BCard>
  );
}
