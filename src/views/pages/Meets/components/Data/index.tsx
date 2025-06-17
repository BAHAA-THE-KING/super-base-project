import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { ButtonGroup, Grid2, Stack, SvgIcon, useTheme } from "@mui/material";

import { LuLayoutList as LuLayoutListIcon } from "react-icons/lu";
import { PiCards as PiCardsIcon } from "react-icons/pi";
import {
  Check as CheckIcon,
  Close as CloseIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
} from "@mui/icons-material";

import { FormInput } from "src/components";
import { BButton, BCard, BChip, BTypography } from "src/components/Base";
import { DynamicCard } from "..";

import { useBaseTranslation } from "src/hooks";

import { BeneficiaryRequest } from "src/views/pages/Meets/data";

type AcceptanceForm = {
  status?: boolean;
  reason?: string;
}[];

type Props = {
  dataType: "BeneficiaryRequest";
  data: Partial<BeneficiaryRequest>[];
  formInstance: UseFormReturn<AcceptanceForm>;
};

const i18ns = [
  "is_married",
  "yes",
  "no",
  "number_of_children",
  "case_description",
  "previous_case",
  "next_case",
  "do_you_accept_request_que",
  "reason",
  "accepted",
  "rejected",
  "pending",
];
export function Data({ data, dataType, formInstance }: Props) {
  const [
    IsMarriedText,
    YesText,
    NoText,
    NumberOfChildrenText,
    CaseDescriptionText,
    PreviousCaseText,
    NextCaseText,
    DoYouAcceptRequestQueText,
    ReasonText,
    AcceptedText,
    RejectedText,
    PendingText,
  ] = useBaseTranslation(i18ns);
  const { direction } = useTheme();
  const rtl = direction === "rtl";

  const [view, setView] = useState<"list" | "grid">("list");
  const [selectedCase, setSelectedCase] = useState<number>(0);

  const { control, setValue, watch, getValues } = formInstance;

  return (
    <Stack>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        mb={2}
      >
        <ButtonGroup>
          <BButton
            sx={{
              width: "100px",
              height: "40px",
              ":hover": {
                backgroundColor:
                  view === "list" ? "primary.main" : "transparent",
              },
            }}
            variant={view === "list" ? "contained" : "outlined"}
            onClick={() => setView("list")}
            icon={
              <SvgIcon
                sx={{ color: view === "list" ? "white" : "primary.main" }}
              >
                <LuLayoutListIcon />
              </SvgIcon>
            }
          />
          <BButton
            sx={{
              width: "100px",
              height: "40px",
              ":hover": {
                backgroundColor:
                  view === "grid" ? "primary.main" : "transparent",
              },
            }}
            variant={view === "grid" ? "contained" : "outlined"}
            onClick={() => setView("grid")}
            icon={
              <SvgIcon
                sx={{ color: view === "grid" ? "white" : "primary.main" }}
              >
                <PiCardsIcon />
              </SvgIcon>
            }
          />
        </ButtonGroup>
      </Stack>
      {view === "list" ? (
        <Grid2 container spacing={2} m={1}>
          {data.map((request) => (
            <React.Fragment key={request.id}>
              <Grid2
                size={{ xs: 10 }}
                component={BCard}
                container
                sx={{ p: 3 }}
              >
                <Grid2
                  height={"100px"}
                  borderRadius={"50%"}
                  overflow={"hidden"}
                  sx={(theme) => ({
                    width: "100px",
                    border: `3px solid ${theme.palette.primary.main}`,
                  })}
                >
                  <img
                    src={request.image_url || ""}
                    alt={request.first_name}
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      aspectRatio: 1,
                    }}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 2 }}>
                  <BTypography variant="h6">
                    {request.first_name} {request.last_name}
                  </BTypography>
                  <BTypography>{request.birth_date}</BTypography>
                  <BTypography>{request.address}</BTypography>
                  <BTypography>
                    {IsMarriedText}:{" "}
                    {Boolean(request.partner) ? YesText : NoText}
                  </BTypography>
                  <BTypography>
                    {NumberOfChildrenText}: {request.children?.length}
                  </BTypography>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: "auto" }}>
                  <BTypography variant="h6">{CaseDescriptionText}:</BTypography>
                  <BTypography>{request.case_description}</BTypography>
                </Grid2>
              </Grid2>
              <Grid2 size={{ xs: 2 }}>
                {watch(`${request.id!}.status`) === true ? (
                  <BChip label={AcceptedText} color="success" />
                ) : watch(`${request.id!}.status`) === false ? (
                  <BChip label={RejectedText} color="error" />
                ) : (
                  <BChip label={PendingText} color="warning" />
                )}
              </Grid2>
            </React.Fragment>
          ))}
        </Grid2>
      ) : (
        <Stack>
          <DynamicCard
            requestType={dataType}
            requestId={data[selectedCase].id!}
          />
          <Stack>
            <BCard sx={{ p: 2, m: 1, width: "45%" }}>
              <Stack gap={2}>
                <Stack
                  gap={2}
                  flexDirection={"row"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <BTypography variant="h6" textAlign="center">
                    {DoYouAcceptRequestQueText}
                  </BTypography>
                  <BButton
                    variant={
                      watch(`${data[selectedCase].id!}.status`) === true
                        ? "contained"
                        : "outlined"
                    }
                    color="success"
                    startIcon={<CheckIcon />}
                    onClick={() => {
                      setValue(`${data[selectedCase].id!}.status`, true);
                    }}
                  >
                    {YesText}
                  </BButton>
                  <BButton
                    variant={
                      watch(`${data[selectedCase].id!}.status`) === false
                        ? "contained"
                        : "outlined"
                    }
                    color="error"
                    startIcon={<CloseIcon />}
                    onClick={() => {
                      setValue(`${data[selectedCase].id!}.status`, false);
                    }}
                  >
                    {NoText}
                  </BButton>
                </Stack>
                <FormInput
                  name={`${data[selectedCase].id!}.reason`}
                  control={control}
                  multiline
                  label={ReasonText}
                  inputProps={{
                    variant: "outlined",
                  }}
                />
              </Stack>
            </BCard>
          </Stack>
          <Stack m={1}>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <BButton
                variant="outlined"
                disabled={selectedCase === 0}
                onClick={() => setSelectedCase(selectedCase - 1)}
                startIcon={rtl ? <NavigateNextIcon /> : <NavigateBeforeIcon />}
              >
                {PreviousCaseText}
              </BButton>
              <BButton
                variant="outlined"
                disabled={selectedCase === data.length - 1}
                onClick={() => setSelectedCase(selectedCase + 1)}
                endIcon={rtl ? <NavigateBeforeIcon /> : <NavigateNextIcon />}
              >
                {NextCaseText}
              </BButton>
            </Stack>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
