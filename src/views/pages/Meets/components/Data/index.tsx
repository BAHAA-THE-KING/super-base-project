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
import { DynamicCard, DynamicList } from "..";

import { useBaseTranslation } from "src/hooks";

import {
  BeneficiaryRequest,
  EmergencyAssistanceRequest,
} from "src/views/pages/Meets/data";

type AcceptanceForm = {
  status?: boolean;
  reason?: string;
}[];

type Props = {
  dataType: "BeneficiaryRequest" | "EmergencyAssistanceRequest";
  data: Partial<BeneficiaryRequest | EmergencyAssistanceRequest>[];
  formInstance: UseFormReturn<AcceptanceForm>;
};

const i18ns = [
  "yes",
  "no",
  "previous_case",
  "next_case",
  "do_you_accept_request_que",
  "reason",
  "accepted",
  "rejected",
  "pending",
  "request_status",
];
export function Data({ data, dataType, formInstance }: Props) {
  const [
    YesText,
    NoText,
    PreviousCaseText,
    NextCaseText,
    DoYouAcceptRequestQueText,
    ReasonText,
    AcceptedText,
    RejectedText,
    PendingText,
    RequestStatusText,
  ] = useBaseTranslation(i18ns);
  const { direction } = useTheme();
  const rtl = direction === "rtl";

  const [view, setView] = useState<"list" | "grid">("list");
  const [selectedCase, setSelectedCase] = useState<number>(0);

  const { control, setValue, watch } = formInstance;

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
                {dataType === "BeneficiaryRequest" ? (
                  <DynamicList request={{ type: dataType, ...request }} />
                ) : null}
                <Grid2 size={{ xs: 2 }}>
                  <BTypography variant="h6">
                    {RequestStatusText}:{" "}
                    {watch(`${request.id!}.status`) === true ? (
                      <BChip
                        label={AcceptedText}
                        color="success"
                        variant="slight"
                      />
                    ) : watch(`${request.id!}.status`) === false ? (
                      <BChip
                        label={RejectedText}
                        color="error"
                        variant="slight"
                      />
                    ) : (
                      <BChip
                        label={PendingText}
                        color="warning"
                        variant="slight"
                      />
                    )}
                  </BTypography>
                </Grid2>
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
