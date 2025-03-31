import { styled, Switch, SwitchProps } from "@mui/material";

export type BSwitchProps = SwitchProps;

export const BSwitch = styled(Switch)(({ theme, size }) => {
  const mediumStyles = {
    ".MuiSwitch-thumb": {
      width: "14px",
      height: "14px",
    },
    ".MuiSwitch-switchBase": {
      p: 1.5,
    },
    ".MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(20px)",
    },
    ".MuiSwitch-track": {
      padding: 0.5,
      borderRadius: "100px",
    },
  };

  const smallStyles = {
    ".MuiSwitch-thumb": {
      width: "10px",
      height: "10px",
    },
    ".MuiSwitch-switchBase": {
      p: 0.9,
    },
    ".MuiSwitch-track": {
      p: 0.5,
      borderRadius: "100px",
    },
  };

  return theme.unstable_sx({
    overflow: "visible",
    ...(size === "small" ? smallStyles : mediumStyles),
  });
});
