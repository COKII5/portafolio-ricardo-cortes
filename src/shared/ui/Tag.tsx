import type { ReactNode } from 'react';

interface TagProps {
  children: ReactNode;
}

export function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-line px-3 py-1 text-xs font-medium text-fg-muted">
      {children}
    </span>
  );
}
