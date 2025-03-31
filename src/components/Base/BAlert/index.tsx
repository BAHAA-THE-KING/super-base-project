import { Alert, AlertProps, styled } from "@mui/material";

import {
  CheckCircleTwoTone as CheckCircleTwoToneIcon,
  WarningTwoTone as WarningTwoToneIcon,
  InfoTwoTone as InfoTwoToneIcon,
  NewReleasesTwoTone as NewReleasesTwoToneIcon,
} from "@mui/icons-material";

import { useAnimation } from "src/animations/hooks";

import { PropsWithAnimations } from "src/animations/types/PropsWithAnimations";

import { varAlpha } from "src/themes/styles";

export type BAlertProps = PropsWithAnimations<AlertProps>;

const StyledAlert = styled(Alert)<BAlertProps>(({ theme, variant, color }) => {
  const filledStyles = {
    color: theme.palette[color ?? "error"].contrastText,
  };
  const standardStyles = {
    backgroundColor: theme.palette[color ?? "error"].lighter,
  };
  const outlinedStyles = {
    backgroundColor: varAlpha(
      theme.palette[color ?? "error"]["mainChannel"],
      0.08
    ),
    borderColor: varAlpha(theme.palette[color ?? "error"]["mainChannel"], 0.16),
    color: theme.palette[color ?? "error"].dark,
  };

  return theme.unstable_sx({
    ...(variant === "filled"
      ? filledStyles
      : variant === "outlined"
      ? outlinedStyles
      : standardStyles),
  });
});

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
