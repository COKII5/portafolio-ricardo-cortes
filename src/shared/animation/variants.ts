import type { Transition, Variants } from 'motion/react';

// Ease-out rápido al inicio y con frenado suave: la curva común de todas las animaciones de Motion
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const pageEnter = {
  from: { opacity: 0, y: 12 },
  to: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: EASE_OUT } satisfies Transition,
};

export const gridItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};
export const gridItemTransition: Transition = { duration: 0.3, ease: EASE_OUT };

export const coverHoverVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.04 },
};
export const coverHoverTransition: Transition = { duration: 0.6, ease: EASE_OUT };

export const playButtonVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.08 },
  tap: { scale: 0.94 },
};

export const menuVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0 },
};

export const iconSwapVariants: Variants = {
  enter: { opacity: 0, rotate: -90 },
  center: { opacity: 1, rotate: 0 },
  exit: { opacity: 0, rotate: 90 },
};

export const quickTransition: Transition = { duration: 0.2, ease: EASE_OUT };
