import { Box, Stepper, Step, StepLabel, SvgIcon } from "@mui/material";
import { FaCheck as FaCheckIcon } from "react-icons/fa";

import { BButton } from "src/components/Base";
import { useBaseTranslation } from "src/hooks";

const i18ns = ["next", "back", "finish_meet"];
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
  const [NextText, BackText, FinishMeetText] = useBaseTranslation(i18ns);

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
          {activeStep === steps.length - 1 ? FinishMeetText : NextText}
        </BButton>
        <BButton disabled={activeStep === 0} onClick={handleBack}>
          {BackText}
        </BButton>
      </Box>
    </Box>
  );
}

export { MeetsTimeline };
