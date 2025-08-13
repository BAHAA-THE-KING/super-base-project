import { CardContent } from "@mui/material";

import { MdAssignmentTurnedIn as MdAssignmentTurnedInIcon } from "react-icons/md";

import { BButton, BCard, BDataGrid, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";
import { usePlanShowColumns } from "../../hooks";

import { ShowPlanBeneficiary } from "src/views/data";

type Props = {
  nextBeneficiaries: ShowPlanBeneficiary[];
  proceedPlan: () => void;
  proceedPlanLoading: boolean;
};

const i18ns = ["order", "add_selected"];
export function NextBeneficiariesPlanInfo({
  nextBeneficiaries,
  proceedPlan,
  proceedPlanLoading,
}: Props) {
  const [OrderText, AddSelectedText] = useBaseTranslation(i18ns);

  const columns = usePlanShowColumns();

  return (
    <BCard sx={{ m: 1 }} animations={{ transitions: "slideInBottom" }}>
      <CardContent>
        <BTypography variant="h5" fontWeight={"bold"}>
          {OrderText}
        </BTypography>
      </CardContent>
      <CardContent>
        <BButton
          variant="contained"
          startIcon={<MdAssignmentTurnedInIcon />}
          loading={proceedPlanLoading}
          onClick={proceedPlan}
        >
          {AddSelectedText}
        </BButton>
      </CardContent>
      <CardContent>
        <BDataGrid
          columns={columns}
          rows={nextBeneficiaries}
          pageSizeOptions={[15, 25, 50, 100]}
          initialState={{
            pagination: {
              paginationModel: {
                page: 0,
                pageSize: 15,
              },
            },
            sorting: {
              sortModel: [
                {
                  field: "order",
                  sort: "asc",
                },
              ],
            },
          }}
        />
      </CardContent>
    </BCard>
  );
}
