import type { RefObject } from 'react';
import { gsap, MOTION_OK_QUERY, useGSAP } from './gsap';

// Parallax sutil de cada [data-parallax]: debe ser una imagen dentro de un marco con overflow-hidden
export function useParallax(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK_QUERY, () => {
        gsap.utils.toArray<HTMLElement>('[data-parallax]', scope.current).forEach((element) => {
          // scale 1.1 da margen para que el desplazamiento de ±5% nunca deje huecos en el marco
          gsap.fromTo(
            element,
            { yPercent: -5, scale: 1.1 },
            {
              yPercent: 5,
              scale: 1.1,
              ease: 'none',
              scrollTrigger: {
                trigger: element.parentElement ?? element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          );
        });
      });
    },
    { scope },
  );
}
