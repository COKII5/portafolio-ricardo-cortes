import { Link } from 'react-router';
import { WORK_CATEGORIES, type WorkCategory } from '../domain/work';
import { CATEGORY_LABELS, getCategorySearch } from '../lib/categories';

interface CategoryFilterProps {
  activeCategory: WorkCategory | null;
  counts: Record<WorkCategory, number>;
  total: number;
}

// null representa la opción "Todos"
const FILTER_OPTIONS = [null, ...WORK_CATEGORIES] as const;

export function CategoryFilter({ activeCategory, counts, total }: CategoryFilterProps) {
  return (
    <nav aria-label="Filtrar trabajos por categoría">
      <ul className="flex flex-wrap gap-2">
        {FILTER_OPTIONS.map((category) => {
          const isActive = category === activeCategory;
          return (
            <li key={category ?? 'all'}>
              <Link
                to={{ search: getCategorySearch(category) }}
                // Filtrar no debe mandar la página arriba: ScrollRestoration lo haría en cada navegación
                preventScrollReset
                aria-current={isActive ? 'true' : undefined}
                className={`inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-accent bg-accent text-on-accent'
                    : 'border-line text-fg-muted hover:border-fg-muted hover:text-fg'
                }`}
              >
                {category ? CATEGORY_LABELS[category] : 'Todos'}
                <span className="tabular-nums">{category ? counts[category] : total}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
