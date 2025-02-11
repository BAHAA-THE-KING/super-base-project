import { BaseButton } from "src/components/Base";

export const Home = ({ Component }: { Component: React.FC }) => {
  return (
    <>
      <BaseButton
        variant="contained"
        color={"error"}
        startIcon={<Component />}
        animations={{
          gestures: "wiggle",
        }}
      >
        click me
      </BaseButton>
    </>
  );
};
