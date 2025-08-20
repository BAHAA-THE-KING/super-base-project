import { useMemo } from "react";
import { useNavigate } from "react-router";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { SvgIcon } from "@mui/material";

import { BsInfoCircleFill } from "react-icons/bs";

import { RequestStatusChip } from "src/components";
import { BTooltip } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { Expense } from "src/types/data/Expense";

const i18ns = [
  "number",
  "type",
  "amount",
  "to",
  "request_status",
  "pending",
  "accepted",
  "rejected",
  "show_details",
];
export function useExpensesColumns() {
  const [
    NumberText,
    TypeText,
    AmountText,
    ToText,
    RequestStatusText,
    PendingText,
    AcceptedText,
    RejectedText,
    ShowDetailsText,
  ] = useBaseTranslation(i18ns);
  const navigate = useNavigate();
  return useMemo<GridColDef<Expense>[]>(
    () => [
      {
        field: "id",
        headerName: NumberText,
        flex: 1,
      },
      {
        field: "type",
        headerName: TypeText,
        flex: 1,
      },
      {
        field: "amount",
        headerName: AmountText,
        flex: 1,
      },
      {
        field: "to",
        headerName: ToText,
        flex: 1,
      },
      {
        field: "request_status",
        headerName: RequestStatusText,
        type: "singleSelect",
        flex: 1,
        options: [
          { value: "pending", label: PendingText },
          { value: "accepted", label: AcceptedText },
          { value: "rejected", label: RejectedText },
        ],
        renderCell: ({ value }) => <RequestStatusChip status={value} />,
      },
      {
        field: "actions",
        flex: 1,
        type: "actions",
        getActions: ({ id }) => [
          <BTooltip title={ShowDetailsText}>
            <GridActionsCellItem
              icon={
                <SvgIcon>
                  <BsInfoCircleFill />
                </SvgIcon>
              }
              color="primary"
              label={ShowDetailsText}
              onClick={() => navigate(`/expenses/${id}`)}
            />
          </BTooltip>,
        ],
      },
    ],
    []
  );
}
