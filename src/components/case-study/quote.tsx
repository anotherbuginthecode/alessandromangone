import type { ReactNode } from "react";

// A pull quote, optionally attributed to the document it comes from.
export function Quote({ children, source }: { children: ReactNode; source?: string }) {
  return (
    <figure className="my-12 max-w-[860px] border-l-4 border-accent pl-6">
      <blockquote className="text-2xl leading-snug font-semibold tracking-tight text-balance sm:text-3xl">{children}</blockquote>
      {source && <figcaption className="mt-3 font-mono text-xs text-muted">{source}</figcaption>}
    </figure>
  );
}
