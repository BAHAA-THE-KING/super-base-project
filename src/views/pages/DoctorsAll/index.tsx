import { useState } from "react";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router";

import { Add as AddIcon } from "@mui/icons-material";

import { BButton } from "src/components/Base";
import { DoctorsGrid } from "./components";

import { useBaseTranslation } from "src/hooks";
import { useDoctorsColumns } from "./columns";
import { useDoctorsAllData } from "src/views/data";

const i18ns = ["add_new_doctor"];
export function Doctors() {
  const [AddNewDoctorText] = useBaseTranslation(i18ns);

  const navigate = useNavigate();

  const onEdit = (id: number) => {
    navigate(id.toString(), { replace: true });
  };
  const columns = useDoctorsColumns(onEdit);

  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<
    {
      id: string | number;
      field: string;
      operator: string;
      value: string | number;
    }[]
  >([]);

  const params = [
    ...filters,
    { id: "page", field: "page", operator: "=", value: page + 1 },
  ].reduce((p, e) => ({ ...p, [e.field]: e.value }), {});

  const { doctors, getDoctorsLoading, totalRows } = useDoctorsAllData(params);

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
      <DoctorsGrid
        columns={columns}
        rows={doctors}
        loading={getDoctorsLoading}
        totalRows={totalRows}
        page={page}
        setPage={setPage}
        filters={filters}
        setFilters={setFilters}
      />
    </Stack>
  );
}
