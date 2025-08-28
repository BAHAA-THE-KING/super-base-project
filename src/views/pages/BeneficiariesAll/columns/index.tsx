import { useMemo } from "react";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import {
  PersonRemove as PersonRemoveIcon,
  AssignmentInd as AssignmentIndIcon,
} from "@mui/icons-material";

import { BChip, BTooltip } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { BeneficiaryTable } from "src/types/data/BeneficiaryTable";
import { useNavigate } from "react-router";
import { RequestStatusChip } from "src/components";

const i18ns = [
  "full_name",
  "father_name",
  "mother_name",
  "birth",
  "national_number",
  "job",
  "phone_number",
  "mobile_number",
  "residence_type",
  "rent",
  "own",
  "host",
  "borrow",
  "monthly_income",
  "family_members",
  "group",
  "member",
  "request_status",
  "pending",
  "accepted",
  "rejected",
  "show_profile",
  "cut_aids",
];
export function useBeneficiariesColumns() {
  const [
    FullNameText,
    FatherNameText,
    MotherNameText,
    BirthText,
    NationalNumberText,
    JobText,
    PhoneNumberText,
    MobileNumberText,
    ResidenceTypeText,
    RentText,
    OwnText,
    HostText,
    BorrowText,
    MonthlyIncomeText,
    FamilyMembersText,
    GroupText,
    MemberText,
    RequestStatusText,
    PendingText,
    AcceptedText,
    RejectedText,
    ShowProfileText,
    CutAidsText,
  ] = useBaseTranslation(i18ns);
  const navigate = useNavigate();
  return useMemo<GridColDef<BeneficiaryTable>[]>(
    () => [
      {
        field: "first_name",
        headerName: FullNameText,
        valueGetter: (value, row) => value + " " + row.last_name,
        flex: 1,
      },
      {
        field: "father_name",
        headerName: FatherNameText,
        flex: 1,
      },
      {
        field: "mother_name",
        headerName: MotherNameText,
        flex: 1,
      },
      {
        field: "birth_date",
        headerName: BirthText,
        valueGetter: (value, row) => row.birth_place + " " + value,
        flex: 1,
      },
      {
        field: "national_number",
        headerName: NationalNumberText,
        flex: 1,
      },
      {
        field: "job",
        headerName: JobText,
        flex: 1,
      },
      {
        field: "phone_number",
        headerName: PhoneNumberText,
        flex: 1,
      },
      {
        field: "mobile_number",
        headerName: MobileNumberText,
        flex: 1,
      },
      {
        field: "residence_type",
        headerName: ResidenceTypeText,
        flex: 1,
        type: "singleSelect",
        options: [
          { value: "rent", label: RentText },
          { value: "own", label: OwnText },
          { value: "host", label: HostText },
          { value: "borrow", label: BorrowText },
        ],
        valueGetter: (value) =>
          value === "rent"
            ? RentText
            : value === "own"
            ? OwnText
            : value === "host"
            ? HostText
            : value === "borrow"
            ? BorrowText
            : "",
      },
      {
        field: "family_members",
        headerName: FamilyMembersText,
        valueFormatter: (value) => value + " " + MemberText,
        flex: 1,
      },
      {
        field: "group_name",
        headerName: GroupText,
        flex: 1,
        renderCell: ({ value, row }) => {
          return (
            <BChip
              color={row.group_color}
              label={value}
              size="small"
              variant="slight"
            />
          );
        },
      },
      {
        field: "monthly_income",
        headerName: MonthlyIncomeText,
        valueFormatter: (value) => `$${value}`,
        flex: 1,
      },
      {
        field: "request_status",
        headerName: RequestStatusText,
        type: "singleSelect",
        flex: 1,
        valueOptions: [
          { value: "pending", label: PendingText },
          { value: "accepted", label: AcceptedText },
          { value: "rejected", label: RejectedText },
        ],
        renderCell: ({ value }) => <RequestStatusChip status={value} />,
      },
      {
        field: "id",
        flex: 1,
        type: "actions",
        getActions: ({ id }) => [
          <BTooltip title={ShowProfileText}>
            <GridActionsCellItem
              icon={<AssignmentIndIcon />}
              color="primary"
              label={ShowProfileText}
              onClick={() => navigate(id.toString())}
            />
          </BTooltip>,
          <BTooltip title={CutAidsText}>
            <GridActionsCellItem
              icon={<PersonRemoveIcon />}
              color="error"
              label={CutAidsText}
            />
          </BTooltip>,
        ],
      },
    ],
    []
  );
}
