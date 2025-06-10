import { useState } from "react";
import { Box, Stack, SvgIcon } from "@mui/material";
import {
  FaHandHoldingUsd as FaHandHoldingUsdIcon,
  FaRegAddressCard as FaRegAddressCardIcon,
  FaPrescriptionBottleAlt as FaPrescriptionBottleAltIcon,
  FaFileInvoiceDollar as FaFileInvoiceDollarIcon,
} from "react-icons/fa";
import { Inventory as InventoryIcon } from "@mui/icons-material";

import { MeetsTimeline } from "./components";

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

  return (
    <Stack width={"100%"} height={"100%"} direction={"row"} spacing={2}>
      <Stack direction={"column"} spacing={2} bgcolor={"blue"} flex={6}></Stack>
      <Box height={"100%"} flex={1} ml={"0 !important"}>
        <MeetsTimeline
          steps={steps}
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      </Box>
    </Stack>
  );
}
