import { useMemo } from "react";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";

import { Edit as EditIcon } from "@mui/icons-material";

import { BTooltip } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { SecretaryType } from "src/types/data/Secretary";

const i18ns = [
  "secretary_name",
  "address",
  "birth_date",
  "birth_place",
  "mobile_number",
  "salary",
];
export function useSecretaryColumns(onEdit: (id: number) => void) {
  const [
    SecretaryNameText,
    AddressText,
    BirthDateText,
    BirthPlaceText,
    MobileNumberText,
    PricePerReservationText,
  ] = useBaseTranslation(i18ns);

  return useMemo<GridColDef<SecretaryType>[]>(
    () => [
      {
        field: "name",
        headerName: SecretaryNameText,
        flex: 1,
      },
      {
        field: "address",
        headerName: AddressText,
        flex: 1,
      },
      {
        field: "birth_date",
        headerName: BirthDateText,
        flex: 1,
      },
      {
        field: "birth_place",
        headerName: BirthPlaceText,
        flex: 1,
      },
      {
        field: "mobile",
        headerName: MobileNumberText,
        flex: 1,
      },
      {
        field: "salary",
        headerName: PricePerReservationText,
        flex: 1,
      },
      {
        field: "id",
        type: "actions",
        getActions: ({ row: { id } }) => [
          <BTooltip title="Edit">
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              color="primary"
              onClick={() => onEdit(id ?? 0)}
            />
          </BTooltip>,
        ],
      },
    ],
    []
  );
}
