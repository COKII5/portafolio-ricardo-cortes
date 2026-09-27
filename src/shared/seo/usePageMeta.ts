import { useEffect } from 'react';
import { SITE_URL } from '../config/site';

interface PageMeta {
  // Ruta canónica ("/" o "/trabajos/slug"); se omite en páginas noindex
  path?: string;
  description?: string;
  noindex?: boolean;
}

// Crea o actualiza una etiqueta del <head> y devuelve cómo dejarla como estaba
function setHeadAttribute(selector: string, create: () => HTMLElement, attribute: string, value: string | undefined) {
  if (value === undefined) return () => {};
  const existing = document.head.querySelector<HTMLElement>(selector);
  const element = existing ?? create();
  const previous = existing?.getAttribute(attribute) ?? null;
  element.setAttribute(attribute, value);
  if (!existing) document.head.append(element);

  return () => {
    if (!existing) element.remove();
    else if (previous === null) existing.removeAttribute(attribute);
    else existing.setAttribute(attribute, previous);
  };
}

function createMeta(name: string) {
  return () => Object.assign(document.createElement('meta'), { name });
}

// Actualiza las etiquetas existentes en lugar de sumar duplicados (React 19 solo agrega, no reemplaza)
export function usePageMeta({ path, description, noindex = false }: PageMeta) {
  useEffect(() => {
    const restorers = [
      setHeadAttribute('meta[name="description"]', createMeta('description'), 'content', description),
      setHeadAttribute(
        'link[rel="canonical"]',
        () => Object.assign(document.createElement('link'), { rel: 'canonical' }),
        'href',
        noindex || path === undefined ? undefined : `${SITE_URL}${path}`,
      ),
      setHeadAttribute('meta[name="robots"]', createMeta('robots'), 'content', noindex ? 'noindex' : undefined),
    ];
    return () => restorers.forEach((restore) => restore());
  }, [path, description, noindex]);
}
