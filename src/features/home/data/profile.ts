import type { WorkCategory } from '../../works/domain/work';

export type ContactNetwork = 'email' | 'linkedin' | 'whatsapp' | 'github' | 'instagram' | 'vimeo';

export interface SocialLink {
  network: ContactNetwork;
  label: string;
  href: string;
  // Texto secundario visible junto al nombre (usuario, número…)
  detail?: string;
}

export interface Profile {
  name: string;
  roles: string;
  tagline: string;
  bio: readonly string[];
  disciplines: Record<WorkCategory, string>;
  email: string;
  socials: readonly SocialLink[];
}

// Contenido personal de la home: todo se edita desde aquí
export const profile: Profile = {
  name: 'Ricardo Cortes',
  roles: 'Producción audiovisual · Web · Automatización',
  // TODO: reemplazar con texto real
  tagline:
    'Grabo, dirijo y transmito contenido audiovisual, y construyo sitios web y automatizaciones que eliminan el trabajo repetitivo.',
  // TODO: reemplazar con texto real
  bio: [
    'Mi trabajo combina dos mundos: la producción audiovisual —grabaciones, transmisiones en vivo y edición— y la automatización de procesos con workflows y scripts.',
    'Esa mezcla me permite acompañar un proyecto de punta a punta: desde capturar y producir el contenido hasta automatizar cómo se publica y se distribuye.',
  ],
  disciplines: {
    audiovisual: 'Grabación, dirección técnica, transmisiones en vivo y edición.',
    web: 'Sitios rápidos, accesibles y fáciles de mantener.',
    automation: 'Workflows y scripts que conectan herramientas y ahorran horas de trabajo manual.',
  },
  email: 'ricardocorpardo@gmail.com',
  socials: [
    {
      network: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/ricardo-cortes-pardo-25b279218',
      detail: 'ricardo-cortes-pardo',
    },
    // wa.me exige el número con código de país (57 = Colombia) y sin espacios ni signos
    { network: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/573178080225', detail: '+57 317 808 0225' },
    // TODO: reemplazar GitHub, Instagram y Vimeo con los perfiles reales (hoy apuntan a la raíz de cada plataforma)
    { network: 'github', label: 'GitHub', href: 'https://github.com/' },
    { network: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/' },
    { network: 'vimeo', label: 'Vimeo', href: 'https://vimeo.com/' },
  ],
};
