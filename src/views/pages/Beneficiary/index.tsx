import { useMemo, useState } from "react";
import { useParams } from "react-router";
import { Box } from "@mui/material";

import { DownPart, UpPart } from "./components";

import { useBaseTranslation } from "src/hooks";

import { useData } from "./data";

const i18ns = [
  "family_info",
  "supporters_info",
  "group_info",
  "available_aids",
  "requests",
];
export function ShowBeneficiaries() {
  const [
    FamilyInfoText,
    SupportersInfoText,
    GroupInfoText,
    AvailableAidsText,
    RequestsText,
  ] = useBaseTranslation(i18ns);
  const { beneficiaryId } = useParams();
  const beneficiary = useData(Number(beneficiaryId));

  const tabs = useMemo(
    () => [
      {
        name: "family",
        label: FamilyInfoText,
        element: <></>,
      },
      {
        name: "supporters",
        label: SupportersInfoText,
        element: <></>,
      },
      {
        name: "group",
        label: GroupInfoText,
        element: <></>,
      },
      {
        name: "aids",
        label: AvailableAidsText,
        element: <></>,
      },
      {
        name: "requests",
        label: RequestsText,
        element: <></>,
      },
    ],
    []
  );

  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Box>
      <UpPart
        name={beneficiary.first_name + " " + beneficiary.last_name}
        group_name={beneficiary.group.name}
        group_color={beneficiary.group.color}
        image_url={beneficiary.image_url}
        tabs={tabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <DownPart />
    </Box>
  );
}
