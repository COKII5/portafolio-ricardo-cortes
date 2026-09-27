import { AnimatePresence, motion } from 'motion/react';
import { gridItemTransition, gridItemVariants } from '../../../shared/animation/variants';
import type { Work } from '../domain/work';
import { WorkCard } from './WorkCard';

interface WorkGridProps {
  works: readonly Work[];
}

export function WorkGrid({ works }: WorkGridProps) {
  if (works.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-line px-6 py-16 text-center text-fg-muted">
        Todavía no hay trabajos en esta categoría.
      </p>
    );
  }

  return (
    // relative: popLayout posiciona en absoluto las tarjetas que salen, respecto de esta lista
    <ul className="relative grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout" initial={false}>
        {works.map((work) => (
          <motion.li
            key={work.slug}
            layout
            variants={gridItemVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={gridItemTransition}
          >
            <WorkCard work={work} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
