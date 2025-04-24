import { Grid2 } from "@mui/material";
import { useForm } from "react-hook-form";

import { BTypography } from "src/components/Base";
import { FormInput, FormSelect, RequestStatusChip } from "src/components";

import { useBaseTranslation } from "src/hooks";

import { SingleBeneficiary } from "src/types/data/SingleBeneficiary";

type Props = {
  beneficiary: SingleBeneficiary;
};

const i18ns = [
  "identity_info",
  "first_name",
  "last_name",
  "father_name",
  "mother_name",
  "birth_date",
  "birth_place",
  "national_number",
  "residence_info",
  "residence_type",
  "address",
  "residence_document",
  "additional_info",
  "job",
  "gender",
  "male",
  "female",
  "health_status",
  "phone_number",
  "mobile_number",
  "monthly_income",
  "membership_request",
  "case_description",
  "request_status",
  "rent",
  "own",
  "host",
  "borrow",
];
export function PersonalInfo({ beneficiary }: Props) {
  const [
    IdentityInfoText,
    FirstNameText,
    LastNameText,
    FatherNameText,
    MotherNameText,
    BirthDateText,
    BirthPlaceText,
    NationalNumberText,
    ResidenceInfoText,
    ResidenceTypeText,
    AddressText,
    ResidenceDocumentText,
    AdditionalInfoText,
    JobText,
    GenderText,
    MaleText,
    FemaleText,
    HealthStatusText,
    PhoneNumberText,
    MobileNumberText,
    MonthlyIncomeText,
    MembershipRequestText,
    CaseDescriptionText,
    RequestStatusText,
    RentText,
    OwnText,
    HostText,
    BorrowText,
  ] = useBaseTranslation(i18ns);

  const { control } = useForm<SingleBeneficiary>({
    defaultValues: beneficiary,
  });

  return (
    <Grid2
      container
      spacing={3}
      sx={(theme) => ({
        "&>.MuiGrid2-root:nth-child(even)": {
          borderBlockEnd: {
            xs: `1px solid ${theme.palette.divider}`,
            md: "none",
          },
          borderInlineEnd: {
            xs: "none",
            md: `1px solid ${theme.palette.divider}`,
          },
          "&:last-child": {
            borderInlineEnd: "none",
            borderBlockEnd: "none",
          },
        },
      })}
    >
      <Grid2 size={{ xs: 12, md: 3.7 }}>
        <BTypography variant="h6" fontWeight={"bold"} mb={3}>
          {IdentityInfoText}
        </BTypography>
        <FormInput
          sx={{ my: 1 }}
          control={control}
          label={FirstNameText}
          name="first_name"
          rules={{ required: true }}
        />
        <FormInput
          sx={{ my: 1 }}
          control={control}
          label={LastNameText}
          name="last_name"
          rules={{ required: true }}
        />
        <FormInput
          sx={{ my: 1 }}
          control={control}
          label={FatherNameText}
          name="father_name"
          rules={{ required: true }}
        />
        <FormInput
          sx={{ my: 1 }}
          control={control}
          label={MotherNameText}
          name="mother_name"
          rules={{ required: true }}
        />
        <FormSelect
          sx={{ my: 1 }}
          control={control}
          label={GenderText}
          name="gender"
          rules={{ required: true }}
          options={[
            { id: "male", name: MaleText },
            { id: "female", name: FemaleText },
          ]}
        />
        <FormInput
          sx={{ my: 1 }}
          control={control}
          label={BirthDateText}
          name="birth_date"
          rules={{ required: true }}
        />
        <FormInput
          sx={{ my: 1 }}
          control={control}
          label={BirthPlaceText}
          name="birth_place"
          rules={{ required: true }}
        />
        <FormInput
          sx={{ my: 1 }}
          control={control}
          label={NationalNumberText}
          name="national_number"
          rules={{ required: true }}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 0.1 }}></Grid2>
      <Grid2 size={{ xs: 12, md: 3.7 }}>
        <BTypography variant="h6" fontWeight={"bold"} mb={3}>
          {ResidenceInfoText}
        </BTypography>
        <FormSelect
          sx={{ my: 1 }}
          control={control}
          label={ResidenceTypeText}
          name="residence_type"
          rules={{ required: true }}
          options={[
            { id: "rent", name: RentText },
            { id: "own", name: OwnText },
            { id: "host", name: HostText },
            { id: "borrow", name: BorrowText },
          ]}
        />
        <FormInput
          sx={{ my: 1 }}
          control={control}
          label={AddressText}
          name="address"
          rules={{ required: true }}
        />
        <FormInput
          sx={{ my: 1 }}
          control={control}
          label={ResidenceDocumentText}
          name="residence_document_id"
          rules={{ required: true }}
        />
        <BTypography variant="h6" fontWeight={"bold"} mt={3}>
          {AdditionalInfoText}
        </BTypography>
        <FormInput
          sx={{ my: 1 }}
          control={control}
          label={JobText}
          name="job"
          rules={{ required: true }}
        />
        <FormInput
          sx={{ my: 1 }}
          control={control}
          label={HealthStatusText}
          name="health_status"
          rules={{ required: true }}
        />
        <FormInput
          sx={{ my: 1 }}
          control={control}
          label={PhoneNumberText}
          name="phone_number"
          rules={{ required: true }}
        />
        <FormInput
          sx={{ my: 1 }}
          control={control}
          label={MobileNumberText}
          name="mobile_number"
          rules={{ required: true }}
        />
        <FormInput
          sx={{ my: 1 }}
          control={control}
          label={MonthlyIncomeText}
          name="monthly_income"
          rules={{ required: true }}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 0.1 }}></Grid2>
      <Grid2 size={{ xs: 12, md: 3.7 }}>
        <BTypography variant="h6" fontWeight={"bold"} mb={3}>
          {MembershipRequestText}
        </BTypography>
        <FormInput
          sx={{ my: 1 }}
          control={control}
          label={CaseDescriptionText}
          name="case_description"
          rules={{ required: true }}
          multiline
          inputProps={{
            variant: "outlined",
          }}
        />
        <BTypography my={2}>
          {RequestStatusText}:{" "}
          <RequestStatusChip status={beneficiary.request_status} />
        </BTypography>
      </Grid2>
    </Grid2>
  );
}
