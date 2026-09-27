import type { GalleryImage } from '../../domain/work';

interface WebGalleryProps {
  images: readonly GalleryImage[];
}

export function WebGallery({ images }: WebGalleryProps) {
  return (
    <section aria-labelledby="galeria-titulo" className="mt-16">
      <h2 id="galeria-titulo" className="text-2xl font-semibold tracking-tight text-fg">
        Galería
      </h2>
      <ul className="mt-6 grid gap-6 sm:grid-cols-2">
        {images.map((image) => (
          <li key={image.src}>
            <img
              src={image.src}
              alt={image.alt}
              width={1600}
              height={900}
              loading="lazy"
              decoding="async"
              className="aspect-video w-full rounded-2xl border border-line bg-surface object-cover"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
