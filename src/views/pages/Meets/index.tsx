import { useEffect, useState } from "react";
import { Stack, SvgIcon } from "@mui/material";
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
import { useMeetData } from "./data";

type AcceptanceForm = {
  status?: boolean;
  reason?: string;
}[];

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

  const [steps, setSteps] = useState([
    {
      name: "membershipRequests",
      label: MembershipRequestsText,
      icon: (
        <SvgIcon>
          <FaRegAddressCardIcon />
        </SvgIcon>
      ),
      isFinished: false,
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
    },
    {
      name: "specialMaterials",
      label: SpecialMaterialsText,
      icon: <InventoryIcon />,
      isFinished: false,
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
    },
  ]);

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const {
    membershipRequests,
    emergencyAssistanceRequests,
    specialMaterialRequests,
    withdrawalOrderRequests,
    isLoading,
  } = useMeetData();

  const formInstance = useForm<AcceptanceForm>({
    defaultValues: [],
  });

  // Get current step data based on active step
  const getCurrentStepData = () => {
    switch (activeStep) {
      case 0: // membershipRequests
        return {
          data: membershipRequests,
          dataType: "BeneficiaryRequest" as const,
        };
      case 1: // emergencyAssistance
        return {
          data: emergencyAssistanceRequests,
          dataType: "EmergencyAssistanceRequest" as const,
        };
      case 2: // specialMaterials
        return {
          data: specialMaterialRequests,
          dataType: "SpecialMaterialRequest" as const,
        };
      case 3: // withdrawalOrders
        return {
          data: withdrawalOrderRequests,
          dataType: "WithdrawalOrderRequest" as const,
        };
      default:
        throw new Error("unknown step");
    }
  };

  const currentStepData = getCurrentStepData();

  useEffect(() => {
    const isAllRequestsAccepted = currentStepData.data.every(
      (request) => formInstance.getValues()[request.id!]?.status !== undefined
    );

    setSteps(
      steps.map((step, index) =>
        index === activeStep
          ? { ...step, isFinished: isAllRequestsAccepted }
          : { ...step }
      )
    );
  }, [JSON.stringify(formInstance.getValues()), activeStep]);

  if (isLoading) {
    return <div>Loading...</div>;
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
          dataType={currentStepData.dataType}
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
        />
      </BCard>
    </Stack>
  );
}
