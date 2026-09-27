import { motion, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import { useScrollTriggerRefresh } from '../../shared/animation/useScrollTriggerRefresh';
import { pageEnter } from '../../shared/animation/variants';
import { Footer } from '../../shared/ui/Footer';
import { MoleculesBackground } from '../../shared/ui/MoleculesBackground';
import { Navbar } from '../../shared/ui/Navbar';

export function RootLayout() {
  const { pathname, key } = useLocation();
  // 'default' es la entrada inicial del historial: al abrir el sitio no hay transición que animar
  const isInitialEntry = key === 'default';
  const mainRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  useScrollTriggerRefresh(mainRef);

  return (
    <div className="isolate flex min-h-dvh flex-col">
      <MoleculesBackground />
      {/* Después del canvas en el DOM: queda encima de las moléculas pero detrás del contenido */}
      <div aria-hidden="true" className="screen-fog pointer-events-none fixed inset-0 -z-10" />
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-on-accent"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main ref={mainRef} id="contenido" tabIndex={-1} className="flex-1 outline-none">
        {/* Solo entrada, sin salida: ScrollRestoration salta arriba al instante y la página saliente se vería saltar */}
        <motion.div
          key={pathname}
          initial={shouldReduceMotion || isInitialEntry ? false : pageEnter.from}
          animate={pageEnter.to}
          transition={pageEnter.transition}
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
