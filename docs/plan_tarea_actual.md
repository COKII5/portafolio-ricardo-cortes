# Plan de la Tarea Actual: Iteración 6 — Pulido y despliegue

## Objetivo
Dejar el sitio listo para publicar:
- SEO y vista previa al compartir: meta, Open Graph, favicon, `robots.txt` y `sitemap.xml`.
- Teclado y foco auditados.
- Imágenes sin saltos de layout.
- JS dividido en chunks.
- Lighthouse ≥ 95 en las 4 categorías.
- Guía de despliegue en Vercel.

**URL pública:** placeholder `https://ricardo-cortes.vercel.app` (el usuario todavía no tiene dominio). Aparece en `index.html`, `robots.txt`, `sitemap.xml` y en la guía, marcada para reemplazar.

## Archivos a crear
| Archivo | Responsabilidad |
|---------|-----------------|
| `public/favicon.svg` | Monograma "RC" sobre círculo azul de acento |
| `public/og-image.png` | 1200×630 para Open Graph/Twitter. Se renderiza a PNG con Chrome headless desde un HTML temporal (no hay herramientas de imágenes rasterizadas en el entorno) |
| `public/robots.txt` | `Allow: /` + ruta del sitemap |
| `public/sitemap.xml` | `/` y las 6 rutas `/trabajos/:slug`. Estático, con nota de mantenimiento |
| `docs/deploy_vercel.md` | Pasos: GitHub → Vercel → dominio → reemplazar el placeholder de la URL → Google Search Console |

## Archivos a modificar
| Archivo | Cambio |
|---------|--------|
| `index.html` | Favicon, `theme-color` (claro/oscuro), canonical, Open Graph (`og:type/url/title/description/image/locale`) y `twitter:card` |
| `src/app/router.tsx` | La ruta `trabajos/:slug` pasa a `lazy` de React Router: el detalle y su código se descargan solo al visitarlo |
| `vite.config.ts` | `build.rolldownOptions.output.codeSplitting.groups`: separa `react` (+ `react-dom`, `react-router`), `motion` y `gsap` en chunks de vendor cacheables |

## Dependencias
Ninguna nueva. Lighthouse se ejecuta con `npx lighthouse` sin instalarlo en el proyecto.

## Flujo
1. Crear `public/` → Vite copia su contenido tal cual a `dist/`.
2. Router con `lazy`: el chunk del detalle se pide al navegar a `/trabajos/*`, o en la carga directa de esa ruta.
3. Build → revisar el tamaño de los chunks → `vite preview` → Lighthouse (móvil, el perfil por defecto) en `/` y en un detalle.
4. Ajustar según lo que marque Lighthouse.

## Verificación
- `lint` + `build` sin el warning de chunk > 500 kB.
- Lighthouse ≥ 95 en Performance, Accessibility, Best Practices y SEO, en la home y en un detalle.
- Navegador:
  - Favicon y meta OG presentes.
  - `robots.txt`/`sitemap.xml` servidos.
  - El detalle carga su chunk bajo demanda.
  - Recorrido completo con Tab con foco visible.
- Regresión: suites de las iteraciones 1-5.
