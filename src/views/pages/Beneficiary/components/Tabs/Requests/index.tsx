import {
  Checkbox,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  FaRegDotCircle as FaRegDotCircleIcon,
  FaRegTimesCircle as FaRegTimesCircleIcon,
  FaRegCheckCircle as FaRegCheckCircleIcon,
} from "react-icons/fa";

import { BCircularProgress, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";
import { useRequestsData } from "../../../data";

type Props = {
  beneficiary_id: number;
};

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
export function Requests({ beneficiary_id }: Props) {
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
  const { isLoading, requests } = useRequestsData(beneficiary_id);

  return (
    <>
      {isLoading ? (
        <Stack justifyContent={"center"} alignItems={"center"}>
          <BCircularProgress />
        </Stack>
      ) : null}
      <TableContainer>
        <Table sx={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}>
          <TableHead>
            <TableRow>
              <TableCell>{StatusText}</TableCell>
              <TableCell>{RequestTypeText}</TableCell>
              <TableCell>{RequestedText}</TableCell>
              <TableCell>{ReasonText}</TableCell>
              <TableCell>{ResultText}</TableCell>
              <TableCell>{ActionDateText}</TableCell>
              <TableCell>{CollectingInfoText}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow
                key={request.id}
                sx={(theme) => ({
                  borderBlockEnd: `1px solid ${theme.palette.divider}`,
                  "&:last-child": {
                    borderBlockEnd: "none",
                  },
                  td: { wordBreak: "keep-all", whiteSpace: "nowrap" },
                })}
              >
                <TableCell>
                  {request.status === "pending" ? (
                    <SvgIcon color="warning">
                      <FaRegDotCircleIcon />
                    </SvgIcon>
                  ) : request.status === "accepted" ? (
                    <SvgIcon color="success">
                      <FaRegCheckCircleIcon />
                    </SvgIcon>
                  ) : request.status === "rejected" ? (
                    <SvgIcon color="error">
                      <FaRegTimesCircleIcon />
                    </SvgIcon>
                  ) : (
                    ""
                  )}
                </TableCell>
                <TableCell>
                  <BTypography fontWeight={"bold"}>
                    {request.type === "emergency aids"
                      ? EmergencyAidsText
                      : request.type === "special materials"
                      ? SpecialMaterialsText
                      : request.type === "prescription exchange"
                      ? PrescriptionExchangeText
                      : ""}
                  </BTypography>
                </TableCell>
                <TableCell
                  colSpan={request.type === "prescription exchange" ? 2 : 1}
                >
                  {request.type === "emergency aids"
                    ? Intl.NumberFormat().format(request.requested_amount)
                    : request.type === "special materials"
                    ? request.requested_item_name
                    : request.type === "prescription exchange"
                    ? request.reason
                    : ""}
                </TableCell>
                {request.type === "prescription exchange" || (
                  <TableCell>{request.reason}</TableCell>
                )}
                <TableCell>
                  {request.status === "accepted" ? (
                    request.type === "emergency aids" ? (
                      request.accepted_amount ? (
                        Intl.NumberFormat().format(request.accepted_amount)
                      ) : (
                        "-"
                      )
                    ) : request.type === "special materials" ? (
                      request.accepted_item_name
                    ) : request.type === "prescription exchange" ? (
                      request.what_exchanged
                    ) : (
                      ""
                    )
                  ) : request.status === "rejected" ? (
                    <>
                      <BTypography fontWeight={"bold"}>
                        {RejectionReasonText}:
                      </BTypography>
                      {request.rejection_reason}
                    </>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  {request.status === "pending"
                    ? "-"
                    : request.status === "accepted"
                    ? request.accepted_at
                    : request.status === "rejected"
                    ? request.rejected_at
                    : "-"}
                </TableCell>
                <TableCell>
                  {request.status === "accepted" ? (
                    request.is_collected ? (
                      <>
                        <Checkbox checked readOnly />
                        {ReceivedText}
                        <br />
                        {ReceivedByText +
                          ": " +
                          request.recipient_name +
                          ", " +
                          OnText +
                          ": " +
                          request.collection_date}
                      </>
                    ) : (
                      <>
                        <Checkbox checked={false} readOnly />
                        {NotReceivedText}
                        <BTypography fontWeight={"bold"}>
                          {ValidUntilText}:{" "}
                        </BTypography>
                        {request.expiry_date}
                      </>
                    )
                  ) : (
                    "-"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
