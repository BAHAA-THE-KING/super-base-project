import { Box, Grid2 } from "@mui/material";
import { useForm } from "react-hook-form";

import { Popup, FormInput, FormDate } from "src/components";
import { BButton, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";
import { Patient } from "src/types/data/AppointmentCreate";

type Form = {
  first_name: string;
  last_name: string;
  father_name: string;
  birthDate: string;
  address: string;
  phoneNumber: string;
  national_number: string;
  healthInfo: string;
};

type Props = {
  open: boolean;
  close: () => void;
  createPatient: (data: Patient) => Promise<any>;
  createPatientLoading: boolean;
};

const i18ns = [
  "create_new_patient",
  "first_name",
  "last_name",
  "father_name",
  "national_number",
  "birth_date",
  "address",
  "phone_number",
  "save_new_patient",
  "health_info",
];

export function NewPatientPopup({
  open,
  close,
  createPatient,
  createPatientLoading,
}: Props) {
  const [
    CreateNewPatientText,
    FirstNameText,
    LastNameText,
    FatherNameText,
    NationalNumberText,
    BirthDateText,
    AddressText,
    PhoneNumberText,
    SaveNewPatientText,
    HealthInfoText,
  ] = useBaseTranslation(i18ns);

  const { control, handleSubmit, reset } = useForm<Form>({
    defaultValues: {
      first_name: "",
      last_name: "",
      national_number: "",
      birthDate: "",
      address: "",
      phoneNumber: "",
    },
  });

  const onSubmit = (data: Form) => {
    createPatient(data).then(() => {
      close();
      reset();
    });
  };

  return (
    <Popup open={open} close={close}>
      <BTypography variant="h5">{CreateNewPatientText}</BTypography>
      <Box mt={5}>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <FormInput
              control={control}
              label={FirstNameText}
              name="first_name"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <FormInput
              control={control}
              label={LastNameText}
              name="last_name"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <FormInput
              control={control}
              label={FatherNameText}
              name="father_name"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <FormInput
              control={control}
              label={NationalNumberText}
              name="national_number"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <FormDate
              control={control}
              label={BirthDateText}
              name="birthDate"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <FormInput
              control={control}
              label={AddressText}
              name="address"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <FormInput
              control={control}
              label={PhoneNumberText}
              name="phoneNumber"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={12}>
            <FormInput
              control={control}
              label={HealthInfoText}
              name="healthInfo"
              rules={{ required: true }}
              multiline
              inputProps={{ variant: "outlined" }}
            />
          </Grid2>
          <Grid2 size={12} mt={3}>
            <Box>
              <BButton
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmit)}
                loading={createPatientLoading}
              >
                {SaveNewPatientText}
              </BButton>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </Popup>
  );
}
