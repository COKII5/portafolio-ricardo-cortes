import { Tag } from '../../../../shared/ui/Tag';
import type { Work } from '../../domain/work';

interface MetaItem {
  label: string;
  value: string | readonly string[];
}

function getMetaItems(work: Work): MetaItem[] {
  const items: MetaItem[] = [];
  if (work.role) items.push({ label: 'Rol', value: work.role });
  if (work.client) items.push({ label: 'Cliente', value: work.client });
  items.push({ label: 'Año', value: String(work.year) });
  if (work.category === 'web' && work.stack.length > 0) items.push({ label: 'Stack', value: work.stack });
  if (work.category === 'automation' && work.tools.length > 0) {
    items.push({ label: 'Herramientas', value: work.tools });
  }
  if (work.tags.length > 0) items.push({ label: 'Etiquetas', value: work.tags });
  return items;
}

interface WorkMetaProps {
  work: Work;
}

export function WorkMeta({ work }: WorkMetaProps) {
  return (
    <dl className="grid grid-cols-2 gap-8 border-y border-line py-10 lg:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]">
      {getMetaItems(work).map((item) => (
        <div key={item.label} className={typeof item.value === 'string' ? '' : 'col-span-2 sm:col-span-1'}>
          <dt className="text-sm text-fg-muted">{item.label}</dt>
          <dd className="mt-2 text-fg">
            {typeof item.value === 'string' ? (
              item.value
            ) : (
              <ul className="flex flex-wrap gap-2">
                {item.value.map((value) => (
                  <li key={value}>
                    <Tag>{value}</Tag>
                  </li>
                ))}
              </ul>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
