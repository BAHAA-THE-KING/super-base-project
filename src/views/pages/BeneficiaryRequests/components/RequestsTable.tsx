import { BDataGrid } from "src/components/Base";

import { useBeneficiaryRequestsColumns } from "../../Beneficiary/hooks";

import { Request } from "src/types/data/Request";

type Props = {
  requests: Request[];
};

export function RequestsTable({ requests }: Props) {
  const columns = useBeneficiaryRequestsColumns();

  return (
    <>
      <BDataGrid columns={columns} rows={requests} />
    </>
  );
}
