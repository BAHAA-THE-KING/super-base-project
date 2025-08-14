import { useState } from "react";
import { CardContent } from "@mui/material";

import { MdAssignmentTurnedIn as MdAssignmentTurnedInIcon } from "react-icons/md";
import { FaPeopleGroup as FaPeopleGroupIcon } from "react-icons/fa6";

import { BButton, BCard, BDataGrid, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";
import { usePlanShowColumns } from "../../hooks";
import { ReadQRPopup } from "..";

import { ShowPlanBeneficiary } from "src/views/data";

type Props = {
  nextBeneficiaries: ShowPlanBeneficiary[];
  planId: number;
  proceedPlan: () => void;
  proceedPlanLoading: boolean;
};

const i18ns = ["order", "add_selected", "give_him"];
export function NextBeneficiariesPlanInfo({
  nextBeneficiaries,
  planId,
  proceedPlan,
  proceedPlanLoading,
}: Props) {
  const [OrderText, AddSelectedText, GiveHimText] = useBaseTranslation(i18ns);

  const columns = usePlanShowColumns();

  const [popUpOpen, setPopUpOpen] = useState(false);

  return (
    <BCard sx={{ m: 1 }} animations={{ transitions: "slideInBottom" }}>
      <CardContent>
        <BTypography variant="h5" fontWeight={"bold"}>
          {OrderText}
        </BTypography>
      </CardContent>
      <CardContent
        sx={{
          display: "flex",
          gap: 1,
        }}
      >
        <BButton
          variant="contained"
          startIcon={<FaPeopleGroupIcon />}
          loading={proceedPlanLoading}
          onClick={proceedPlan}
        >
          {AddSelectedText}
        </BButton>
        <BButton
          variant="contained"
          startIcon={<MdAssignmentTurnedInIcon />}
          onClick={() => setPopUpOpen(true)}
          color="success"
        >
          {GiveHimText}
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
      <ReadQRPopup
        open={popUpOpen}
        close={() => setPopUpOpen(false)}
        planId={planId}
      />
    </BCard>
  );
}
