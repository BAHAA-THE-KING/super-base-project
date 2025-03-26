import { IconButton, IconButtonProps, styled } from "@mui/material";

const StyledIconButton = styled(IconButton)(({ theme, disabled }) => ({
  mx: 1,
  border: `${
    disabled ? "rgba(255, 255, 255, 0.3)" : theme.palette.primary.main
  } solid 1px`,
  margin: theme.spacing(1),
}));

type Props = Omit<IconButtonProps, "color" | "centerRipple">;

export const BaseIconButton = (props: Props) => {
  return <StyledIconButton {...props} color="primary" centerRipple />;
};
