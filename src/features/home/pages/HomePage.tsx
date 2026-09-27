import { useRef } from 'react';
import { useScrollReveal } from '../../../shared/animation/useScrollReveal';
import { usePageMeta } from '../../../shared/seo/usePageMeta';
import { About } from '../sections/About';
import { Contact } from '../sections/Contact';
import { Hero } from '../sections/Hero';
import { WorksSection } from '../sections/WorksSection';

export function HomePage() {
  const scopeRef = useRef<HTMLDivElement>(null);
  useScrollReveal(scopeRef);
  // Canónica "/" también para las vistas filtradas (?categoria=): son la misma página
  usePageMeta({ path: '/' });

  return (
    <div ref={scopeRef}>
      <Hero />
      <WorksSection />
      <About />
      <Contact />
    </div>
  );
}
