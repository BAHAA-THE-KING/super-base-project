import { Box, SvgIcon } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
} from "@mui/lab";

import { Inventory as InventoryIcon } from "@mui/icons-material";
import {
  FaUserGear as FaUserGearIcon,
  FaUserDoctor as FaUserDoctorIcon,
} from "react-icons/fa6";
import {
  FaHandHoldingUsd as FaHandHoldingUsdIcon,
  FaPrescriptionBottleAlt as FaPrescriptionBottleAltIcon,
  FaQuestion as FaQuestionIcon,
} from "react-icons/fa";
import {
  FiPackage as FiPackageIcon,
  FiDollarSign as FiDollarSignIcon,
} from "react-icons/fi";

import { BCard, BTypography } from "src/components/Base";

import { BeneficiaryHistory } from "src/types/data/SingleBeneficiary";
import { useBaseTranslation } from "src/hooks";

type Props = {
  history: BeneficiaryHistory[];
};

const i18ns = ["beneficiary_history"];
export function HistoryLog({ history }: Props) {
  const [BeneficiaryHistoryText] = useBaseTranslation(i18ns);
  return (
    <>
      <Box
        width={"10%"}
        overflow={"visible"}
        sx={{ wordBreak: "keep-all", whiteSpace: "nowrap" }}
      >
        <BTypography variant="h3">{BeneficiaryHistoryText}</BTypography>
        <Timeline position="right">
          {history?.map((log, i) => {
            const color =
              log.type === "beneficiary_created"
                ? "success"
                : log.type === "beneficiary_updated"
                ? "secondary"
                : log.type === "group_changed"
                ? "secondary"
                : log.type === "need_request_created"
                ? "primary"
                : log.type === "need_request_approved"
                ? "success"
                : log.type === "need_request_rejected"
                ? "error"
                : log.type === "need_request_received"
                ? "info"
                : log.type === "instant_aid_created"
                ? "success"
                : log.type === "instant_aid_approved"
                ? "success"
                : log.type === "instant_aid_rejected"
                ? "error"
                : log.type === "instant_aid_received"
                ? "info"
                : log.type === "plan_due"
                ? "success"
                : log.type === "plan_received"
                ? "info"
                : log.type === "salary_available"
                ? "success"
                : log.type === "salary_received"
                ? "info"
                : log.type === "prescription_created"
                ? "success"
                : log.type === "prescription_redeemed"
                ? "info"
                : log.type === "appointment_scheduled"
                ? "primary"
                : log.type === "appointment_attended"
                ? "success"
                : log.type === "appointment_late"
                ? "error"
                : log.type === "appointment_cancelled"
                ? "secondary"
                : "warning";
            const Icon =
              log.type === "beneficiary_created" ||
              log.type === "beneficiary_updated" ||
              log.type === "group_changed"
                ? FaUserGearIcon
                : log.type === "need_request_created" ||
                  log.type === "need_request_approved" ||
                  log.type === "need_request_rejected" ||
                  log.type === "need_request_received"
                ? InventoryIcon
                : log.type === "instant_aid_created" ||
                  log.type === "instant_aid_approved" ||
                  log.type === "instant_aid_rejected" ||
                  log.type === "instant_aid_received"
                ? FaHandHoldingUsdIcon
                : log.type === "plan_due" || log.type === "plan_received"
                ? FiPackageIcon
                : log.type === "prescription_created" ||
                  log.type === "prescription_redeemed"
                ? FaPrescriptionBottleAltIcon
                : log.type === "salary_available" ||
                  log.type === "salary_received"
                ? FiDollarSignIcon
                : log.type === "appointment_scheduled" ||
                  log.type === "appointment_attended" ||
                  log.type === "appointment_late" ||
                  log.type === "appointment_cancelled"
                ? FaUserDoctorIcon
                : FaQuestionIcon;
            return (
              <TimelineItem key={log.id} sx={{ width: "100%" }}>
                <TimelineOppositeContent>
                  <BTypography fontWeight={"bold"} dir="ltr">
                    {log.created_at}
                  </BTypography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color={color}>
                    <SvgIcon>
                      <Icon />
                    </SvgIcon>
                  </TimelineDot>
                  {(history?.length ?? 0) - 1 === i || <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <BCard sx={{ width: "1000px", height: "100px", p: 3 }}>
                    <BTypography fontWeight={"bold"}>{log.record}</BTypography>
                  </BCard>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </Box>
    </>
  );
}
