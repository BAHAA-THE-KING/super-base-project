import React, { useState } from "react";
import { ButtonGroup, Stack, SvgIcon, useTheme } from "@mui/material";

import { LuLayoutList as LuLayoutListIcon } from "react-icons/lu";
import { PiCards as PiCardsIcon } from "react-icons/pi";
import {
  Check as CheckIcon,
  Close as CloseIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
} from "@mui/icons-material";

import {
  BButton,
  BCard,
  BChip,
  BTextField,
  BTypography,
} from "src/components/Base";
import { DynamicCard, DynamicList } from "..";

import { useBaseTranslation } from "src/hooks";
import {
  type BeneficiaryRequest,
  type EmergencyAssistanceRequest,
  type SpecialMaterialRequest,
  type WithdrawalOrderRequest,
} from "src/views/data";

type AcceptanceForm = {
  BeneficiaryRequest: {
    id: number;
    requestId: number;
    status: "accepted" | "rejected" | "";
    reason: string;
  }[];
  EmergencyAssistanceRequest: {
    id: number;
    requestId: number;
    status: "accepted" | "rejected" | "";
    reason: string;
  }[];
  SpecialMaterialRequest: {
    id: number;
    requestId: number;
    status: "accepted" | "rejected" | "";
    reason: string;
  }[];
  WithdrawalOrderRequest: {
    id: number;
    requestId: number;
    status: "accepted" | "rejected" | "";
    reason: string;
  }[];
  none: any[];
};

type Props = {
  dataType:
    | "BeneficiaryRequest"
    | "EmergencyAssistanceRequest"
    | "SpecialMaterialRequest"
    | "WithdrawalOrderRequest";
  data: Partial<
    | BeneficiaryRequest
    | EmergencyAssistanceRequest
    | SpecialMaterialRequest
    | WithdrawalOrderRequest
  >[];
  formData: AcceptanceForm;
  setFromData: (fromData: AcceptanceForm) => void;
  selectedCase: number;
  setSelectedCase: (fromData: number) => void;
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
export function Data({
  data,
  dataType,
  formData,
  setFromData,
  selectedCase,
  setSelectedCase,
}: Props) {
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

  const fields = formData[dataType];

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
        <Stack spacing={2} m={1}>
          {fields.map((request, idx) => (
            <React.Fragment key={dataType + " " + request.requestId}>
              <Stack
                component={BCard}
                p={3}
                flexDirection={"row"}
                justifyContent={"space-between"}
              >
                <DynamicList
                  request={{ type: dataType, ...data[idx] } as any}
                />
                <Stack width={"30%"} whiteSpace={"nowrap"}>
                  <BTypography variant="h6">
                    {RequestStatusText}:{" "}
                    {request.status === "accepted" ? (
                      <BChip
                        label={AcceptedText}
                        color="success"
                        variant="slight"
                      />
                    ) : request.status === "rejected" ? (
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
                  <BTypography>{request.reason}</BTypography>
                </Stack>
              </Stack>
            </React.Fragment>
          ))}
        </Stack>
      ) : (
        <Stack>
          {fields.length ? (
            <>
              <DynamicCard
                id={fields[selectedCase].id}
                requestType={dataType}
                request={data[selectedCase]}
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
                          fields[selectedCase].status === "accepted"
                            ? "contained"
                            : "outlined"
                        }
                        color="success"
                        startIcon={<CheckIcon />}
                        onClick={() => {
                          const temp = { ...formData };
                          temp[dataType][selectedCase].status = "accepted";
                          setFromData(temp);
                        }}
                      >
                        {YesText}
                      </BButton>
                      <BButton
                        variant={
                          fields[selectedCase].status === "rejected"
                            ? "contained"
                            : "outlined"
                        }
                        color="error"
                        startIcon={<CloseIcon />}
                        onClick={() => {
                          const temp = { ...formData };
                          temp[dataType][selectedCase].status = "rejected";
                          setFromData(temp);
                        }}
                      >
                        {NoText}
                      </BButton>
                    </Stack>
                    <BTextField
                      name={`${dataType}.${selectedCase}.reason`}
                      label={ReasonText}
                      variant={"outlined"}
                      multiline
                      value={fields[selectedCase].reason}
                      onChange={(e) => {
                        const temp = { ...formData };
                        temp[dataType][selectedCase].reason = e.target.value;
                        setFromData(temp);
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
                    startIcon={
                      rtl ? <NavigateNextIcon /> : <NavigateBeforeIcon />
                    }
                  >
                    {PreviousCaseText}
                  </BButton>
                  <BTypography>
                    {selectedCase + 1}/{data.length}
                  </BTypography>
                  <BButton
                    variant="outlined"
                    disabled={selectedCase === data.length - 1}
                    onClick={() => setSelectedCase(selectedCase + 1)}
                    endIcon={
                      rtl ? <NavigateBeforeIcon /> : <NavigateNextIcon />
                    }
                  >
                    {NextCaseText}
                  </BButton>
                </Stack>
              </Stack>
            </>
          ) : null}
        </Stack>
      )}
    </Stack>
  );
}
