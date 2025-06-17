import { useState } from "react";
import { ButtonGroup, Grid2, Stack, SvgIcon, useTheme } from "@mui/material";

import { LuLayoutList as LuLayoutListIcon } from "react-icons/lu";
import { PiCards as PiCardsIcon } from "react-icons/pi";
import {
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
} from "@mui/icons-material";

import { BButton, BCard, BTypography } from "src/components/Base";
import { DynamicCard } from "..";

import { useBaseTranslation } from "src/hooks";

import { BeneficiaryRequest } from "src/views/pages/Meets/data";

type Props = {
  dataType: "BeneficiaryRequest";
  data: Partial<BeneficiaryRequest>[];
};

const i18ns = [
  "is_married",
  "yes",
  "no",
  "number_of_children",
  "case_description",
  "previous_case",
  "next_case",
];
export function Data({ data, dataType }: Props) {
  const [
    IsMarriedText,
    YesText,
    NoText,
    NumberOfChildrenText,
    CaseDescriptionText,
    PreviousCaseText,
    NextCaseText,
  ] = useBaseTranslation(i18ns);
  const { direction } = useTheme();
  const rtl = direction === "rtl";

  const [view, setView] = useState<"list" | "grid">("list");
  const [selectedCase, setSelectedCase] = useState<number>(0);

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
            <Grid2
              key={request.id}
              size={{ xs: 12 }}
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
                  {IsMarriedText}: {Boolean(request.partner) ? YesText : NoText}
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
          ))}
        </Grid2>
      ) : (
        <Stack>
          <DynamicCard
            requestType={dataType}
            requestId={data[selectedCase].id!}
          />
          <Stack>
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
