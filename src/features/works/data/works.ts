import type { Work } from '../domain/work';
import liveEventCover from '../../../assets/works/transmision-en-vivo-evento-corporativo/cover.svg';
import musicVideoCover from '../../../assets/works/videoclip-sesion-acustica/cover.svg';
import saasLandingCover from '../../../assets/works/landing-producto-saas/cover.svg';
import saasLandingMobile from '../../../assets/works/landing-producto-saas/gallery-1.svg';
import saasLandingPricing from '../../../assets/works/landing-producto-saas/gallery-2.svg';
import photoStudioCover from '../../../assets/works/sitio-estudio-fotografia/cover.svg';
import socialPublishingCover from '../../../assets/works/publicacion-automatica-redes/cover.svg';
import weeklyReportsCover from '../../../assets/works/reportes-semanales-automaticos/cover.svg';

// El orden del array es el orden en que se muestran los trabajos en el sitio
export const works: readonly Work[] = [
  // TODO: reemplazar con trabajo real
  {
    slug: 'transmision-en-vivo-evento-corporativo',
    category: 'audiovisual',
    title: 'Transmisión en vivo de evento corporativo',
    year: 2025,
    summary:
      'Producción y transmisión multicámara de un evento corporativo para una audiencia remota en tiempo real.',
    cover: liveEventCover,
    tags: ['Multicámara', 'Streaming', 'Dirección técnica'],
    role: 'Director técnico',
    client: 'Cliente de ejemplo',
    featured: true,
    // Video oficial de muestra de la documentación de YouTube
    video: { provider: 'youtube', id: 'M7lc1UVf-VE' },
  },
  // TODO: reemplazar con trabajo real
  {
    slug: 'publicacion-automatica-redes',
    category: 'automation',
    title: 'Publicación automática en redes',
    year: 2025,
    summary:
      'Flujo que toma cada video terminado, genera las piezas por red social y las programa sin intervención manual.',
    cover: socialPublishingCover,
    tags: ['Workflows', 'APIs', 'Contenido'],
    role: 'Diseño e implementación',
    featured: true,
    tools: ['n8n', 'YouTube Data API', 'Google Sheets'],
    problem: 'Publicar cada pieza en cuatro redes tomaba horas de trabajo repetitivo y propenso a errores.',
    solution:
      'Un workflow que detecta el video nuevo, arma título, descripción y miniatura por red, y agenda la publicación.',
    result: 'La publicación pasó de horas a minutos y dejó de depender de una persona.',
    // Video oficial de muestra de la documentación de YouTube
    demoVideo: { provider: 'youtube', id: 'M7lc1UVf-VE' },
  },
  // TODO: reemplazar con trabajo real
  {
    slug: 'landing-producto-saas',
    category: 'web',
    title: 'Landing de producto SaaS',
    year: 2025,
    summary:
      'Landing page rápida y accesible para el lanzamiento de un producto digital, con foco en conversión.',
    cover: saasLandingCover,
    tags: ['Diseño web', 'Performance', 'Accesibilidad'],
    role: 'Diseño y desarrollo',
    featured: true,
    stack: ['React', 'Vite', 'Tailwind CSS'],
    liveUrl: 'https://example.com',
    gallery: [
      { src: saasLandingMobile, alt: 'Vista móvil de la landing con el encabezado y el botón principal' },
      { src: saasLandingPricing, alt: 'Sección de precios con tres planes y el plan central destacado' },
    ],
  },
  // TODO: reemplazar con trabajo real
  {
    slug: 'videoclip-sesion-acustica',
    category: 'audiovisual',
    title: 'Videoclip de sesión acústica',
    year: 2024,
    summary: 'Rodaje, edición y corrección de color de una sesión acústica grabada en una sola toma.',
    cover: musicVideoCover,
    tags: ['Rodaje', 'Edición', 'Color'],
    role: 'Dirección y edición',
    client: 'Artista de ejemplo',
    // Video oficial de muestra de la documentación de Vimeo
    video: { provider: 'vimeo', id: '76979871' },
  },
  // TODO: reemplazar con trabajo real
  {
    slug: 'reportes-semanales-automaticos',
    category: 'automation',
    title: 'Reportes semanales automáticos',
    year: 2024,
    summary:
      'Script que consolida datos de varias planillas, genera un reporte con gráficos y lo envía por correo cada lunes.',
    cover: weeklyReportsCover,
    tags: ['Scripts', 'Datos', 'Reportes'],
    role: 'Desarrollo',
    tools: ['Python', 'Google Sheets API', 'Gmail API'],
    problem: 'El reporte semanal se armaba a mano copiando datos de varias fuentes.',
    solution: 'Un script programado que junta los datos, genera los gráficos y envía el reporte listo.',
    result: 'Se eliminó el trabajo manual semanal y los errores de copiado.',
  },
  // TODO: reemplazar con trabajo real
  {
    slug: 'sitio-estudio-fotografia',
    category: 'web',
    title: 'Sitio para estudio de fotografía',
    year: 2024,
    summary: 'Sitio con galería optimizada para mostrar portafolios de fotografía sin sacrificar velocidad.',
    cover: photoStudioCover,
    tags: ['Galería', 'Imágenes', 'SEO'],
    role: 'Desarrollo',
    client: 'Estudio de ejemplo',
    stack: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://example.org',
  },
];
