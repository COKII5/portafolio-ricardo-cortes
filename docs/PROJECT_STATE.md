# Estado del Proyecto: Portafolio de Ricardo Cortes

## 🏗️ 1. Contexto Técnico (Reglas del Juego)
*(No modificar a menos que cambie la arquitectura base. El agente debe leer esto antes de escribir código).*

**Producto:** Portafolio minimalista-moderno con animaciones para mostrar tres tipos de trabajo: **audiovisual**, **páginas web** y **automatizaciones**. Tiene una home (hero, trabajos filtrables, sobre mí, contacto) y una página por trabajo en `/trabajos/:slug`. Tema claro + oscuro con toggle y acento azul `#2563EB`. Idioma: español.

**Stack Tecnológico:**
- React 19, Vite, TypeScript `strict`, Tailwind CSS v4 (`@tailwindcss/vite`).
- Motion (ex Framer Motion): paquete `motion`, import desde `motion/react`.
- GSAP 3 + ScrollTrigger (usar `useGSAP` de `@gsap/react`).
- React Router v7: paquete `react-router`, con `createBrowserRouter`.
- Hosting: Vercel.
- **Versiones fijadas:**
  - TS `~6.0`, porque TS 7 rompe `typescript-eslint`.
  - `react-router@^7`.
- El proyecto vive en la raíz, junto a `.claude/` y `docs/`.

**Dependencias autorizadas** (aprobadas el 2026-09-26; cualquier otra requiere autorización explícita):
- Runtime: `react`, `react-dom`, `react-router`, `motion`, `gsap`, `@gsap/react`, `@fontsource-variable/inter`.
- Dev: `vite`, `@vitejs/plugin-react`, `typescript`, `@types/react`, `@types/react-dom`, `tailwindcss`, `@tailwindcss/vite`, `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals`.

**Arquitectura:** modular por features (Clean Architecture pragmática: el dominio no depende de React y no hay repositorios ni casos de uso).
```
src/
  app/            App.tsx, router.tsx, layouts/RootLayout.tsx, providers/ThemeProvider.tsx
  features/
    works/        domain/work.ts · data/works.ts · lib/(getWorkBySlug, getAdjacentWorks, filterByCategory)
                  components/(WorkCard, WorkGrid, CategoryFilter, VideoEmbed, bloques de detalle) · pages/WorkDetailPage.tsx
    home/         sections/(Hero, WorksSection, About, Contact) · pages/HomePage.tsx
  shared/         ui/(Container, Button, Tag, Navbar, Footer, ThemeToggle) · animation/(gsap.ts, variants.ts)
  styles/         index.css (tokens + Tailwind)
  assets/works/<slug>/cover.webp
```

**Modelo de datos:** unión discriminada por `category`. Agregar un trabajo = un objeto en `works.ts` + su portada.
```ts
type WorkCategory = 'audiovisual' | 'web' | 'automation';
type VideoRef = { provider: 'youtube' | 'vimeo'; id: string };
// WorkBase: slug, title, category, year, summary, cover, tags[], role?, client?, featured?
// AudiovisualWork → video: VideoRef
// WebWork         → liveUrl?, repoUrl?, stack[], gallery?
// AutomationWork  → tools[], problem, solution, result, demoVideo?: VideoRef
```

**Reglas Estrictas:**
- Tipado estricto siempre.
- Identificadores en inglés y comentarios en español.
- No instalar dependencias fuera de la lista autorizada.
- Nada de hex en los componentes: todo el color pasa por tokens semánticos.
- Todo el contenido de los trabajos vive en `features/works/data/works.ts`.
- No se sube video al repo: solo `VideoRef`. Las URLs de embed se construyen únicamente desde `provider` + `id`:
  - YouTube: `youtube-nocookie.com/embed/{id}?autoplay=1`
  - Vimeo: `player.vimeo.com/video/{id}?autoplay=1`
- `VideoEmbed` es un componente propio: muestra la portada con un botón de play y monta el iframe (con `title` accesible) solo al hacer click.
- Toda animación respeta `prefers-reduced-motion`. Un mismo elemento nunca se anima con Motion y GSAP a la vez.

**Animaciones (división de responsabilidades):**
- **Motion:** transiciones de página (`AnimatePresence` por ruta), layout del grid filtrado, hovers, menú móvil e ícono del toggle. Todo bajo `<MotionConfig reducedMotion="user">`.
- **GSAP + ScrollTrigger:** entrada del hero, revelados al hacer scroll y parallax sutil.
  - Se registra una sola vez en `shared/animation/gsap.ts`.
  - Limpieza con `useGSAP`, condicionado a `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`.
  - Llamar `ScrollTrigger.refresh()` tras cada cambio de ruta.

**Tokens y temas (lecciones del sitio anterior, no re-descubrir):**
- `@theme inline` mapea `--color-x: var(--x)`, así las utilidades siguen a `data-theme` sin `dark:`. El CSS escrito a mano usa `var(--x)`, nunca `var(--color-x)`.
- El bloque oscuro va como `:root[data-theme="dark"]` (necesita esa especificidad).
- Un script inline en `index.html` fija `data-theme` antes del primer pintado (localStorage o `prefers-color-scheme`) para evitar el flash de tema.
- Contraste:
  - Relleno de acento `#2563EB` en ambos temas, con texto blanco encima (5.17:1).
  - Acento de primer plano en oscuro: `#60A5FA`.
  - Prohibido `#3B82F6` con texto blanco (3.68:1, falla AA).
- Una clase semántica mal escrita no da ningún error: se verifica buscando las utilidades en `dist/assets/*.css`.
- Estética: mucho aire, tipografía grande (Inter Variable), bordes de 1px, sombras difusas y radios generosos.

**Verificación mínima por iteración:** `npm run lint` y `npm run build` sin errores. Desde que haya UI, probar en el navegador con `npm run preview`.

## 🔄 2. Cambios Recientes (Memoria a Corto Plazo)
*(Máximo 5 entradas. El agente /pm borrará la más antigua al añadir una nueva).*
- **[2026-09-26] Iteración 2 ✅:** Modelo `Work` (unión discriminada), 6 trabajos de ejemplo con portadas SVG, y `WorkCard`/`WorkGrid`/`CategoryFilter` en `WorksSection` de la home. El filtro `?categoria=` no mueve el scroll y respeta el historial. QA 13/13.
- **[2026-09-26] Iteración 3 ✅:** Detalle `/trabajos/:slug` por categoría: `VideoEmbed` (iframe solo tras el click, foco al reproductor), galería + links, caso de automatización, ficha, anterior/siguiente, 404 y `<title>` por página. `gallery` pasó a `{src, alt}[]`. QA 22/22.
- **[2026-09-26] Iteración 4 ✅:** Home completa: Hero (nombre, perfil y CTAs), Sobre mí con 3 disciplinas que enlazan al filtro, y Contacto (mailto, copiar correo, redes). El contenido personal vive en `features/home/data/profile.ts` (placeholders con `TODO`). QA 13/13.
- **[2026-09-26] Iteración 5 ✅:** Animaciones:
  - GSAP: hero con SplitText, revelados `[data-reveal]` y parallax `[data-parallax]`, con refresh por `ResizeObserver`.
  - Motion: entrada de página (sin exit, por `ScrollRestoration`), grid `popLayout`, hovers, menú e ícono.
  - Reduced-motion estático. QA 20/20 + regresión OK. JS subió a 200 kB gzip.
- **[2026-09-27] Iteración 6 + SEO ✅:**
  - **Publicación:** favicon, OG + `og-image.png`, detalle con `lazy()` y chunks de vendor, y guía `docs/deploy_vercel.md`.
  - **SEO:** meta/canónica por página, `noindex` en 404, JSON-LD, y `sitemap.xml`/`robots.txt` generados en el build desde `works.ts`. La URL del sitio vive solo en `shared/config/site.ts`.
  - **Contenido:** LinkedIn y WhatsApp reales.
  - **Lighthouse:** escritorio 100×4. En móvil, 100 en A11y/BP/SEO y Performance 83-87.

## 🎯 3. Foco Actual (Iteración en Curso)
*(Solo puede haber UNA tarea aquí a la vez. El agente /team-complete trabajará exclusivamente en esto).*
- [ ] **Contenido real (lo aporta el usuario):**
  - Trabajos (`features/works/data/works.ts`): título, categoría, año, rol/cliente, resumen, link de YouTube/Vimeo o URL, y portada.
  - En `features/home/data/profile.ts`: tagline, texto "Sobre mí", email, y GitHub/Instagram/Vimeo. LinkedIn y WhatsApp ya están.
  - Dominio definitivo (`SITE_URL` en `shared/config/site.ts`).

## 📋 4. Tareas Pendientes (Backlog)
*(Lista de cosas por hacer, ordenadas de mayor a menor prioridad).*
- [ ] **Publicar:** GitHub → Vercel → Google Search Console, según `docs/deploy_vercel.md`.
- [ ] **(Decisión del usuario) Pre-render del HTML en el build:**
  - Subiría la Performance móvil a ≥ 95 y daría una vista previa correcta al compartir cada trabajo.
  - Es un cambio de arquitectura y quizás requiera una dependencia nueva.
