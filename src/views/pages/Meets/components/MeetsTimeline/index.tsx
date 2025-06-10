import { Box, Stepper, Step, StepLabel, SvgIcon } from "@mui/material";
import { FaCheck as FaCheckIcon } from "react-icons/fa";

import { BButton } from "src/components/Base";

function MeetsTimeline({
  steps,
  activeStep,
  handleNext,
  handleBack,
}: {
  steps: any[];
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
}) {
  return (
    <Box dir="ltr">
      <Stepper activeStep={activeStep} orientation="vertical" sx={{ p: 3 }}>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel
              icon={
                <Box
                  bgcolor={"primary.main"}
                  sx={{
                    borderRadius: "50%",
                    p: 1,
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  {step.isFinished ? (
                    <SvgIcon>
                      <FaCheckIcon />
                    </SvgIcon>
                  ) : (
                    step.icon
                  )}
                </Box>
              }
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        gap={1}
        p={1}
      >
        <BButton
          variant="contained"
          disabled={activeStep === steps.length}
          onClick={handleNext}
        >
          Next
        </BButton>
        <BButton disabled={activeStep === 0} onClick={handleBack}>
          Back
        </BButton>
      </Box>
    </Box>
  );
}

export { MeetsTimeline };
