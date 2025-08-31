import { useMemo } from "react";
import { useNavigate } from "react-router";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { SvgIcon } from "@mui/material";

import { BsInfoCircleFill } from "react-icons/bs";

import { BTooltip } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { Donation } from "src/types/data/Donation";

const i18ns = ["number", "from", "amount", "details", "show_details"];
export function useDonationsColumns() {
  const [NumberText, FromText, AmountText, DetailsText, ShowDetailsText] =
    useBaseTranslation(i18ns);
  const navigate = useNavigate();
  return useMemo<GridColDef<Donation>[]>(
    () => [
      {
        field: "id",
        headerName: NumberText,
        flex: 1,
      },
      {
        field: "from",
        headerName: FromText,
        flex: 1,
      },
      {
        field: "amount",
        headerName: AmountText,
        flex: 1,
      },
      {
        field: "details",
        headerName: DetailsText,
        flex: 1,
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
              onClick={() => navigate(id.toString())}
            />
          </BTooltip>,
        ],
      },
    ],
    []
  );
}
