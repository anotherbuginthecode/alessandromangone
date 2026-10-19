import Link from "next/link";
import type { CaseStudyMeta, Entry } from "@/lib/content";

export function CaseStudyCard({ slug, meta }: Entry<CaseStudyMeta>) {
  return (
    <Link
      href={`/work/${slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-card transition-shadow hover:shadow-[0_18px_40px_-24px_rgb(0_0_0/0.35)]"
    >
      {/* Cover placeholder: replace with an image per case study. */}
      <div className="dot-grid grid aspect-[16/9] place-items-center bg-paper-2">
        <span className="text-4xl font-semibold tracking-tight text-ink/80 transition-transform group-hover:scale-105">
          {meta.title}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="flex flex-wrap gap-x-3 font-mono text-xs text-muted">
          <span>{meta.year}</span>
          {meta.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </p>
        <h3 className="text-xl font-semibold">{meta.title}</h3>
        <p className="text-ink-2">{meta.summary}</p>
        <p className="mt-auto pt-2 font-mono text-sm text-accent-ink">Read case study →</p>
      </div>
    </Link>
  );
}
