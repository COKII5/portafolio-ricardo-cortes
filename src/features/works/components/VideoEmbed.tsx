import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { playButtonVariants, quickTransition } from '../../../shared/animation/variants';
import type { VideoRef } from '../domain/work';
import { getEmbedUrl } from '../lib/video';

interface VideoEmbedProps {
  video: VideoRef;
  title: string;
  poster: string;
}

export function VideoEmbed({ video, title, poster }: VideoEmbedProps) {
  const [isActive, setIsActive] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // El botón que tenía el foco desaparece al activar: el foco pasa al reproductor para no perderse
  useEffect(() => {
    if (isActive) iframeRef.current?.focus();
  }, [isActive]);

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-surface">
      {isActive ? (
        <iframe
          ref={iframeRef}
          src={getEmbedUrl(video)}
          title={`Video: ${title}`}
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 size-full"
        />
      ) : (
        <motion.button
          type="button"
          onClick={() => setIsActive(true)}
          aria-label={`Reproducir video: ${title}`}
          initial="rest"
          animate="rest"
          whileHover="hover"
          whileTap="tap"
          className="absolute inset-0 size-full cursor-pointer"
        >
          <img
            data-parallax
            src={poster}
            alt=""
            width={1600}
            height={900}
            fetchPriority="high"
            className="size-full object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            {/* El anillo claro mantiene el botón visible sobre portadas de cualquier color, incluso azules */}
            <motion.span
              variants={playButtonVariants}
              transition={quickTransition}
              className="flex size-16 items-center justify-center rounded-full bg-accent text-on-accent shadow-lg ring-2 ring-on-accent sm:size-20"
            >
              <PlayIcon />
            </motion.span>
          </span>
        </motion.button>
      )}
    </div>
  );
}

function PlayIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="ml-1 size-7 sm:size-8">
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11.3-6.86a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14z" />
    </svg>
  );
}
