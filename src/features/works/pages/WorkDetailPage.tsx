import { useParams } from 'react-router';
import { NotFound } from '../../../shared/ui/NotFound';
import { WorkDetail } from '../components/detail/WorkDetail';
import { works } from '../data/works';
import { getAdjacentWorks, getWorkBySlug } from '../lib/workQueries';

export function WorkDetailPage() {
  const { slug } = useParams();
  const work = slug ? getWorkBySlug(works, slug) : undefined;

  if (!work) {
    return <NotFound />;
  }

  const { previous, next } = getAdjacentWorks(works, work.slug);

  // El key reinicia el estado al cambiar de trabajo (p. ej. un video activo vuelve a su portada)
  return <WorkDetail key={work.slug} work={work} previous={previous} next={next} />;
}
