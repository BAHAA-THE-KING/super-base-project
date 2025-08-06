import { CardContent } from "@mui/material";

import { BButton, BCard, BDataGrid, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";
import { usePlanShowColumns } from "../../hooks";

import { ShowPlanBeneficiary } from "src/views/data";

type Props = {
  nextBeneficiaries: ShowPlanBeneficiary[];
};

const i18ns = ["order", "add_selected"];
export function NextBeneficiariesPlanInfo({ nextBeneficiaries }: Props) {
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
        <BButton variant="contained">{AddSelectedText}</BButton>
      </CardContent>
      <CardContent>
        <BDataGrid
          columns={columns}
          rows={nextBeneficiaries}
          checkboxSelection
        />
      </CardContent>
    </BCard>
  );
}
