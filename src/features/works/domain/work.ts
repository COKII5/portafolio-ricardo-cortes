export const WORK_CATEGORIES = ['audiovisual', 'web', 'automation'] as const;

export type WorkCategory = (typeof WORK_CATEGORIES)[number];

export interface VideoRef {
  provider: 'youtube' | 'vimeo';
  id: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

interface WorkBase {
  slug: string;
  title: string;
  year: number;
  summary: string;
  // URL de la imagen resuelta por Vite al importar el archivo
  cover: string;
  tags: readonly string[];
  role?: string;
  client?: string;
  featured?: boolean;
}

export interface AudiovisualWork extends WorkBase {
  category: 'audiovisual';
  video: VideoRef;
}

export interface WebWork extends WorkBase {
  category: 'web';
  stack: readonly string[];
  liveUrl?: string;
  repoUrl?: string;
  gallery?: readonly GalleryImage[];
}

export interface AutomationWork extends WorkBase {
  category: 'automation';
  tools: readonly string[];
  problem: string;
  solution: string;
  result: string;
  demoVideo?: VideoRef;
}

export type Work = AudiovisualWork | WebWork | AutomationWork;
