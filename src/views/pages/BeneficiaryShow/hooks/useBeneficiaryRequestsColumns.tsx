import { useMemo } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { SvgIcon } from "@mui/material";
import {
  FaRegDotCircle as FaRegDotCircleIcon,
  FaRegTimesCircle as FaRegTimesCircleIcon,
  FaRegCheckCircle as FaRegCheckCircleIcon,
} from "react-icons/fa";

import { BCheckbox, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { Request } from "src/types/data/Request";

const i18ns = [
  "emergency_aids",
  "special_materials",
  "prescription_exchange",
  "received",
  "not_received",
  "valid_until",
  "received_by",
  "on",
  "rejection_reason",
  "status",
  "request_type",
  "requested",
  "reason",
  "result",
  "action_date",
  "collecting_info",
];
export function useBeneficiaryRequestsColumns() {
  const [
    EmergencyAidsText,
    SpecialMaterialsText,
    PrescriptionExchangeText,
    ReceivedText,
    NotReceivedText,
    ValidUntilText,
    ReceivedByText,
    OnText,
    RejectionReasonText,
    StatusText,
    RequestTypeText,
    RequestedText,
    ReasonText,
    ResultText,
    ActionDateText,
    CollectingInfoText,
  ] = useBaseTranslation(i18ns);
  return useMemo<GridColDef<Request>[]>(
    () => [
      {
        field: "status",
        headerName: StatusText,
        flex: 0.1,
        renderCell: ({ value }) => (
          <>
            {value === "pending" ? (
              <SvgIcon color="warning">
                <FaRegDotCircleIcon />
              </SvgIcon>
            ) : value === "accepted" ? (
              <SvgIcon color="success">
                <FaRegCheckCircleIcon />
              </SvgIcon>
            ) : value === "rejected" ? (
              <SvgIcon color="error">
                <FaRegTimesCircleIcon />
              </SvgIcon>
            ) : (
              ""
            )}
          </>
        ),
      },
      {
        field: "type",
        headerName: RequestTypeText,
        flex: 1,
        valueGetter: (value) =>
          value === "emergency aids"
            ? EmergencyAidsText
            : value === "special materials"
            ? SpecialMaterialsText
            : value === "prescription exchange"
            ? PrescriptionExchangeText
            : "",
        renderCell: ({ value }) => (
          <BTypography fontWeight={"bold"}>{value}</BTypography>
        ),
      },
      {
        field: "requested_amount",
        headerName: RequestedText,
        flex: 1,
        valueGetter: (_, row) =>
          row.type === "emergency aids"
            ? Intl.NumberFormat().format(row.requested_amount as any)
            : row.type === "special materials"
            ? row.requested_item_name
            : row.type === "prescription exchange"
            ? row.reason
            : "",
      },
      {
        field: "reason",
        headerName: ReasonText,
        flex: 1,
      },
      {
        field: "accepted_amount",
        headerName: ResultText,
        flex: 1,
        renderCell: ({ row }) => (
          <>
            {row.status === "accepted" ? (
              row.type === "emergency aids" ? (
                row.accepted_amount ? (
                  Intl.NumberFormat().format(row.accepted_amount)
                ) : (
                  "-"
                )
              ) : row.type === "special materials" ? (
                row.accepted_item_name
              ) : row.type === "prescription exchange" ? (
                row.what_exchanged
              ) : (
                ""
              )
            ) : row.status === "rejected" ? (
              <>
                <BTypography fontWeight={"semibold"}>
                  {RejectionReasonText}:
                </BTypography>
                <BTypography variant="body2">
                  {row.rejection_reason}
                </BTypography>
              </>
            ) : (
              "-"
            )}
          </>
        ),
      },
      {
        field: "accepted_at",
        headerName: ActionDateText,
        flex: 1,
        valueGetter: (_, row) =>
          row.status === "pending"
            ? "-"
            : row.status === "accepted"
            ? row.accepted_at
            : row.status === "rejected"
            ? row.rejected_at
            : "-",
      },
      {
        field: "is_collected",
        headerName: CollectingInfoText,
        flex: 1,
        renderCell: ({ row }) => (
          <>
            {row.status === "accepted" ? (
              row.is_collected ? (
                <>
                  <BCheckbox checked readOnly />
                  {ReceivedText}
                  <br />
                  {ReceivedByText +
                    ": " +
                    row.recipient_name +
                    ", " +
                    OnText +
                    ": " +
                    row.collection_date}
                </>
              ) : (
                <>
                  <BCheckbox checked={false} readOnly />
                  {NotReceivedText}
                  <BTypography fontWeight={"bold"}>
                    {ValidUntilText}:{" "}
                  </BTypography>
                  {row.expiry_date}
                </>
              )
            ) : (
              "-"
            )}
          </>
        ),
      },
    ],
    []
  );
}
