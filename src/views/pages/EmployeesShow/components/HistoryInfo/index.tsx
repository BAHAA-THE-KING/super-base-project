import { useState } from "react";
import { CardContent } from "@mui/material";

import { Add as AddIcon } from "@mui/icons-material";

import { BButton, BCard, BDataGrid, BTypography } from "src/components/Base";
import { TaskPopup } from "..";    

import { useBaseTranslation } from "src/hooks";
import { useHistoryColumns } from "../../hooks";

import { EmployeeHistory, Employee } from "src/types/data/Employee";

type Props = {
  employee: Employee;
};

const i18ns = ["history", "add_new_task"];
export function HistoryInfo({ employee }: Props) {
  const [HistoryText, AddNewTaskText] = useBaseTranslation(i18ns);

  const columns = useHistoryColumns();

  const [popupOpen, setPopupOpen] = useState(false);

  const history: EmployeeHistory[] = employee.history ?? [];

  return (
    <BCard sx={{ m: 1 }} animations={{ transitions: "slideInBottom" }}>
      <CardContent>
        <BTypography variant="h5" fontWeight={"bold"}>
          {HistoryText}
        </BTypography>
      </CardContent>
      <CardContent>
        <BButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setPopupOpen(true)}
        >
          {AddNewTaskText}
        </BButton>
        <TaskPopup
          open={popupOpen}
          close={() => setPopupOpen(false)}
          employee={employee}
        />
      </CardContent>
      <CardContent>
        <BDataGrid columns={columns} rows={history} checkboxSelection />
      </CardContent>
    </BCard>
  );
}
