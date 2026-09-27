import { motion } from 'motion/react';
import { Link } from 'react-router';
import { coverHoverTransition, coverHoverVariants } from '../../../shared/animation/variants';
import type { Work } from '../domain/work';
import { CATEGORY_LABELS } from '../lib/categories';

interface WorkCardProps {
  work: Work;
}

export function WorkCard({ work }: WorkCardProps) {
  return (
    <motion.article
      initial="rest"
      animate="rest"
      whileHover="hover"
      className="group relative rounded-2xl has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-accent-fg"
    >
      <div className="aspect-video overflow-hidden rounded-2xl border border-line bg-surface">
        <motion.img
          src={work.cover}
          alt=""
          width={1600}
          height={900}
          loading="lazy"
          decoding="async"
          variants={coverHoverVariants}
          transition={coverHoverTransition}
          className="size-full object-cover"
        />
      </div>

      <p className="mt-4 flex items-center gap-2 text-xs font-medium tracking-wider text-fg-muted uppercase">
        <span>{CATEGORY_LABELS[work.category]}</span>
        <span aria-hidden="true">·</span>
        <span>{work.year}</span>
      </p>

      <h3 className="mt-2 text-lg font-semibold tracking-tight text-fg transition-colors group-hover:text-accent-fg">
        {/* El ::after estira el link sobre toda la tarjeta para que sea clickeable completa */}
        <Link to={`/trabajos/${work.slug}`} className="after:absolute after:inset-0 focus-visible:outline-hidden">
          {work.title}
        </Link>
      </h3>

      <p className="mt-2 line-clamp-2 text-sm text-fg-muted">{work.summary}</p>
    </motion.article>
  );
}
