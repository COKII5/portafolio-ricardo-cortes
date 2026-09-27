import type { Work, WorkCategory } from '../domain/work';

export function filterByCategory(works: readonly Work[], category: WorkCategory | null): readonly Work[] {
  return category ? works.filter((work) => work.category === category) : works;
}

export function countByCategory(works: readonly Work[]): Record<WorkCategory, number> {
  const counts: Record<WorkCategory, number> = { audiovisual: 0, web: 0, automation: 0 };
  for (const work of works) {
    counts[work.category] += 1;
  }
  return counts;
}

export function getWorkBySlug(works: readonly Work[], slug: string): Work | undefined {
  return works.find((work) => work.slug === slug);
}

export interface AdjacentWorks {
  previous: Work | null;
  next: Work | null;
}

// Vecinos según el orden de works.ts, sin dar la vuelta en los extremos
export function getAdjacentWorks(works: readonly Work[], slug: string): AdjacentWorks {
  const index = works.findIndex((work) => work.slug === slug);
  if (index === -1) {
    return { previous: null, next: null };
  }
  return { previous: works[index - 1] ?? null, next: works[index + 1] ?? null };
}
