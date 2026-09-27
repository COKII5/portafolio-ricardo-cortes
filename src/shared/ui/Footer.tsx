import { Container } from './Container';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-2 py-8 text-sm text-fg-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} Ricardo Cortes</p>
        <p>Audiovisual · Web · Automatización</p>
      </Container>
    </footer>
  );
}
