// Clases para links con aspecto de botón (Link de React Router o <a> externos)
const base =
  'inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-colors';

export const buttonStyles = {
  primary: `${base} bg-accent text-on-accent hover:bg-accent-hover`,
  // bg-canvas lo distingue también cuando va sobre una tarjeta bg-surface
  secondary: `${base} border border-line bg-canvas text-fg hover:bg-surface`,
} as const;
