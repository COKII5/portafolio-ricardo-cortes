import type { RefObject } from 'react';
import { gsap, MOTION_OK_QUERY, useGSAP } from './gsap';

// Fade-up de cada [data-reveal] del scope al entrar en pantalla
export function useScrollReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK_QUERY, () => {
        gsap.utils.toArray<HTMLElement>('[data-reveal]', scope.current).forEach((element) => {
          // opacity y no autoAlpha: visibility:hidden sacaría los links del orden de tabulación
          gsap.from(element, {
            opacity: 0,
            y: 32,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 88%', once: true },
          });
        });
      });
    },
    { scope },
  );
}
