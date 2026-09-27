import { SITE_NAME, SITE_URL } from '../../../../shared/config/site';
import type { Work } from '../../domain/work';

interface WorkStructuredDataProps {
  work: Work;
}

// JSON-LD de Schema.org: ayuda a Google a entender el trabajo, su autor y la ruta de migas
export function WorkStructuredData({ work }: WorkStructuredDataProps) {
  const url = `${SITE_URL}/trabajos/${work.slug}`;
  // Las portadas incrustadas como data: URI no sirven como imagen pública
  const image = work.cover.startsWith('data:') ? undefined : new URL(work.cover, SITE_URL).href;

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        name: work.title,
        description: work.summary,
        url,
        dateCreated: String(work.year),
        keywords: work.tags.join(', '),
        ...(image && { image }),
        author: { '@type': 'Person', name: SITE_NAME, url: `${SITE_URL}/` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: work.title, item: url },
        ],
      },
    ],
  };

  // Se escapa "<" para que ningún texto del contenido pueda cerrar el <script>
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
