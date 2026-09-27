import type { AutomationWork } from '../../domain/work';

const STEPS = [
  { key: 'problem', label: 'Problema' },
  { key: 'solution', label: 'Solución' },
  { key: 'result', label: 'Resultado' },
] as const;

interface AutomationCaseStudyProps {
  work: AutomationWork;
}

export function AutomationCaseStudy({ work }: AutomationCaseStudyProps) {
  return (
    <section aria-labelledby="caso-titulo" className="mt-16">
      <h2 id="caso-titulo" className="text-2xl font-semibold tracking-tight text-fg">
        El caso
      </h2>
      <ol className="mt-6 grid gap-6 md:grid-cols-3">
        {STEPS.map((step, index) => (
          <li key={step.key} className="rounded-2xl border border-line bg-surface p-6">
            <p aria-hidden="true" className="text-sm font-medium text-accent-fg tabular-nums">
              {String(index + 1).padStart(2, '0')}
            </p>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-fg">{step.label}</h3>
            <p className="mt-3 text-fg-muted">{work[step.key]}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
