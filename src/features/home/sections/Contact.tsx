import { Container } from '../../../shared/ui/Container';
import { ContactForm } from '../components/ContactForm';
import { ContactIcon } from '../components/ContactIcon';
import { profile, type SocialLink } from '../data/profile';

const channels: readonly SocialLink[] = [
  { network: 'email', label: 'Correo', href: `mailto:${profile.email}`, detail: profile.email },
  ...profile.socials,
];

export function Contact() {
  return (
    <section id="contacto" aria-labelledby="contacto-titulo" className="scroll-mt-16 border-t border-line">
      <Container className="py-20 sm:py-24">
        <div
          data-reveal
          className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16"
        >
          <div>
            <h2
              id="contacto-titulo"
              className="text-3xl font-semibold tracking-tight text-balance text-fg sm:text-4xl"
            >
              ¿Tienes un proyecto en mente?
            </h2>
            <p className="mt-4 max-w-md text-lg text-fg-muted">
              Cuéntame qué necesitas: una grabación, una transmisión en vivo, un sitio web o automatizar un proceso.
              Escríbeme por el formulario o por el canal que prefieras.
            </p>

            <ul aria-label="Canales de contacto" className="mt-8 grid gap-3 sm:grid-cols-2">
              {channels.map((channel) => {
                const isExternal = channel.network !== 'email';
                return (
                  // El correo ocupa las dos columnas para que la dirección se lea completa
                  <li key={channel.network} className={isExternal ? undefined : 'sm:col-span-2'}>
                    <a
                      href={channel.href}
                      {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                      className="flex items-center gap-3 rounded-xl border border-line bg-canvas px-4 py-3 text-fg transition-colors hover:bg-surface"
                    >
                      <span className="text-accent-fg">
                        <ContactIcon network={channel.network} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium">{channel.label}</span>
                        {channel.detail && (
                          <span className="block truncate text-xs text-fg-muted">{channel.detail}</span>
                        )}
                      </span>
                      {isExternal && (
                        <>
                          <span aria-hidden="true" className="ml-auto text-fg-muted">
                            ↗
                          </span>
                          <span className="sr-only"> (se abre en una pestaña nueva)</span>
                        </>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
