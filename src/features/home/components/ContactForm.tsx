import { useState, type FormEvent } from 'react';
import { buttonStyles } from '../../../shared/ui/buttonStyles';

type FieldName = 'name' | 'email' | 'message';
type FieldErrors = Partial<Record<FieldName, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  const name = String(data.get('name') ?? '').trim();
  const email = String(data.get('email') ?? '').trim();
  const message = String(data.get('message') ?? '').trim();
  if (!name) errors.name = 'Escribe tu nombre.';
  if (!email) errors.email = 'Escribe tu correo.';
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Revisa el correo, parece incompleto.';
  if (message.length < 10) errors.message = 'Cuéntame un poco más (mínimo 10 caracteres).';
  return errors;
}

const inputStyles =
  'mt-2 block w-full rounded-xl border border-line bg-canvas px-4 text-fg placeholder:text-fg-muted/70 aria-invalid:border-accent-fg';

// TODO: conectar el envío (p. ej. Formspree) para que el mensaje llegue al correo. Hoy solo valida y avisa
export function ContactForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [notice, setNotice] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(new FormData(event.currentTarget));
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as FieldName[])[0];
    if (firstInvalid) {
      setNotice('');
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setNotice('El envío del formulario todavía no está activo. Mientras tanto, escríbeme por WhatsApp o LinkedIn.');
  };

  const fieldProps = (field: FieldName) => ({
    id: `contacto-${field}`,
    name: field,
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `contacto-${field}-error` : undefined,
  });

  const errorText = (field: FieldName) =>
    errors[field] && (
      <p id={`contacto-${field}-error`} className="mt-2 text-sm text-accent-fg">
        {errors[field]}
      </p>
    );

  return (
    <form onSubmit={handleSubmit} noValidate aria-labelledby="formulario-titulo" className="space-y-5">
      <h3 id="formulario-titulo" className="text-lg font-semibold tracking-tight text-fg">
        Envíame un mensaje
      </h3>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contacto-name" className="text-sm font-medium text-fg">
            Nombre
          </label>
          <input {...fieldProps('name')} type="text" autoComplete="name" className={`${inputStyles} h-11`} />
          {errorText('name')}
        </div>
        <div>
          <label htmlFor="contacto-email" className="text-sm font-medium text-fg">
            Correo
          </label>
          <input {...fieldProps('email')} type="email" autoComplete="email" className={`${inputStyles} h-11`} />
          {errorText('email')}
        </div>
      </div>

      <div>
        <label htmlFor="contacto-message" className="text-sm font-medium text-fg">
          Mensaje
        </label>
        <textarea
          {...fieldProps('message')}
          rows={5}
          placeholder="¿En qué te puedo ayudar?"
          className={`${inputStyles} resize-y py-3`}
        />
        {errorText('message')}
      </div>

      <button type="submit" className={`${buttonStyles.primary} w-full sm:w-auto`}>
        Enviar mensaje
      </button>

      <p role="status" className="text-sm text-fg-muted empty:hidden">
        {notice}
      </p>
    </form>
  );
}
