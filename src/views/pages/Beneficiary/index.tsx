import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { Box } from "@mui/material";

import { DownPart, UpPart } from "./components";
import { FamilyInfo, PersonalInfo, SupportersInfo } from "./components/Tabs";

import { useBaseTranslation } from "src/hooks";

import { useData } from "./data";

const i18ns = [
  "personal_info",
  "family_info",
  "supporters_info",
  "group_info",
  "available_aids",
  "requests",
];
export function ShowBeneficiaries() {
  const [
    PersonalInfoText,
    FamilyInfoText,
    SupportersInfoText,
    GroupInfoText,
    AvailableAidsText,
    RequestsText,
  ] = useBaseTranslation(i18ns);
  const { beneficiaryId } = useParams();
  const { hash } = useLocation();
  const navigate = useNavigate();
  const beneficiary = useData(Number(beneficiaryId));

  const tabs = useMemo(
    () => [
      {
        name: "personal",
        label: PersonalInfoText,
        element: <PersonalInfo beneficiary={beneficiary} />,
      },
      {
        name: "family",
        label: FamilyInfoText,
        element: <FamilyInfo beneficiary={beneficiary} />,
      },
      {
        name: "supporters",
        label: SupportersInfoText,
        element: <SupportersInfo beneficiary={beneficiary} />,
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

  const [currentTab, setCurrentTab] = useState(
    tabs.findIndex((e) => e.name === hash.slice(1)) === -1
      ? 0
      : tabs.findIndex((e) => e.name === hash.slice(1))
  );

  return (
    <Box>
      <UpPart
        name={beneficiary.first_name + " " + beneficiary.last_name}
        group_name={beneficiary.group.name}
        group_color={beneficiary.group.color}
        image_url={beneficiary.image_url}
        tabs={tabs}
        currentTab={currentTab}
        setCurrentTab={(newTab) => {
          navigate("#" + tabs[newTab].name, { replace: true });
          setCurrentTab(newTab);
        }}
      />
      <DownPart element={tabs[currentTab].element} />
    </Box>
  );
}
