import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { Skeleton, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import { InformationPart, GeneralPart } from "./components";
import {
  FamilyInfo,
  PersonalInfo,
  SupportersInfo,
  GroupInfo,
  AvailableAids,
} from "./components/Tabs";

import { useBaseTranslation } from "src/hooks";
import { useBeneficiaryData } from "src/views/data";

import { SingleBeneficiary } from "src/types/data/SingleBeneficiary";

type Props = {
  createMode?: boolean;
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
export function ShowBeneficiary({
  requestMode = false,
  requestId = 0,
  createMode = false,
}: Props) {
  const [
    PersonalInfoText,
    FamilyInfoText,
    SupportersInfoText,
    GroupInfoText,
    AvailableAidsText,
    RequestsText,
  ] = useBaseTranslation(i18ns);

  const navigate = useNavigate();
  const params = useParams();
  const beneficiaryId = createMode
    ? 0
    : requestId
    ? requestId
    : params.beneficiaryId;
  const { hash } = useLocation();

  const {
    beneficiary,
    createBeneficiary,
    getBeneficiaryLoading,
    createBeneficiaryLoading,
  } = useBeneficiaryData(Number(beneficiaryId));

  const { control, handleSubmit, reset } = useForm<SingleBeneficiary>({
    defaultValues: {
      id: 0,
      image_url: "",
      first_name: "",
      last_name: "",
      father_name: "",
      mother_name: "",
      birth_date: "", // YYYY-MM-DD
      birth_place: "",
      national_number: "",
      gender: "",
      job: "",
      health_status: "",
      phone_number: "",
      mobile_number: "",
      address: "",
      residence_type: "",
      residence_document_url: [],
      children: [],
      uncles: [],
      partner: {
        first_name: "",
        last_name: "",
        job: "",
        gender: "",
        health_status: "",
      },
      monthly_income: 0,
      case_description: "",
      request_id: 0,
      request_status: "pending",
    },
  });

  useEffect(() => {
    if (beneficiary) {
      reset(beneficiary);
    }
  }, [beneficiary]);

  const tabs = useMemo(
    () =>
      [
        {
          name: "personal",
          label: PersonalInfoText,
          element: <PersonalInfo control={control} isEditable={createMode} />,
          color: "primary",
        },
        {
          name: "family",
          label: FamilyInfoText,
          element: <FamilyInfo control={control} isEditable={createMode} />,
          color: "primary",
        },
        {
          name: "supporters",
          label: SupportersInfoText,
          element: <SupportersInfo control={control} isEditable={createMode} />,
          color: "primary",
        },
        createMode
          ? null
          : {
              name: "group",
              label: GroupInfoText,
              element: (
                <GroupInfo control={control} requestMode={requestMode} />
              ),
              color: "secondary",
            },
        createMode || requestMode
          ? null
          : beneficiary
          ? {
              name: "aids",
              label: AvailableAidsText,
              element: (
                <AvailableAids beneficiary_id={beneficiary.id as number} />
              ),
            }
          : null,
        createMode || requestMode
          ? null
          : beneficiary
          ? {
              name: "requests",
              label: RequestsText,
              external: true,
              link: `/beneficiary/${beneficiary.id}/requests`,
            }
          : null,
      ].filter((e) => e !== null),
    [requestMode, createMode, beneficiary]
  );

  const [currentTab, setCurrentTab] = useState(
    tabs.findIndex((e) => e.name === hash.slice(1)) === -1
      ? 0
      : tabs.findIndex((e) => e.name === hash.slice(1))
  );

  const onSubmit = handleSubmit(
    async (data) => {
      await createBeneficiary(data);
    },
    () => {}
  );

  return (
    <Stack direction={"row"} height={"100%"} mb={2}>
      {getBeneficiaryLoading && !createMode ? (
        <Stack width={"100%"} flexDirection={"row"} gap={5}>
          <Stack width={"100%"} alignItems={"center"} gap={2} flex={1}>
            <Skeleton width={250} height={250} variant="rounded" />
            <Skeleton width={"100%"} height={25} variant="rounded" />
            <Skeleton width={"100%"} height={25} variant="rounded" />
            <Skeleton width={"100%"} height={25} variant="rounded" />
            <Skeleton width={"100%"} height={25} variant="rounded" />
          </Stack>
          <Stack width={"100%"} alignItems={"stretch"} gap={2} flex={5}>
            {new Array(10).fill(null).map((_, i) => (
              <Stack flexDirection={"row"} gap={5} key={i}>
                <Skeleton width={"100%"} height={25} variant="rounded" />
                <Skeleton width={"100%"} height={25} variant="rounded" />
                <Skeleton width={"100%"} height={25} variant="rounded" />
              </Stack>
            ))}
          </Stack>
        </Stack>
      ) : (
        (beneficiary || createMode) && (
          <>
            <GeneralPart
              control={control}
              tabs={tabs}
              currentTab={currentTab}
              setCurrentTab={(newTab) => {
                navigate("#" + tabs[newTab].name, { replace: true });
                setCurrentTab(newTab);
              }}
              requestMode={requestMode}
              createMode={createMode}
              handleSubmit={onSubmit}
              createBeneficiaryLoading={createBeneficiaryLoading}
            />
            <InformationPart
              element={tabs[currentTab].element}
              color={
                tabs[currentTab].color as "primary" | "secondary" | undefined
              }
            />
          </>
        )
      )}
    </Stack>
  );
}
