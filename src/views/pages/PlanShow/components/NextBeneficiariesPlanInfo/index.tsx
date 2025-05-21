import { Card, CardContent } from "@mui/material";

import { BButton, BDataGrid, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";
import { usePlanShowColumns } from "../../hooks";

import { PlanBeneficiary } from "src/views/pages/Plans/data";

type Props = {
  nextBeneficiaries: PlanBeneficiary[];
};

const i18ns = ["order", "add_selected"];
export function NextBeneficiariesPlanInfo({ nextBeneficiaries }: Props) {
  const [OrderText, AddSelectedText] = useBaseTranslation(i18ns);

  const columns = usePlanShowColumns();

  return (
    <Card sx={{ m: 1, P: 1 }}>
      <CardContent>
        <BTypography variant="h5" fontWeight={"bold"}>
          {OrderText}
        </BTypography>
      </CardContent>
      <CardContent>
        <BButton variant="contained">{AddSelectedText}</BButton>
      </CardContent>
      <CardContent>
        <BDataGrid
          columns={columns}
          rows={nextBeneficiaries}
          checkboxSelection
        />
      </CardContent>
    </Card>
  );
}
