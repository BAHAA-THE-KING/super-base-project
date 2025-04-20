import { BChip } from "../Base";

import { useBaseTranslation } from "src/hooks";

type Props = {
  status: "pending" | "accepted" | "rejected";
};

const i18ns = ["pending", "accepted", "rejected"];
export function RequestStatusChip({ status }: Props) {
  const [PendingText, AcceptedText, RejectedText] = useBaseTranslation(i18ns);
  const color =
    status === "pending"
      ? "warning"
      : status === "accepted"
      ? "success"
      : status === "rejected"
      ? "error"
      : "primary";
  const label =
    status === "pending"
      ? PendingText
      : status === "accepted"
      ? AcceptedText
      : status === "rejected"
      ? RejectedText
      : "";

  return <BChip color={color} label={label} size="small" variant="slight" />;
}
