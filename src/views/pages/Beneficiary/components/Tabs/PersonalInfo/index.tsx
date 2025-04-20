import { Grid2 } from "@mui/material";

import { BTypography } from "src/components/Base";
import { RequestStatusChip } from "src/components";

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
  return (
    <Grid2
      container
      spacing={3}
      sx={(theme) => ({
        "&>.MuiGrid2-root": {
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
      <Grid2 size={{ xs: 12, md: 4 }}>
        <BTypography variant="h6" fontWeight={"bold"} mb={3}>
          {IdentityInfoText}
        </BTypography>
        <BTypography my={2}>
          {FirstNameText}: {beneficiary.first_name}
        </BTypography>
        <BTypography my={2}>
          {LastNameText}: {beneficiary.last_name}
        </BTypography>
        <BTypography my={2}>
          {FatherNameText}: {beneficiary.father_name}
        </BTypography>
        <BTypography my={2}>
          {MotherNameText}: {beneficiary.mother_name}
        </BTypography>
        <BTypography my={2}>
          {GenderText}:{" "}
          {beneficiary.gender === "male"
            ? MaleText
            : beneficiary.gender === "female"
            ? FemaleText
            : ""}
        </BTypography>
        <BTypography my={2}>
          {BirthDateText}: {beneficiary.birth_date}
        </BTypography>
        <BTypography my={2}>
          {BirthPlaceText}: {beneficiary.birth_place}
        </BTypography>
        <BTypography my={2}>
          {NationalNumberText}: {beneficiary.national_number}
        </BTypography>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 4 }}>
        <BTypography variant="h6" fontWeight={"bold"} mb={3}>
          {ResidenceInfoText}
        </BTypography>
        <BTypography my={2}>
          {ResidenceTypeText}:{" "}
          {beneficiary.residence_type === "rent"
            ? RentText
            : beneficiary.residence_type === "own"
            ? OwnText
            : beneficiary.residence_type === "host"
            ? HostText
            : beneficiary.residence_type === "borrow"
            ? BorrowText
            : ""}
        </BTypography>
        <BTypography my={2}>
          {AddressText}: {beneficiary.address}
        </BTypography>
        <BTypography my={2}>
          {ResidenceDocumentText}: {beneficiary.residence_document_id}
        </BTypography>
        <BTypography variant="h6" fontWeight={"bold"} mt={3}>
          {AdditionalInfoText}
        </BTypography>
        <BTypography my={2}>
          {JobText}: {beneficiary.job}
        </BTypography>
        <BTypography my={2}>
          {HealthStatusText}: {beneficiary.health_status}
        </BTypography>
        <BTypography my={2}>
          {PhoneNumberText}: {beneficiary.phone_number}
        </BTypography>
        <BTypography my={2}>
          {MobileNumberText}: {beneficiary.mobile_number}
        </BTypography>
        <BTypography my={2}>
          {MonthlyIncomeText}: {beneficiary.monthly_income}
        </BTypography>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 4 }}>
        <BTypography variant="h6" fontWeight={"bold"} mb={3}>
          {MembershipRequestText}
        </BTypography>
        <BTypography mt={2}>{CaseDescriptionText}:</BTypography>
        <BTypography mb={2}>{beneficiary.case_description}</BTypography>
        <BTypography my={2}>
          {RequestStatusText}:{" "}
          <RequestStatusChip status={beneficiary.request_status} />
        </BTypography>
      </Grid2>
    </Grid2>
  );
}
