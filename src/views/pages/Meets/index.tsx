import { useEffect, useState } from "react";
import { Box, Stack, SvgIcon } from "@mui/material";
import {
  FaHandHoldingUsd as FaHandHoldingUsdIcon,
  FaRegAddressCard as FaRegAddressCardIcon,
  FaPrescriptionBottleAlt as FaPrescriptionBottleAltIcon,
  FaFileInvoiceDollar as FaFileInvoiceDollarIcon,
} from "react-icons/fa";
import { Inventory as InventoryIcon } from "@mui/icons-material";

import { Data, MeetsTimeline } from "./components";
import { useMeetData } from "./data";
import { BCard } from "src/components/Base";
import { useForm } from "react-hook-form";
import { useBaseTranslation } from "src/hooks";

type AcceptanceForm = {
  status?: boolean;
  reason?: string;
}[];

const i18ns = [
  "membership_requests",
  "emergency_assistance",
  "medical_prescriptions",
  "special_materials",
  "withdrawal_orders",
];
export function Meets() {
  const [
    MembershipRequestsText,
    EmergencyAssistanceText,
    MedicalPrescriptionsText,
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
      name: "medicalPrescriptions",
      label: MedicalPrescriptionsText,
      icon: (
        <SvgIcon>
          <FaPrescriptionBottleAltIcon />
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

  const { membershipRequests, isLoading } = useMeetData();

  const formInstance = useForm<AcceptanceForm>({
    defaultValues: [],
  });

  useEffect(() => {
    const isAllRequestsAccepted = membershipRequests.every(
      (request) => formInstance.getValues()[request.id!]?.status !== undefined
    );

    setSteps(
      steps.map((step) =>
        step.name === "membershipRequests"
          ? { ...step, isFinished: isAllRequestsAccepted }
          : { ...step }
      )
    );
  }, [formInstance.getValues()]);

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
          data={membershipRequests}
          dataType="BeneficiaryRequest"
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
