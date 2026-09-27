import { buttonStyles } from '../../../../shared/ui/buttonStyles';
import type { WebWork } from '../../domain/work';

interface WebLinksProps {
  work: WebWork;
}

export function WebLinks({ work }: WebLinksProps) {
  if (!work.liveUrl && !work.repoUrl) return null;

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {work.liveUrl && (
        <a href={work.liveUrl} target="_blank" rel="noopener noreferrer" className={buttonStyles.primary}>
          Visitar sitio
          <ExternalIcon />
          <span className="sr-only"> (se abre en una pestaña nueva)</span>
        </a>
      )}
      {work.repoUrl && (
        <a href={work.repoUrl} target="_blank" rel="noopener noreferrer" className={buttonStyles.secondary}>
          Ver código
          <ExternalIcon />
          <span className="sr-only"> (se abre en una pestaña nueva)</span>
        </a>
      )}
    </div>
  );
}

function ExternalIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}
