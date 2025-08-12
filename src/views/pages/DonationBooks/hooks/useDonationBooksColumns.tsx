import { useMemo } from "react";
import { useNavigate } from "react-router";
import {
  getGridDateOperators,
  GridActionsCellItem,
  GridColDef,
} from "@mui/x-data-grid";

import { SvgIcon } from "@mui/material";
import { FaArrowAltCircleLeft as FaArrowAltCircleLeftIcon } from "react-icons/fa";

import { BChip } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { DonationBook } from "src/types/data/DonationBook";

const i18ns = [
  "number",
  "date",
  "status",
  "category",
  "finished",
  "not_finished",
  "show_details",
];
export function useDonationBooksColumns() {
  const [
    BookNumberText,
    BookDateText,
    BookStatusText,
    BookCategoryText,
    FinishedText,
    NotFinishedText,
    ShowDetailsText,
  ] = useBaseTranslation(i18ns);

  const navigate = useNavigate();

  return useMemo<GridColDef<DonationBook>[]>(
    () => [
      {
        field: "number",
        headerName: BookNumberText,
        flex: 1,
        filterOperators: getGridDateOperators(false).filter(
          (e) => e.value == "is"
        ),
      },
      {
        field: "category",
        headerName: BookCategoryText,
        flex: 1,
        filterOperators: getGridDateOperators(false).filter(
          (e) => e.value == "is"
        ),
      },
      {
        field: "date",
        headerName: BookDateText,
        flex: 1,
        filterOperators: getGridDateOperators(false).filter(
          (e) => e.value == "is"
        ),
      },
      {
        field: "is_finished",
        headerName: BookStatusText,
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
        type: "boolean",
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
            onClick={() => navigate(`/donation-books/${id}`)}
          />,
        ],
      },
    ],
    []
  );
}
