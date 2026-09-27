import { useSearchParams } from 'react-router';
import { Container } from '../../../shared/ui/Container';
import { CategoryFilter } from '../../works/components/CategoryFilter';
import { WorkGrid } from '../../works/components/WorkGrid';
import { works } from '../../works/data/works';
import { CATEGORY_LABELS, CATEGORY_QUERY_PARAM, parseCategoryParam } from '../../works/lib/categories';
import { countByCategory, filterByCategory } from '../../works/lib/workQueries';

const workCounts = countByCategory(works);

export function WorksSection() {
  const [searchParams] = useSearchParams();
  const activeCategory = parseCategoryParam(searchParams.get(CATEGORY_QUERY_PARAM));
  const visibleWorks = filterByCategory(works, activeCategory);

  const resultsMessage = `Mostrando ${visibleWorks.length} ${visibleWorks.length === 1 ? 'trabajo' : 'trabajos'}${
    activeCategory ? ` de ${CATEGORY_LABELS[activeCategory]}` : ''
  }`;

  return (
    <section id="trabajos" aria-labelledby="trabajos-titulo" className="scroll-mt-16 border-t border-line">
      <Container className="py-20 sm:py-24">
        <div data-reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 id="trabajos-titulo" className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              Trabajos
            </h2>
            <p className="mt-3 max-w-lg text-fg-muted">
              Producción audiovisual, sitios web y automatizaciones.
            </p>
          </div>
          <CategoryFilter activeCategory={activeCategory} counts={workCounts} total={works.length} />
        </div>

        {/* Anuncia el resultado del filtro a lectores de pantalla (el foco se queda en el link) */}
        <p aria-live="polite" className="sr-only">
          {resultsMessage}
        </p>

        <div data-reveal className="mt-12">
          <WorkGrid works={visibleWorks} />
        </div>
      </Container>
    </section>
  );
}
