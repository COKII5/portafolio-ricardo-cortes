import { useRef } from 'react';
import { Link } from 'react-router';
import { gsap, MOTION_OK_QUERY, SplitText, useGSAP } from '../../../shared/animation/gsap';
import { buttonStyles } from '../../../shared/ui/buttonStyles';
import { Container } from '../../../shared/ui/Container';
import { profile } from '../data/profile';

export function Hero() {
  const scopeRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK_QUERY, () => {
        if (titleRef.current) {
          SplitText.create(titleRef.current, {
            type: 'lines, words',
            mask: 'lines',
            autoSplit: true,
            // Devolver la animación permite que autoSplit la re-sincronice si vuelve a partir el texto (resize, fuente)
            onSplit: (split) =>
              gsap.from(split.words, {
                yPercent: 110,
                duration: 1.1,
                ease: 'power4.out',
                stagger: 0.08,
                delay: 0.1,
              }),
          });
        }
        gsap.from('[data-hero-fade]', {
          opacity: 0,
          y: 24,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          delay: 0.35,
        });
        gsap.from('[data-hero-glow]', { opacity: 0, scale: 0.8, duration: 1.6, ease: 'power2.out' });
      });
    },
    { scope: scopeRef },
  );

  return (
    <section ref={scopeRef} aria-labelledby="inicio-titulo" className="relative overflow-hidden">
      <div
        data-hero-glow
        aria-hidden="true"
        // Degradado radial en vez de filter: blur, que costaba ~1 s de pintado en móviles lentos
        className="pointer-events-none absolute -top-48 -right-40 size-[36rem] rounded-full bg-[radial-gradient(closest-side,var(--accent),transparent)] opacity-20"
      />
      <Container className="relative pt-20 pb-24 sm:pt-32 sm:pb-36">
        <p data-hero-fade className="text-sm font-medium text-accent-fg">
          {profile.roles}
        </p>
        <h1
          ref={titleRef}
          id="inicio-titulo"
          className="mt-5 text-5xl font-semibold tracking-tight text-fg sm:text-7xl lg:text-8xl"
        >
          {profile.name}
        </h1>
        <p data-hero-fade className="mt-6 max-w-2xl text-lg text-fg-muted sm:text-xl">
          {profile.tagline}
        </p>
        <div data-hero-fade className="mt-10 flex flex-wrap gap-3">
          <Link to={{ pathname: '/', hash: '#trabajos' }} className={buttonStyles.primary}>
            Ver trabajos
          </Link>
          <Link to={{ pathname: '/', hash: '#contacto' }} className={buttonStyles.secondary}>
            Contactar
          </Link>
        </div>
      </Container>
    </section>
  );
}
