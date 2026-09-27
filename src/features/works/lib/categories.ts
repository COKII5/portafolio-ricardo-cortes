import { WORK_CATEGORIES, type WorkCategory } from '../domain/work';

export const CATEGORY_LABELS: Record<WorkCategory, string> = {
  audiovisual: 'Audiovisual',
  web: 'Web',
  automation: 'Automatización',
};

export const CATEGORY_QUERY_PARAM = 'categoria';

// Los valores van en español porque forman parte de la URL pública que se comparte
const CATEGORY_PARAM_VALUES: Record<WorkCategory, string> = {
  audiovisual: 'audiovisual',
  web: 'web',
  automation: 'automatizacion',
};

// Un valor ausente o desconocido equivale a "Todos"
export function parseCategoryParam(value: string | null): WorkCategory | null {
  return WORK_CATEGORIES.find((category) => CATEGORY_PARAM_VALUES[category] === value) ?? null;
}

export function getCategorySearch(category: WorkCategory | null): string {
  return category ? `?${CATEGORY_QUERY_PARAM}=${CATEGORY_PARAM_VALUES[category]}` : '';
}
