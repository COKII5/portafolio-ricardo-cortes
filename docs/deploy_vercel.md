# Guía de despliegue: Vercel + Google

## 1. Antes de publicar
- [ ] **Contenido real:**
  - Tus trabajos en `src/features/works/data/works.ts`, con portadas en `src/assets/works/<slug>/cover.webp`.
  - Tus datos en `src/features/home/data/profile.ts`: tagline, bio, correo y redes.

  Busca los `TODO` que quedan:

  ```bash
  grep -rn "TODO" src public index.html
  ```
- [ ] **Dominio:** reemplaza `https://ricardo-cortes.vercel.app` por tu dirección definitiva en **un solo lugar**: `src/shared/config/site.ts`. El build lo aplica a las meta de `index.html`, a las URLs canónicas, a los datos estructurados, a `sitemap.xml` y a `robots.txt`.
- [ ] **Redes en Google:** cuando tengas tus perfiles, agrégalos como `"sameAs"` en el bloque JSON-LD de `index.html`.
- [ ] **Sitemap:** no hay que tocarlo. Se genera solo en cada build a partir de los trabajos de `works.ts`.
- [ ] **Verificación local:**

  ```bash
  npm run lint
  npm run build
  npm run preview   # revisar en http://localhost:4173
  ```

## 2. Subir el código a GitHub
1. Crea un repositorio vacío en github.com (sin README).
2. En la carpeta del proyecto:

   ```bash
   git init
   git add .
   git commit -m "Portafolio inicial"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/<tu-repo>.git
   git push -u origin main
   ```

`.gitignore` ya excluye `node_modules`, `dist` y `.env*`.

## 3. Publicar en Vercel
1. Entra a vercel.com con tu cuenta de GitHub → **Add New… → Project** → importa el repositorio.
2. Vercel detecta **Vite** solo. Confirma estos valores:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Deploy.** Te da una URL pública `https://<proyecto>.vercel.app`.
4. `vercel.json` ya redirige todas las rutas a `index.html`, así que `/trabajos/...` funciona al recargar.
5. Cada `git push` a `main` vuelve a publicar automáticamente.

**Dominio propio (opcional):** en el proyecto de Vercel → **Settings → Domains** → agrega el dominio y configura en tu proveedor los registros DNS que te indique Vercel. Después actualiza `SITE_URL` en `src/shared/config/site.ts` y vuelve a publicar.

## 4. Aparecer en Google
1. Entra a search.google.com/search-console con tu cuenta de Google.
2. **Agregar propiedad:**
   - Con dominio propio: tipo **Dominio**, que se verifica con un registro TXT en el DNS.
   - Sin dominio propio: tipo **Prefijo de URL** con la dirección `.vercel.app`, verificado con la etiqueta HTML que te da Google. Esa etiqueta se pega en el `<head>` de `index.html`.
3. **Sitemaps** → envía `sitemap.xml`.
4. **Inspección de URLs** → pega la URL de la home → **Solicitar indexación**.
5. Google tarda desde unos días hasta un par de semanas en mostrar el sitio.

## 5. Comprobar la vista previa al compartir
Pega la URL publicada en un chat (WhatsApp, LinkedIn, Slack). Debe aparecer la imagen `og-image.png` con el título y la descripción.

LinkedIn guarda en caché la vista previa. Si cambiaste algo, fuerza la actualización en su Post Inspector: linkedin.com/post-inspector.
