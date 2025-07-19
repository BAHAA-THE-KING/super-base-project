import { BChip } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { AppointmentTable } from "src/types/data/AppointmentTable";

type Props = Pick<AppointmentTable, "status">;

const i18ns = ["pending", "finished", "missed", "canceled"];
export function AppointmentStatusChip({ status }: Props) {
  const [PendingText, FinishedText, MissedText, CanceledText] =
    useBaseTranslation(i18ns);
  const color =
    status === "pending"
      ? "warning"
      : status === "finished"
      ? "success"
      : status === "missed"
      ? "error"
      : "secondary";
  const label =
    status === "pending"
      ? PendingText
      : status === "finished"
      ? FinishedText
      : status === "missed"
      ? MissedText
      : CanceledText;

  return <BChip color={color} label={label} size="small" variant="slight" />;
}
