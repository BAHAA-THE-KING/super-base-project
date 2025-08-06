import { useMemo } from "react";
import { useNavigate } from "react-router";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";

import { FaArrowAltCircleLeft as FaArrowAltCircleLeftIcon } from "react-icons/fa";

import { BChip } from "src/components/Base";
import { ProgressBox } from "../components";

import { useBaseTranslation } from "src/hooks";

import { Plan } from "src/views/data";
import { SvgIcon } from "@mui/material";

const i18ns = [
  "plan_name",
  "plan_description",
  "plan_status",
  "finished",
  "not_finished",
  "plan_portion",
  "started_at",
  "plan_distribution_status",
  "show_details",
];
export function usePlansColumns() {
  const [
    PlanNameText,
    PlanDescriptionText,
    PlanStatusText,
    FinishedText,
    NotFinishedText,
    PlanPortionText,
    StartedAtText,
    PlanDistributionStatusText,
    ShowDetailsText,
  ] = useBaseTranslation(i18ns);

  const navigate = useNavigate();

  return useMemo<GridColDef<Plan>[]>(
    () => [
      {
        field: "name",
        headerName: PlanNameText,
        flex: 1,
      },
      {
        field: "description",
        headerName: PlanDescriptionText,
        flex: 1,
      },
      {
        field: "portion",
        headerName: PlanPortionText,
        flex: 1,
      },
      {
        field: "created_at",
        headerName: StartedAtText,
        flex: 1,
      },
      {
        field: "is_finished",
        headerName: PlanStatusText,
        renderCell: ({ value }) => {
          return (
            <BChip
              color={value ? "success" : "error"}
              label={value ? FinishedText : NotFinishedText}
              size="small"
              variant="slight"
            />
          );
        },
        flex: 1,
      },
      {
        field: "percent",
        headerName: PlanDistributionStatusText,
        renderCell: ({ value }) => <ProgressBox value={value} />,
        flex: 1,
      },
      {
        field: "id",
        flex: 1,
        type: "actions",
        getActions: ({ id }) => [
          <GridActionsCellItem
            icon={
              <SvgIcon>
                <FaArrowAltCircleLeftIcon />
              </SvgIcon>
            }
            color="primary"
            label={ShowDetailsText}
            onClick={() => navigate(`/plans/${id}`)}
          />,
        ],
      },
    ],
    []
  );
}
