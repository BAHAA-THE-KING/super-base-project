import { useState } from "react";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router";

import {
  Add as AddIcon,
  CalendarMonth as CalendarMonthIcon,
  List as ListIcon,
} from "@mui/icons-material";

import { BButton, BDataGrid } from "src/components/Base";
import { CalendarView } from "./components";

import { useBaseTranslation } from "src/hooks";
import { useAppointmentsColumns } from "./columns";
import { useAppointmentsData } from "./data";

const i18ns = ["add_new_appointment", "show_calendar", "show_grid"];
export function Appointments() {
  const [AddNewAppointmentText, ShowCalendarText, ShowGridText] =
    useBaseTranslation(i18ns);

  const navigate = useNavigate();

  const onEdit = (id: number) => {
    navigate(id.toString());
  };
  const columns = useAppointmentsColumns(onEdit);

  const { appointments } = useAppointmentsData();

  function addAppointment() {
    navigate("add");
  }

  const [view, setView] = useState<"grid" | "calendar">("grid");

  return (
    <Stack width="100%" height="100%" p={3}>
      <Stack
        width="100%"
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <BButton
          variant="contained"
          size="medium"
          color="primary"
          sx={{ my: 2, width: "max-content" }}
          onClick={addAppointment}
          startIcon={<AddIcon />}
        >
          {AddNewAppointmentText}
        </BButton>
        <BButton
          variant="outlined"
          size="medium"
          color="primary"
          sx={{ my: 2, width: "max-content" }}
          onClick={() =>
            view === "grid" ? setView("calendar") : setView("grid")
          }
          startIcon={view === "grid" ? <CalendarMonthIcon /> : <ListIcon />}
        >
          {view === "grid" ? ShowCalendarText : ShowGridText}
        </BButton>
      </Stack>
      {view === "grid" ? (
        <BDataGrid columns={columns} rows={appointments} />
      ) : (
        <CalendarView appointments={appointments} />
      )}
    </Stack>
  );
}
