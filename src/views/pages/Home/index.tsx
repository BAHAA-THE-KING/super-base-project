import { BaseButton } from "src/components/Base/BaseButton";

export const Home = ({ Component }: { Component: React.FC }) => {
  return (
    <>
      <BaseButton
        variant="contained"
        color={"error"}
        startIcon={<Component />}
        animations={["faceInOnce", "scaleGesture"]}
      >
        click me
      </BaseButton>
    </>
  );
};
