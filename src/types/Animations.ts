import animationsProps from "src/animations";
export type Animations = {
  transitions?: keyof (typeof animationsProps)["transitions"];
  gestures?: keyof (typeof animationsProps)["gestures"];
};
