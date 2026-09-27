import { Link } from 'react-router';
import { usePageMeta } from '../seo/usePageMeta';
import { buttonStyles } from './buttonStyles';
import { Container } from './Container';

export function NotFound() {
  // Una SPA responde 200 a cualquier URL: noindex evita que Google indexe estas páginas como "soft 404"
  usePageMeta({ noindex: true });

  return (
    <Container className="flex flex-col items-start py-24 sm:py-32">
      <title>Página no encontrada — Ricardo Cortes</title>
      <p className="text-sm font-medium text-accent-fg">Error 404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
        Página no encontrada
      </h1>
      <p className="mt-4 max-w-md text-fg-muted">La página que buscas no existe o fue movida.</p>
      <Link to="/" className={`mt-8 ${buttonStyles.primary}`}>
        Volver al inicio
      </Link>
    </Container>
  );
}
