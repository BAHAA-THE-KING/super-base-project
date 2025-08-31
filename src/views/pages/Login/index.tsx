import { Box, Grid2, Stack, SvgIcon } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { FaDoorOpen } from "react-icons/fa";

import { FormInput } from "src/components";
import { BButton, BCard, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";
import { useLoginData } from "src/views/data";

type Form = {
  username: string;
  password: string;
};

const i18ns = [
  "user_name",
  "password",
  "welcome_back",
  "login",
  "sign_in_please",
  // "you_can_manage_your",
  // "services",
  // "and_control_many_things_like",
  // "and_more",
  // "the_beneficiaries",
  // "help_requests",
  // "distribution_plans",
  // "beneficiary_categories",
  // "clinic",
  // "doctors",
  // "secretaries",
  // "appointments",
  // "clinic_balance",
  // "storages",
  // "items",
  // "education",
  // "students",
  // "teachers",
  // "supervisors",
  // "accountant",
  // "donations",
  // "books",
  // "employees",
  // "meets",
];
export function Login() {
  const [
    UserNameText,
    PasswordText,
    WelcomeBackText,
    LoginText,
    SignInPleaseText,
    // YouCanManageYourText,
    // ServicesText,
    // AndControlManyThingsLikeText,
    // AndMoreText,
    // BeneficiariesText,
    // HelpRequestsText,
    // DistributionPlansText,
    // BeneficiaryCategoriesText,
    // ClinicText,
    // DoctorsText,
    // SecretariesText,
    // AppointmentsText,
    // ClinicBalanceText,
    // StoragesText,
    // ItemsText,
    // EducationText,
    // StudentsText,
    // TeachersText,
    // SupervisorsText,
    // AccountantText,
    // DonationsText,
    // BooksText,
    // EmployeesText,
    // MeetsText,
  ] = useBaseTranslation(i18ns);

  const navigate = useNavigate();

  const { login, loginLoading } = useLoginData();

  const {
    control,
    //  reset,
    handleSubmit,
  } = useForm<Form>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // const sections: {
  //   section: string;
  //   color: "primary" | "secondary" | "info" | "success" | "warning" | "error";
  //   sectors: string[];
  // }[] = [
  //   {
  //     section: ServicesText,
  //     color: "primary",
  //     sectors: [
  //       BeneficiariesText,
  //       HelpRequestsText,
  //       DistributionPlansText,
  //       BeneficiaryCategoriesText,
  //     ],
  //   },
  //   {
  //     section: ClinicText,
  //     color: "secondary",
  //     sectors: [
  //       DoctorsText,
  //       SecretariesText,
  //       AppointmentsText,
  //       ClinicBalanceText,
  //     ],
  //   },
  //   {
  //     section: StoragesText,
  //     color: "success",
  //     sectors: [ItemsText],
  //   },
  //   {
  //     section: EducationText,
  //     color: "info",
  //     sectors: [StudentsText, TeachersText, SupervisorsText],
  //   },
  //   {
  //     section: AccountantText,
  //     color: "warning",
  //     sectors: [DonationsText, BooksText, EmployeesText, MeetsText],
  //   },
  // ];

  return (
    <Stack flexDirection={"row"} height={"100%"}>
      <Stack flex={0.75} justifyContent={"flex-start"} alignItems={"center"}>
        <BCard
          sx={{ width: "70%", px: 5, pt: 6, pb: 8, mt: 10 }}
          animations={{ transitions: "live" }}
        >
          <Grid2 container rowSpacing={5}>
            <Grid2 size={12}>
              <BTypography variant="h3" fontWeight={"bold"}>
                {WelcomeBackText}
              </BTypography>
              <BTypography>{SignInPleaseText}</BTypography>
            </Grid2>
            <Grid2 size={12}>
              <FormInput
                control={control}
                name="username"
                label={UserNameText}
                rules={{ required: true }}
              />
            </Grid2>
            <Grid2 size={12}>
              <FormInput
                control={control}
                type="password"
                name="password"
                label={PasswordText}
                rules={{ required: true }}
              />
            </Grid2>
            <Grid2 size={12}></Grid2>
            <Grid2 size={12}>
              <BButton
                variant="contained"
                startIcon={
                  <SvgIcon>
                    <FaDoorOpen />
                  </SvgIcon>
                }
                onClick={handleSubmit((data) =>
                  login(data).then(() => navigate("/"))
                )}
                loading={loginLoading}
              >
                {LoginText}
              </BButton>
            </Grid2>
          </Grid2>
        </BCard>
      </Stack>
      <Box
        flex={1}
        sx={(theme) => ({
          userSelect: "none",
          backgroundImage:
            theme.palette.mode === "light"
              ? "url(hands.jpg)"
              : "url('hands dark.jpg')",
          backgroundSize: "100% 100%",
          borderRadius: 2,
        })}
      >
        {/* <BCard
          sx={(theme) => ({
            mt: 3,
            marginInlineStart: 3,
            width: "70%",
            bgcolor: theme.palette.background.paper + "AA",
          })}
          animations={{ transitions: "popIn" }}
        >
          <BTypography display={"inline-block"} variant="h3">
            {YouCanManageYourText}
          </BTypography>{" "}
          <BTypography
            display={"inline-block"}
            animations={{ transitions: "slideInBottom", gestures: "scale" }}
            variant="h3"
            sx={(theme) => ({
              color: theme.palette[sections[i].color].main,
              borderBottom: `${
                theme.palette[sections[i].color].main
              } 5px solid`,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              backgroundImage: `linear-gradient(0deg, ${varAlpha(
                theme.palette[sections[i].color].mainChannel,
                0.8
              )}, transparent 30%)`,
            })}
            onClick={() => setI((i + 1) % sections.length)}
          >
            {sections[i].section}
          </BTypography>
          <br />
          <br />
          <BTypography display={"inline-block"} variant="h4">
            {AndControlManyThingsLikeText}
          </BTypography>{" "}
          <BTypography
            display={"inline-block"}
            variant="h4"
            animations={{ transitions: "slideInBottom", gestures: "scale" }}
            sx={(theme) => ({
              color: theme.palette[sections[i].color].main,
              borderBottom: `${
                theme.palette[sections[i].color].main
              } 5px solid`,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              backgroundImage: `linear-gradient(0deg, ${varAlpha(
                theme.palette[sections[i].color].mainChannel,
                0.8
              )}, transparent 30%)`,
            })}
            onClick={() => setJ((j + 1) % sections[i].sectors.length)}
          >
            {sections[i].sectors[j]}
          </BTypography>{" "}
          <BTypography display={"inline-block"} variant="h4">
            {AndMoreText}
          </BTypography>
        </BCard> */}
      </Box>
    </Stack>
  );
}
