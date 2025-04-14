import { useMemo } from "react";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import {
  PersonRemove as PersonRemoveIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";

import { BChip, BTooltip } from "src/components/Base";
import { useBaseTranslation } from "src/hooks";

const i18ns = [
  "name",
  "email",
  "status",
  "registered",
  "unregistered",
  "show_profile",
  "deactivate_user",
];
export function useBeneficiariesColumns() {
  const [
    name,
    email,
    status,
    registered,
    unregistered,
    showProfile,
    deactivateUser,
  ] = useBaseTranslation(i18ns);
  return useMemo<GridColDef[]>(
    () => [
      {
        field: "name",
        headerName: name,
        flex: 1,
      },
      {
        field: "email",
        headerName: email,
        flex: 1,
      },
      {
        field: "registered",
        headerName: status,
        type: "boolean",
        flex: 1,
        renderCell: ({ value }) =>
          value ? (
            <BChip
              color="success"
              label={registered}
              size="small"
              variant="slight"
            />
          ) : (
            <BChip
              color="error"
              label={unregistered}
              size="small"
              variant="slight"
            />
          ),
      },
      {
        field: "id",
        flex: 1,
        type: "actions",
        getActions: () => [
          <BTooltip title={showProfile}>
            <GridActionsCellItem
              icon={<VisibilityIcon />}
              color="primary"
              label={showProfile}
            />
          </BTooltip>,
          <BTooltip title={deactivateUser}>
            <GridActionsCellItem
              icon={<PersonRemoveIcon />}
              color="error"
              label={deactivateUser}
            />
          </BTooltip>,
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label={showProfile}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<PersonRemoveIcon />}
            label={deactivateUser}
            showInMenu
          />,
        ],
      },
    ],
    []
  );
}
