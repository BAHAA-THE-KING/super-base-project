import { Stack } from "@mui/material";
import { useNavigate } from "react-router";

import { Add as AddIcon } from "@mui/icons-material";

import { BButton, BDataGrid } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";
import { useDoctorsColumns } from "./columns";
import { useDoctorsData } from "./data";

const i18ns = ["add_new_doctor"];
export function Doctors() {
  const [AddNewDoctorText] = useBaseTranslation(i18ns);

  const navigate = useNavigate();

  const onEdit = (id: number) => {
    navigate(id.toString());
  };
  const columns = useDoctorsColumns(onEdit);

  const { doctors } = useDoctorsData();

  function addDoctor() {
    navigate("add");
  }

  return (
    <Stack width="100%" height="100%" p={3}>
      <BButton
        variant="contained"
        size="medium"
        color="primary"
        sx={{ my: 2, width: "max-content" }}
        onClick={addDoctor}
      >
        <AddIcon />
        {AddNewDoctorText}
      </BButton>
      <BDataGrid columns={columns} rows={doctors} />
    </Stack>
  );
}
