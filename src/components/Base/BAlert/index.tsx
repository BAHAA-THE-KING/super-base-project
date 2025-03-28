import { Alert, AlertProps, styled } from "@mui/material";

import {
  CheckCircleTwoTone as CheckCircleTwoToneIcon,
  WarningTwoTone as WarningTwoToneIcon,
  InfoTwoTone as InfoTwoToneIcon,
  NewReleasesTwoTone as NewReleasesTwoToneIcon,
} from "@mui/icons-material";

import { useAnimation } from "src/animations/hooks";

import { PropsWithAnimations } from "src/animations/types/PropsWithAnimations";

export type BAlertProps = PropsWithAnimations<AlertProps>;

const StyledAlert = styled(Alert)<BAlertProps>(() => ({}));

export const BAlert = ({ animations, ...props }: BAlertProps) => {
  const animationsProps = useAnimation(animations);
  return (
    <StyledAlert
      iconMapping={{
        info: <InfoTwoToneIcon />,
        success: <CheckCircleTwoToneIcon />,
        warning: <WarningTwoToneIcon />,
        error: <NewReleasesTwoToneIcon />,
      }}
      {...props}
      {...animationsProps}
    />
  );
};
