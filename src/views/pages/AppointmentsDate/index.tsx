import { useNavigate, useParams } from "react-router";
import { Stack } from "@mui/material";

import { AppointmentAccordion } from "./components";

import { useAppointmentsData } from "../Appointments/data";

export function AppointmentsDate() {
  const navigate = useNavigate();
  const { date: dateParam } = useParams();
  if (!dateParam) {
    navigate("/appointments");
    return <></>;
  }
  const date = new Date(dateParam);
  if (!date) {
    navigate("/appointments");
    return <></>;
  }

  const { appointments: allAppointments } = useAppointmentsData();
  const appointments = allAppointments.filter(
    (e) => e.date === date.toLocaleDateString("fr-Ca")
  );

  return (
    <Stack>
      {appointments.map((appointment, i) => (
        <AppointmentAccordion appointment={appointment} index={i} />
      ))}
    </Stack>
  );
}
