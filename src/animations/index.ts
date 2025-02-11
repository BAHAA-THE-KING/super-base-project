import { bounceProps } from "./Gestures/Bounce";
import { faceInOnceProps } from "./Transitions/FadeInOnce";
import { popInProps } from "./Transitions/PopIn";
import { rotateProps } from "./Gestures/Rotate";
import { scaleProps } from "./Gestures/Scale";
import { shakeProps } from "./Transitions/Shake";
import { slideInBottomProps } from "./Transitions/SlideInBottom";
import { slideInLeftProps } from "./Transitions/SlideInLeft";
import { slideInRightProps } from "./Transitions/SlideInRight";
import { wiggleProps } from "./Gestures/Wiggle";

export default {
  gestures: {
    bounce: bounceProps,
    rotate: rotateProps,
    scale: scaleProps,
    wiggle: wiggleProps,
  },
  transitions: {
    faceInOnce: faceInOnceProps,
    popIn: popInProps,
    shake: shakeProps,
    slideInBottom: slideInBottomProps,
    slideInLeft: slideInLeftProps,
    slideInRight: slideInRightProps,
  },
};
