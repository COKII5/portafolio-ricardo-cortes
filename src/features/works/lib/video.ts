import type { VideoRef } from '../domain/work';

// Única forma de construir URLs de reproductor: el id se codifica para que no pueda alterar la ruta
export function getEmbedUrl(video: VideoRef): string {
  const id = encodeURIComponent(video.id);
  switch (video.provider) {
    case 'youtube':
      return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
    case 'vimeo':
      return `https://player.vimeo.com/video/${id}?autoplay=1`;
  }
}
