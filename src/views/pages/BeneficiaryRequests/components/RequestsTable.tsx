import { GridColDef } from "@mui/x-data-grid";
import { BDataGrid } from "src/components/Base";

import { Request } from "src/types/data/Request";

type Props = {
  requests: Request[];
  columns: GridColDef[];
  loading: boolean;
};

export function RequestsTable({ requests, columns, loading }: Props) {
  return <BDataGrid columns={columns} rows={requests} loading={loading} />;
}
