import { Link } from 'react-router';
import type { Work } from '../../domain/work';

interface AdjacentWorksNavProps {
  previous: Work | null;
  next: Work | null;
}

export function AdjacentWorksNav({ previous, next }: AdjacentWorksNavProps) {
  if (!previous && !next) return null;

  return (
    <nav aria-label="Más trabajos" className="mt-24 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
      {/* Celda vacía para que "Siguiente" quede siempre en la columna derecha */}
      {previous ? <AdjacentLink work={previous} direction="previous" /> : <div className="hidden sm:block" />}
      {next && <AdjacentLink work={next} direction="next" />}
    </nav>
  );
}

interface AdjacentLinkProps {
  work: Work;
  direction: 'previous' | 'next';
}

function AdjacentLink({ work, direction }: AdjacentLinkProps) {
  const isNext = direction === 'next';

  return (
    <Link
      to={`/trabajos/${work.slug}`}
      className={`rounded-2xl border border-line p-6 transition-colors hover:bg-surface ${isNext ? 'sm:text-right' : ''}`}
    >
      {/* Ambos spans en bloque: el nombre accesible separa "Siguiente" del título en vez de pegarlos */}
      <span className="block text-sm text-fg-muted">
        {!isNext && <span aria-hidden="true">← </span>}
        {isNext ? 'Siguiente' : 'Anterior'}
        {isNext && <span aria-hidden="true"> →</span>}
      </span>
      <span className="mt-2 block text-lg font-semibold tracking-tight text-fg">{work.title}</span>
    </Link>
  );
}
