import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { SITE_URL } from './src/shared/config/site.ts';

// Usa SITE_URL en index.html y genera sitemap.xml y robots.txt a partir de los slugs de works.ts
function seoFiles(): Plugin {
  return {
    name: 'seo-files',
    transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', SITE_URL),
    async generateBundle() {
      const source = await this.fs.readFile('src/features/works/data/works.ts', { encoding: 'utf8' });
      const slugs = [...source.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]);
      const paths = ['/', ...slugs.map((slug) => `/trabajos/${slug}`)];
      const urls = paths.map((path) => `  <url><loc>${SITE_URL}${path}</loc></url>`).join('\n');

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoFiles()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          // Librerías en chunks propios: cambian poco, así el navegador las reutiliza entre deploys
          groups: [
            { name: 'react', test: /node_modules[\\/](react|react-dom|react-router|scheduler)[\\/]/ },
            { name: 'motion', test: /node_modules[\\/](motion|motion-dom|motion-utils|framer-motion)[\\/]/ },
            { name: 'gsap', test: /node_modules[\\/](gsap|@gsap)[\\/]/ },
          ],
        },
      },
    },
  },
});
