import { useState } from "react";
import { useNavigate } from "react-router";
import { Box, Grid2, Stack } from "@mui/material";

import { CalendarToday, Circle as CircleIcon } from "@mui/icons-material";

import { BButton, BCard, BTooltip, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { varAlpha } from "src/themes/styles";

import { AppointmentTable } from "src/types/data/AppointmentTable";

type Props = {
  appointments: AppointmentTable[];
};

const i18ns = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "back_to_today",
];

export function CalendarView({ appointments }: Props) {
  const [
    SundayText,
    MondayText,
    TuesdayText,
    WednesdayText,
    ThursdayText,
    FridayText,
    SaturdayText,
    BackToTodayText,
  ] = useBaseTranslation(i18ns);

  const navigate = useNavigate();

  const [chosenDate, setChosenDate] = useState(new Date());
  const currentYear = chosenDate.getFullYear();
  const currentMonth = chosenDate.getMonth() + 1;
  const startDay = new Date(chosenDate.setDate(1)).getDay() + 1;
  const numOfDays = new Date(currentYear, currentMonth, 0).getDate();
  const numOfDaysPrevMonth = new Date(
    currentYear,
    currentMonth - 1,
    0
  ).getDate();
  const endDay = new Date(chosenDate.setDate(numOfDays)).getDay() + 1;
  const days = new Array(numOfDays).fill(null).map((_, i) => ({
    date: new Date(currentYear, currentMonth - 1, i + 1),
    name: "current",
  }));
  const prevDays = new Array(startDay - 1 + 7)
    .fill(null)
    .map((_, i) => ({
      date: new Date(currentYear, currentMonth - 2, numOfDaysPrevMonth - i),

      name: "prev",
    }))
    .reverse();
  const nextDays = new Array(7 - endDay + 7).fill(null).map((_, i) => ({
    date: new Date(currentYear, currentMonth, i + 1),
    name: "next",
  }));
  const allDays = [...prevDays, ...days, ...nextDays];

  const daysNames = [
    SundayText,
    MondayText,
    TuesdayText,
    WednesdayText,
    ThursdayText,
    FridayText,
    SaturdayText,
  ];

  return (
    <Stack>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        p={1}
      >
        <BTooltip title={BackToTodayText} placement="start">
          <BButton
            color="success"
            icon={<CalendarToday />}
            onClick={() => setChosenDate(new Date())}
          />
        </BTooltip>
        <BTypography variant="h4">
          {currentYear}/{currentMonth < 9 ? "0" + currentMonth : currentMonth}
        </BTypography>
      </Box>
      <Grid2
        container
        spacing={1}
        sx={(theme) => ({
          "& .prev, & .current, & .next, & .day": {
            height: 100,
          },
          "&>:not(.day, .next, .current, .prev)": {
            bgcolor: "transparent !important",
          },
          "& .day": {
            bgcolor: theme.palette.primary.main,
          },
          "& .MuiGrid2-root:nth-child(2n+1) .current": {
            bgcolor: varAlpha(theme.palette.primary.mainChannel, 0.7),
          },
          "& .MuiGrid2-root:nth-child(2n) .current": {
            bgcolor: varAlpha(theme.palette.primary.mainChannel, 0.5),
          },
          "& .prev:hover, & .current:hover, & .next:hover": {
            bgcolor:
              varAlpha(theme.palette.primary.mainChannel, 1) + " !important",
          },
          "& .prev, & .next": {
            bgcolor:
              theme.palette.mode === "dark"
                ? theme.palette.grey["700"]
                : theme.palette.grey["300"],
          },
        })}
      >
        {daysNames.map((day) => (
          <Grid2
            className="day"
            size={12 / 7}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <BTypography variant="h6">{day}</BTypography>
          </Grid2>
        ))}
        <Grid2 size={12} height={"10px"}></Grid2>
        {allDays.map((e) => (
          <Grid2
            size={12 / 7}
            onClick={() =>
              e.name === "current"
                ? navigate(
                    "date/" +
                      e.date.toLocaleDateString("en-ZA").replaceAll("/", "-")
                  )
                : setChosenDate(e.date)
            }
          >
            <BCard
              className={e.name}
              sx={(theme) => ({
                width: "100%",
                height: "100%",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "stretch",
                border:
                  new Date().toLocaleDateString("en-ZA") ===
                  e.date.toLocaleDateString("en-ZA")
                    ? `2px ${theme.palette.primary.light} solid`
                    : "",
              })}
              variant="outlined"
              color="primary"
              animations={{
                transitions:
                  Math.random() < 0.2
                    ? "popIn"
                    : Math.random() < 0.4
                    ? "slideInBottom"
                    : Math.random() < 0.6
                    ? "slideInLeft"
                    : Math.random() < 0.8
                    ? "slideInRight"
                    : "faceInOnce",
                gestures: "scaleSmaller",
              }}
            >
              <Stack>
                {appointments
                  .filter(
                    (ee) => ee.date === e.date.toLocaleDateString("en-ZA")
                  )
                  .slice(0, 2)
                  .map((e) => (
                    <Box
                      display={"flex"}
                      justifyContent={"flex-start"}
                      alignItems={"center"}
                    >
                      <CircleIcon
                        color={
                          e.status === "finished"
                            ? "success"
                            : e.status === "missed"
                            ? "error"
                            : e.status === "canceled"
                            ? "secondary"
                            : "warning"
                        }
                        sx={{ fontSize: 14, mx: 1 }}
                      />
                      <BTypography>{e.beneficiary_name}</BTypography>
                    </Box>
                  ))}
              </Stack>
              <BTypography textAlign={"end"}>
                {e.date.toLocaleDateString("en-ZA")}
              </BTypography>
            </BCard>
          </Grid2>
        ))}
      </Grid2>
    </Stack>
  );
}
