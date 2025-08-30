import { useState } from "react";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router";

import {
  Add as AddIcon,
  CalendarMonth as CalendarMonthIcon,
  List as ListIcon,
} from "@mui/icons-material";

import { BButton } from "src/components/Base";
import { AppointmentsGrid, CalendarView } from "./components";

import { useBaseTranslation } from "src/hooks";
import { useAppointmentsColumns } from "./columns";
import { useAppointmentsAllData } from "src/views/data";

const i18ns = ["add_new_appointment", "show_calendar", "show_grid"];
export function Appointments() {
  const [AddNewAppointmentText, ShowCalendarText, ShowGridText] =
    useBaseTranslation(i18ns);

  const navigate = useNavigate();

  const onEdit = (id: number) => {
    navigate(id.toString(), { replace: true });
  };
  const columns = useAppointmentsColumns(onEdit);

  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<
    {
      id: string | number;
      field: string;
      operator: string;
      value: string | number;
    }[]
  >([]);

  const params = [
    ...filters,
    { id: "page", field: "page", operator: "=", value: page + 1 },
  ].reduce((p, e) => ({ ...p, [e.field]: e.value }), {});

  const { appointments, getAppointmentsLoading, totalRows } =
    useAppointmentsAllData(params);

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
        <AppointmentsGrid
          columns={columns}
          rows={appointments}
          loading={getAppointmentsLoading}
          totalRows={totalRows}
          page={page}
          setPage={setPage}
          filters={filters}
          setFilters={setFilters}
        />
      ) : (
        <CalendarView appointments={appointments} />
      )}
    </Stack>
  );
}
