# Reporte QA: Iteración 6 — Pulido y despliegue

## Problemas encontrados
| # | Problema | Severidad | Corrección aplicada |
|---|----------|-----------|---------------------|
| 1 | Un `<link rel="canonical">` fijo a la home en `index.html` habría marcado todas las páginas de detalle como duplicadas de la home ante Google | Alta (SEO) | Se eliminó el canonical estático |
| 2 | Contraste 4.19:1 (falla AA) del eyebrow azul del hero sobre el resplandor | Media (accesibilidad) | Token `--accent-fg` en claro: `#2563EB` → `#1D4ED8` (≥ 4.5:1 también sobre superficies azuladas). El relleno `--accent` no cambia. Lighthouse Accessibility: 96 → 100 |
| 3 | El resplandor del hero usaba `filter: blur` sobre un círculo de 576 px: ~1.2 s de "Style & Layout" en móvil | Media (rendimiento) | Degradado radial sin filtro |
| 4 | `ScrollTrigger.refresh()` corría 3 veces al cargar: el refresh por ruta y la primera lectura del `ResizeObserver` eran redundantes con los triggers recién creados | Media (rendimiento) | Solo se refresca ante cambios reales de alto. TBT móvil de la home: 600 → ~400 ms |
| 5 | En la primera carga, el fade de página ocultaba el contenido 0.45 s y retrasaba el LCP | Baja (rendimiento/UX) | La transición de página solo se aplica al navegar (`location.key !== 'default'`) |
| 6 | Warning de React Router en la carga directa de la ruta lazy: faltaba `HydrateFallback` | Baja | `hydrateFallbackElement` neutro en la ruta raíz |

## Lighthouse (build de producción)
| Perfil | Página | Performance | Accessibility | Best Practices | SEO |
|--------|--------|:-----------:|:-------------:|:--------------:|:---:|
| Escritorio | Home | **100** | **100** | **100** | **100** |
| Escritorio | Detalle | **100** | **100** | **100** | **100** |
| Móvil | Home | 83 | **100** | **100** | **100** |
| Móvil | Detalle | 87 | **100** | **100** | **100** |

**Pendiente:** Performance en móvil no llega a 95.
- El tope es estructural. El sitio es una SPA: no pinta contenido hasta descargar y ejecutar React + Motion + GSAP (~200 kB gzip) bajo la red 4G lenta y la CPU 4× más lenta que simula Lighthouse. FCP ≈ 2.5 s.
- Llegar a ≥ 95 en móvil requiere **pre-renderizar el HTML en el build** (SSG), para que el contenido pinte antes que el JS.
- Es un cambio de arquitectura con costos:
  - Hidratación del tema.
  - Evitar que el hero se muestre y luego se oculte para animarse.
  - Posible dependencia nueva.
- Queda como decisión del usuario.

## Auditoría de reglas del Contexto Técnico
- [x] Sin dependencias nuevas. Lighthouse se ejecutó con `npx`, sin instalarlo en el proyecto.
- [x] **Chunks:** `react` 99 kB, `motion` 42 kB, `gsap` 48 kB, código de la app 10 kB y detalle 3 kB bajo demanda (gzip). Sin el warning de chunk > 500 kB.
- [x] **Color:** el hex solo vive en los tokens y en los assets (`favicon.svg`, `og-image.png`). Utilidades semánticas presentes en el CSS.
- [x] **Contenido:** placeholders marcados con `TODO`, incluido el dominio `ricardo-cortes.vercel.app` en `index.html`, `robots.txt` y `sitemap.xml`.

## Verificación ejecutada
- `npm run lint` y `npm run build`: OK, sin warnings.
- **Navegador (Puppeteer): 9/9 OK.**
  - **Meta:** favicon y Open Graph completos, sin canonical.
  - **Archivos públicos:** `robots.txt`, `sitemap.xml` (7 URLs), `og-image.png` y `favicon.svg` servidos con su tipo correcto.
  - **Detalle bajo demanda:** su chunk no se descarga en la home y sí al abrir un trabajo o al cargar la ruta directa.
  - **Teclado:** foco visible en los 27 elementos de la home y los 10 del detalle.
  - **Imágenes:** las 6 del grid con `width`/`height` y `loading="lazy"`.
  - Sin errores ni warnings en consola.
- **Regresión:** Iteraciones 1 (16/16), 2 (13/13), 3 (22/22), 4 (13/13) y 5 (20/20). La suite 4 necesitó una espera mayor por las animaciones de salida; no fue un cambio de la app.
