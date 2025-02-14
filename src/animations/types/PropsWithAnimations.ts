import { Animations } from "src/types/Animations";

export type PropsWithAnimations<T> = T & {
  animations?: Animations;
};
