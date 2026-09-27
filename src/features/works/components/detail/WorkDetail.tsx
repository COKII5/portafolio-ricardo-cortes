import { useRef } from 'react';
import { Link } from 'react-router';
import { useParallax } from '../../../../shared/animation/useParallax';
import { useScrollReveal } from '../../../../shared/animation/useScrollReveal';
import { usePageMeta } from '../../../../shared/seo/usePageMeta';
import { Container } from '../../../../shared/ui/Container';
import type { Work } from '../../domain/work';
import { CATEGORY_LABELS } from '../../lib/categories';
import { AdjacentWorksNav } from './AdjacentWorksNav';
import { AutomationCaseStudy } from './AutomationCaseStudy';
import { WebGallery } from './WebGallery';
import { WebLinks } from './WebLinks';
import { WorkMedia } from './WorkMedia';
import { WorkMeta } from './WorkMeta';
import { WorkStructuredData } from './WorkStructuredData';

interface WorkDetailProps {
  work: Work;
  previous: Work | null;
  next: Work | null;
}

export function WorkDetail({ work, previous, next }: WorkDetailProps) {
  const scopeRef = useRef<HTMLElement>(null);
  useScrollReveal(scopeRef);
  useParallax(scopeRef);
  usePageMeta({ path: `/trabajos/${work.slug}`, description: work.summary });

  return (
    <article ref={scopeRef}>
      <title>{`${work.title} — ${CATEGORY_LABELS[work.category]} | Ricardo Cortes`}</title>
      <WorkStructuredData work={work} />
      <Container className="pt-12 pb-24 sm:pt-16">
        <Link
          to={{ pathname: '/', hash: '#trabajos' }}
          className="text-sm text-fg-muted transition-colors hover:text-fg"
        >
          <span aria-hidden="true">← </span>
          Todos los trabajos
        </Link>

        <header className="mt-10 max-w-3xl">
          <p className="text-sm font-medium text-accent-fg">
            {CATEGORY_LABELS[work.category]} · {work.year}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance text-fg sm:text-6xl">
            {work.title}
          </h1>
          <p className="mt-6 text-lg text-fg-muted">{work.summary}</p>
          {work.category === 'web' && <WebLinks work={work} />}
        </header>

        <div className="mt-12">
          <WorkMedia work={work} />
        </div>

        <div data-reveal className="mt-12">
          <WorkMeta work={work} />
        </div>

        {work.category === 'automation' && (
          <div data-reveal>
            <AutomationCaseStudy work={work} />
          </div>
        )}
        {work.category === 'web' && work.gallery && work.gallery.length > 0 && (
          <div data-reveal>
            <WebGallery images={work.gallery} />
          </div>
        )}

        <div data-reveal>
          <AdjacentWorksNav previous={previous} next={next} />
        </div>
      </Container>
    </article>
  );
}
