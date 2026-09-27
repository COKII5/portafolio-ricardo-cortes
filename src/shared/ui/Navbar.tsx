import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { menuVariants, quickTransition } from '../animation/variants';
import { Container } from './Container';
import { ThemeToggle } from './ThemeToggle';

const NAV_LINKS = [
  { label: 'Trabajos', hash: '#trabajos' },
  { label: 'Sobre mí', hash: '#sobre-mi' },
  { label: 'Contacto', hash: '#contacto' },
] as const;

const MOBILE_MENU_ID = 'menu-movil';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsMenuOpen(false);
      // El panel se desmonta: sin esto el foco del teclado se perdería en <body>
      menuButtonRef.current?.focus();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link to="/" onClick={closeMenu} className="text-base font-semibold tracking-tight text-fg">
          Ricardo Cortes
        </Link>

        <div className="flex items-center gap-2">
          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.hash}>
                  <Link
                    to={{ pathname: '/', hash: link.hash }}
                    className="rounded-full px-3 py-2 text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ThemeToggle />

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls={MOBILE_MENU_ID}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="inline-flex size-10 items-center justify-center rounded-full border border-line text-fg-muted transition-colors hover:bg-surface hover:text-fg md:hidden"
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id={MOBILE_MENU_ID}
            aria-label="Principal"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={quickTransition}
            className="border-t border-line md:hidden"
          >
            <Container className="py-2">
              <ul className="flex flex-col">
                {NAV_LINKS.map((link) => (
                  <li key={link.hash}>
                    <Link
                      to={{ pathname: '/', hash: link.hash }}
                      onClick={closeMenu}
                      className="block py-3 text-base text-fg-muted transition-colors hover:text-fg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      className="size-5"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      className="size-5"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
