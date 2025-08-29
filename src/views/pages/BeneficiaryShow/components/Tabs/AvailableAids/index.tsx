import { useState } from "react";

import { BDataGrid } from "src/components/Base";
import { ReadQRPopup } from "../..";

import { useAvailableAidsColumns } from "../../../hooks";
import { useAvailableAidsData } from "src/views/data";

import { AvailableAid } from "src/types/data/AvailableAid";

type Props = {
  beneficiary_id: number;
};

export function AvailableAids({ beneficiary_id }: Props) {
  const {
    aids,
    getAidsLoading,
    items,
    getItemsLoading,
    deliverAid,
    deliverAidLoading,
  } = useAvailableAidsData(beneficiary_id);

  const [popUpData, setPopUpData] = useState<AvailableAid | null>(null);

  const columns = useAvailableAidsColumns((aid: AvailableAid) => {
    setPopUpData(aid);
  });

  return (
    <>
      <BDataGrid columns={columns} rows={aids} loading={getAidsLoading} />
      <ReadQRPopup
        open={Boolean(popUpData)}
        close={() => setPopUpData(null)}
        data={popUpData}
        items={items}
        deliverAid={deliverAid}
        deliverAidLoading={deliverAidLoading}
      />
    </>
  );
}
