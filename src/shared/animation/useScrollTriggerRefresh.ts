import { useEffect, type RefObject } from 'react';
import { ScrollTrigger } from './gsap';

// Recalcula las posiciones de los triggers cuando cambia el alto del contenido: cambio de ruta, filtro, imágenes
export function useScrollTriggerRefresh(target: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = target.current;
    if (!element) return;

    let frameId = 0;
    let isFirstCallback = true;
    const observer = new ResizeObserver(() => {
      // La primera lectura llega al montar, cuando los triggers recién creados ya tienen posiciones correctas
      if (isFirstCallback) {
        isFirstCallback = false;
        return;
      }
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [target]);
}
