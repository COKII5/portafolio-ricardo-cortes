import type { Work } from '../../domain/work';
import { VideoEmbed } from '../VideoEmbed';

interface WorkMediaProps {
  work: Work;
}

export function WorkMedia({ work }: WorkMediaProps) {
  const video =
    work.category === 'audiovisual' ? work.video : work.category === 'automation' ? work.demoVideo : undefined;

  if (video) {
    return <VideoEmbed video={video} title={work.title} poster={work.cover} />;
  }

  return (
    <div className="aspect-video overflow-hidden rounded-2xl border border-line bg-surface">
      <img
        data-parallax
        src={work.cover}
        alt={`Portada de ${work.title}`}
        width={1600}
        height={900}
        fetchPriority="high"
        className="size-full object-cover"
      />
    </div>
  );
}
