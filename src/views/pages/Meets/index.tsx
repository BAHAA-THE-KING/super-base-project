import { useState } from "react";
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

export function Meets() {
  const [steps, setSteps] = useState([
    {
      label: "طلبات الانتساب",
      icon: (
        <SvgIcon>
          <FaRegAddressCardIcon />
        </SvgIcon>
      ),
      isFinished: false,
    },
    {
      label: "المساعدات الفورية",
      icon: (
        <SvgIcon>
          <FaHandHoldingUsdIcon />
        </SvgIcon>
      ),
      isFinished: false,
    },
    {
      label: "الوصفات الطبية",
      icon: (
        <SvgIcon>
          <FaPrescriptionBottleAltIcon />
        </SvgIcon>
      ),
      isFinished: false,
    },
    {
      label: "المواد الخاصة",
      icon: <InventoryIcon />,
      isFinished: false,
    },
    {
      label: "أوامر الصرف",
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

  return (
    <Stack
      width={"100%"}
      maxHeight={"850px"}
      overflow={"auto"}
      direction={"row"}
      spacing={2}
      mb={1}
    >
      <Stack direction={"column"} spacing={2} flex={5}>
        <Data data={membershipRequests} dataType="BeneficiaryRequest"/>
      </Stack>
      <BCard
        sx={{
          boxShadow: "none",
          flex: 1,
          ml: "0 !important",
          position: "sticky",
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
