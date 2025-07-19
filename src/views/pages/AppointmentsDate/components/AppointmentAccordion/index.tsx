import { Box } from "@mui/material";
import { Link } from "react-router";

import { Forward as ForwardIcon } from "@mui/icons-material";

import { BButton, BTypography, BCard, BTooltip } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { AppointmentTable } from "src/types/data/AppointmentTable";
import { AppointmentStatusChip } from "../AppointmentStatusChip";

type Props = {
  appointment: AppointmentTable;
  index: number;
};

const i18ns = ["more_info", "patient_name", "doctor_name"];
export function AppointmentAccordion({ appointment, index }: Props) {
  const [MoreInfoText, PatientNameText, DoctorNameText] =
    useBaseTranslation(i18ns);

  return (
    <Box key={appointment.id} sx={{ p: 1 }}>
      <BCard
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
        animations={{ transitions: "slideInBottom" }}
      >
        <BTypography fontWeight={"bold"} variant="h3" sx={{ p: 1 }}>
          #{index + 1}
        </BTypography>
        <BTypography fontWeight={"bold"} variant="h6" sx={{ p: 1 }}>
          {PatientNameText}: {appointment.beneficiary_name}
        </BTypography>
        <BTypography fontWeight={"bold"} variant="h3" sx={{ p: 1 }}>
          |
        </BTypography>
        <BTypography fontWeight={"bold"} variant="h6" sx={{ p: 1 }}>
          {DoctorNameText}: {appointment.beneficiary_name}
        </BTypography>
        <Box p={1}>
          <AppointmentStatusChip status={appointment.status} />
        </Box>
        <BTooltip title={MoreInfoText} placement="end">
          <Link
            to={"/appointments/" + appointment.id}
            onClick={(e) => e.stopPropagation()}
          >
            <BButton
              icon={<ForwardIcon sx={{ scale: "-1 1" }} />}
              animations={{ gestures: "goEnd" }}
              color={"primary"}
              sx={{ py: 1 }}
            />
          </Link>
        </BTooltip>
      </BCard>
    </Box>
  );
}
