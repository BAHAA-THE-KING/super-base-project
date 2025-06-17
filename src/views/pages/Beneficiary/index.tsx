import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { Stack } from "@mui/material";

import { InformationPart, GeneralPart } from "./components";
import {
  FamilyInfo,
  PersonalInfo,
  SupportersInfo,
  GroupInfo,
  AvailableAids,
} from "./components/Tabs";

import { useBaseTranslation } from "src/hooks";

import { useData } from "./data";

type Props = {
  requestMode?: boolean;
  requestId?: number;
};

const i18ns = [
  "personal_info",
  "family_info",
  "supporters_info",
  "group_info",
  "available_aids",
  "requests",
];
export function ShowBeneficiary({ requestMode = false, requestId = 0 }: Props) {
  const [
    PersonalInfoText,
    FamilyInfoText,
    SupportersInfoText,
    GroupInfoText,
    AvailableAidsText,
    RequestsText,
  ] = useBaseTranslation(i18ns);
  const beneficiaryId = requestId ? requestId : useParams().beneficiaryId;
  const { hash } = useLocation();
  const navigate = useNavigate();
  const beneficiary = useData(Number(beneficiaryId));

  const tabs = useMemo(
    () =>
      [
        {
          name: "personal",
          label: PersonalInfoText,
          element: <PersonalInfo beneficiary={beneficiary} />,
          color: "primary",
        },
        {
          name: "family",
          label: FamilyInfoText,
          element: <FamilyInfo beneficiary={beneficiary} />,
          color: "primary",
        },
        {
          name: "supporters",
          label: SupportersInfoText,
          element: <SupportersInfo beneficiary={beneficiary} />,
          color: "primary",
        },
        requestMode
          ? null
          : {
              name: "group",
              label: GroupInfoText,
              element: <GroupInfo beneficiary={beneficiary} />,
              color: "secondary",
            },
        requestMode
          ? null
          : {
              name: "aids",
              label: AvailableAidsText,
              element: <AvailableAids beneficiary_id={beneficiary.id} />,
            },
        requestMode
          ? null
          : {
              name: "requests",
              label: RequestsText,
              external: true,
              link: `/beneficiary/${beneficiary.id}/requests`,
            },
      ].filter((e) => e !== null),
    [requestMode]
  );

  const [currentTab, setCurrentTab] = useState(
    tabs.findIndex((e) => e.name === hash.slice(1)) === -1
      ? 0
      : tabs.findIndex((e) => e.name === hash.slice(1))
  );

  return (
    <Stack direction={"row"} height={"100%"} mb={2}>
      <GeneralPart
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
        requestMode={requestMode}
      />
      <InformationPart
        element={tabs[currentTab].element}
        color={tabs[currentTab].color as "primary" | "secondary" | undefined}
      />
    </Stack>
  );
}
