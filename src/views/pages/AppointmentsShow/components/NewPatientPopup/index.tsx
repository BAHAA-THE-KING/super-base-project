import { Box, Grid2 } from "@mui/material";
import { useForm } from "react-hook-form";

import { Popup, FormInput, FormSelect } from "src/components";
import { BButton, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

type Form = {
  name: string;
  birthPlace: string;
  birthDate: string;
  address: string;
  phoneNumber: string;
  maritalStatus: string;
};

type Props = {
  open: boolean;
  close: () => void;
  setPatientId: (id: number) => void;
};

const i18ns = [
  "create_new_patient",
  "name",
  "birth_place",
  "birth_date",
  "address",
  "phone_number",
  "marital_status",
  "save_new_patient",
];

const maritalStatusOptions = [
  { id: "single", name: "Single" },
  { id: "married", name: "Married" },
  { id: "divorced", name: "Divorced" },
  { id: "widowed", name: "Widowed" },
];

export function NewPatientPopup({ open, close, setPatientId }: Props) {
  const [
    CreateNewPatientText,
    NameText,
    BirthPlaceText,
    BirthDateText,
    AddressText,
    PhoneNumberText,
    MaritalStatusText,
    SaveNewPatientText,
  ] = useBaseTranslation(i18ns);

  const { control, handleSubmit, reset } = useForm<Form>({
    defaultValues: {
      name: "",
      birthPlace: "",
      birthDate: "",
      address: "",
      phoneNumber: "",
      maritalStatus: "",
    },
  });

  const onSubmit = (data: Form) => {
    // TODO: Replace with actual submit logic
    // setPatientId
    console.log("New patient data:", data);
    close();
    reset();
  };

  return (
    <Popup open={open} close={close}>
      <BTypography variant="h5">{CreateNewPatientText}</BTypography>
      <Box mt={5}>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <FormInput
              control={control}
              label={NameText}
              name="name"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <FormInput
              control={control}
              label={BirthPlaceText}
              name="birthPlace"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <FormInput
              control={control}
              label={BirthDateText}
              name="birthDate"
              rules={{ required: true }}
              inputProps={{ type: "date" }}
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
          <Grid2 size={{ xs: 12, md: 6 }}>
            <FormSelect
              control={control}
              label={MaritalStatusText}
              name="maritalStatus"
              rules={{ required: true }}
              options={maritalStatusOptions}
              sx={{ mb: 3 }}
            />
          </Grid2>
          <Grid2 size={12} mt={3}>
            <Box>
              <BButton
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmit)}
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
