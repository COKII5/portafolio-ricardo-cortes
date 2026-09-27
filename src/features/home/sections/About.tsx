import { Link } from 'react-router';
import { Container } from '../../../shared/ui/Container';
import { WORK_CATEGORIES } from '../../works/domain/work';
import { CATEGORY_LABELS, getCategorySearch } from '../../works/lib/categories';
import { profile } from '../data/profile';

export function About() {
  return (
    <section id="sobre-mi" aria-labelledby="sobre-mi-titulo" className="scroll-mt-16 border-t border-line">
      <Container className="py-20 sm:py-24">
        <div data-reveal className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
          <h2 id="sobre-mi-titulo" className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            Sobre mí
          </h2>
          <div className="space-y-6 text-lg text-fg-muted">
            {profile.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <ul data-reveal className="mt-16 grid gap-6 md:grid-cols-3">
          {WORK_CATEGORIES.map((category) => (
            <li key={category} className="flex flex-col rounded-2xl border border-line p-6">
              <h3 className="text-lg font-semibold tracking-tight text-fg">{CATEGORY_LABELS[category]}</h3>
              <p className="mt-2 flex-1 text-fg-muted">{profile.disciplines[category]}</p>
              <Link
                to={{ pathname: '/', search: getCategorySearch(category), hash: '#trabajos' }}
                className="mt-6 self-start text-sm font-medium text-accent-fg hover:underline"
              >
                Ver trabajos
                <span className="sr-only"> de {CATEGORY_LABELS[category]}</span>
                <span aria-hidden="true"> →</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
