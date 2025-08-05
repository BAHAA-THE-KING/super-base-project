import { ReactElement, useEffect, useState } from "react";
import { Skeleton, Stack, SvgIcon } from "@mui/material";
import { useForm } from "react-hook-form";

import {
  FaHandHoldingUsd as FaHandHoldingUsdIcon,
  FaRegAddressCard as FaRegAddressCardIcon,
  FaFileInvoiceDollar as FaFileInvoiceDollarIcon,
} from "react-icons/fa";
import { Inventory as InventoryIcon } from "@mui/icons-material";

import { BCard } from "src/components/Base";
import { Data, MeetsTimeline } from "./components";

import { useBaseTranslation } from "src/hooks";
import {
  useMeetData,
  BeneficiaryRequest,
  EmergencyAssistanceRequest,
  SpecialMaterialRequest,
  WithdrawalOrderRequest,
} from "src/views/data";

type AcceptanceForm = {
  BeneficiaryRequest: {
    requestId: number;
    status: "accepted" | "rejected" | "";
    reason: string;
  }[];
  EmergencyAssistanceRequest: {
    requestId: number;
    status: "accepted" | "rejected" | "";
    reason: string;
  }[];
  SpecialMaterialRequest: {
    requestId: number;
    status: "accepted" | "rejected" | "";
    reason: string;
  }[];
  WithdrawalOrderRequest: {
    requestId: number;
    status: "accepted" | "rejected" | "";
    reason: string;
  }[];
  none: any[];
};

const i18ns = [
  "membership_requests",
  "emergency_assistance",
  "special_materials",
  "withdrawal_orders",
];

export function Meets() {
  const [
    MembershipRequestsText,
    EmergencyAssistanceText,
    SpecialMaterialsText,
    WithdrawalOrdersText,
  ] = useBaseTranslation(i18ns);

  const [meetId, setMeetId] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    membershipRequests,
    emergencyAssistanceRequests,
    specialMaterialRequests,
    withdrawalOrderRequests,
    isLoading,
    createMeet,
    pendingMeets,
    submitMeet,
    submitMeetLoading,
  } = useMeetData(meetId);

  const [steps, setSteps] = useState<
    {
      name:
        | "membershipRequests"
        | "emergencyAssistance"
        | "specialMaterials"
        | "withdrawalOrders";
      label: string;
      icon: ReactElement;
      isFinished: boolean;
      dataType:
        | "BeneficiaryRequest"
        | "EmergencyAssistanceRequest"
        | "SpecialMaterialRequest"
        | "WithdrawalOrderRequest";
      data:
        | Partial<BeneficiaryRequest>[]
        | Partial<EmergencyAssistanceRequest>[]
        | Partial<SpecialMaterialRequest>[]
        | Partial<WithdrawalOrderRequest>[];
    }[]
  >([
    {
      name: "membershipRequests",
      label: MembershipRequestsText,
      icon: (
        <SvgIcon>
          <FaRegAddressCardIcon />
        </SvgIcon>
      ),
      isFinished: false,
      dataType: "BeneficiaryRequest",
      data: membershipRequests,
    },
    {
      name: "emergencyAssistance",
      label: EmergencyAssistanceText,
      icon: (
        <SvgIcon>
          <FaHandHoldingUsdIcon />
        </SvgIcon>
      ),
      isFinished: false,
      dataType: "EmergencyAssistanceRequest",
      data: emergencyAssistanceRequests,
    },
    {
      name: "specialMaterials",
      label: SpecialMaterialsText,
      icon: <InventoryIcon />,
      isFinished: false,
      dataType: "SpecialMaterialRequest",
      data: specialMaterialRequests,
    },
    {
      name: "withdrawalOrders",
      label: WithdrawalOrdersText,
      icon: (
        <SvgIcon>
          <FaFileInvoiceDollarIcon />
        </SvgIcon>
      ),
      isFinished: false,
      dataType: "WithdrawalOrderRequest",
      data: withdrawalOrderRequests,
    },
  ]);

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  useEffect(() => {
    if (meetId !== 0) return;
    if (!pendingMeets) return;
    if (pendingMeets.length === 0) {
      createMeet({
        name: new Date().toLocaleDateString("en-ZA"),
        date: new Date().toLocaleDateString("en-ZA"),
      }).then((res) => setMeetId(res.data.id));
    } else {
      setMeetId(pendingMeets[0].id);
    }
  }, [pendingMeets]);

  const formInstance = useForm<AcceptanceForm>({
    defaultValues: {
      BeneficiaryRequest: [],
      EmergencyAssistanceRequest: [],
      SpecialMaterialRequest: [],
      WithdrawalOrderRequest: [],
    },
  });

  useEffect(() => {
    if (
      membershipRequests &&
      emergencyAssistanceRequests &&
      specialMaterialRequests &&
      withdrawalOrderRequests
    ) {
      formInstance.reset({
        BeneficiaryRequest: membershipRequests.map((e) => ({
          requestId: Number(e.request_id),
          status: "",
          reason: "",
        })),
        EmergencyAssistanceRequest: emergencyAssistanceRequests.map((e) => ({
          requestId: Number(e.id),
          status: "",
          reason: "",
        })),
        SpecialMaterialRequest: specialMaterialRequests.map((e) => ({
          requestId: Number(e.id),
          status: "",
          reason: "",
        })),
        WithdrawalOrderRequest: withdrawalOrderRequests.map((e) => ({
          requestId: Number(e.id),
          status: "",
          reason: "",
        })),
      });
      setSteps([
        {
          ...steps[0],
          data: membershipRequests,
        },
        {
          ...steps[1],
          data: emergencyAssistanceRequests,
        },
        {
          ...steps[2],
          data: specialMaterialRequests,
        },
        {
          ...steps[3],
          data: withdrawalOrderRequests,
        },
      ]);
    }
  }, [
    membershipRequests,
    emergencyAssistanceRequests,
    specialMaterialRequests,
    withdrawalOrderRequests,
  ]);

  // Get current step data based on active step
  const getCurrentStepData = () => {
    switch (activeStep) {
      case 0: // membershipRequests
      case 1: // emergencyAssistance
      case 2: // specialMaterials
      case 3: // withdrawalOrders
        return {
          data: steps[activeStep].data,
          dataType: steps[activeStep].dataType,
        };

      default:
        if (!isSubmitted) {
          setIsSubmitted(true);
          formInstance.handleSubmit((data) => {
            submitMeet({
              meetId,
              requests: data.BeneficiaryRequest.map((e) => ({
                request_id: e.requestId,
                status: e.status as "accepted" | "rejected",
                reason: e.reason,
              }))
                .concat(
                  data.EmergencyAssistanceRequest.map((e) => ({
                    request_id: e.requestId,
                    status: e.status as "accepted" | "rejected",
                    reason: e.reason,
                  }))
                )
                .concat(
                  data.SpecialMaterialRequest.map((e) => ({
                    request_id: e.requestId,
                    status: e.status as "accepted" | "rejected",
                    reason: e.reason,
                  }))
                )
                .concat(
                  data.WithdrawalOrderRequest.map((e) => ({
                    request_id: e.requestId,
                    status: e.status as "accepted" | "rejected",
                    reason: e.reason,
                  }))
                ),
            }).catch(() => setIsSubmitted(false));
          })();
          setActiveStep(activeStep - 1);
        }
        return {
          data: steps[activeStep - 1].data,
          dataType: steps[activeStep - 1].dataType,
        };
      // Some popup summery
    }
  };

  const currentStepData = getCurrentStepData();

  useEffect(() => {
    setSteps(
      steps.map((step) => ({
        ...step,
        isFinished: formInstance
          .getValues(step.dataType)
          .every((req) => Boolean(req.status)),
      }))
    );
  }, [JSON.stringify(formInstance.watch())]);

  if (isLoading) {
    return (
      <Stack width={"100%"} alignItems={"stretch"} gap={2} flex={5}>
        <Stack flexDirection={"row"} gap={2}>
          <Stack width={"100%"} gap={2} pt={10}>
            <Skeleton width={"100%"} height={150} variant="rounded" />
            <Skeleton width={"100%"} height={150} variant="rounded" />
            <Skeleton width={"100%"} height={150} variant="rounded" />
          </Stack>
          <Skeleton width={"20%"} height={500} variant="rounded" />
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack
      width={"100%"}
      overflow={"auto"}
      direction={"row"}
      spacing={2}
      mb={1}
    >
      <Stack direction={"column"} spacing={2} flex={5}>
        <Data
          data={currentStepData.data}
          dataType={
            currentStepData.dataType as
              | "BeneficiaryRequest"
              | "EmergencyAssistanceRequest"
              | "SpecialMaterialRequest"
              | "WithdrawalOrderRequest"
          }
          formInstance={formInstance}
        />
      </Stack>
      <BCard
        sx={{
          boxShadow: "none",
          flex: 1,
          ml: "0 !important",
          top: 0,
          height: "fit-content",
        }}
      >
        <MeetsTimeline
          steps={steps}
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          submitMeetLoading={submitMeetLoading}
        />
      </BCard>
    </Stack>
  );
}
