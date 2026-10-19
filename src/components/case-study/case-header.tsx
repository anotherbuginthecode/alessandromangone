import Link from "next/link";
import { Intro } from "@/components/motion/intro";
import type { CaseStudyMeta } from "@/lib/content";
import { CaseCover } from "./case-cover";

const label = "font-mono text-[11px] tracking-widest text-muted uppercase";

// Case study header: tags, title, intro and facts on the page background,
// then the cover in the project's own colors.
export function CaseHeader({ meta }: { meta: CaseStudyMeta }) {
  return (
    <header>
      <Intro className="mx-auto max-w-6xl px-4 pt-10">
        <Link
          data-intro="up"
          href="/work"
          className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm hover:border-ink/30"
        >
          <span aria-hidden>←</span> Selected work
        </Link>

        <ul data-intro="up" className="mt-6 flex flex-wrap gap-2">
          {meta.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-line bg-card px-3 py-1 font-mono text-[11px] font-semibold tracking-wider uppercase">
              {tag}
            </li>
          ))}
          <li className="rounded-full border border-line px-3 py-1 font-mono text-[11px] tracking-wider text-muted">{meta.year}</li>
        </ul>

        <h1 data-intro="up" className="mt-5 text-6xl leading-[0.95] font-semibold tracking-tighter text-balance sm:text-8xl">
          {meta.title}
        </h1>
        <p data-intro="up" className="mt-6 max-w-[760px] text-xl leading-relaxed text-muted">
          {meta.intro ?? meta.summary}
        </p>

        <dl data-intro="up" className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
          <div>
            <dt className={label}>Role</dt>
            <dd className="mt-2">{meta.role}</dd>
          </div>
          <div>
            <dt className={label}>Year</dt>
            <dd className="mt-2">{meta.year}</dd>
          </div>
          {meta.team && (
            <div>
              <dt className={label}>Team</dt>
              <dd className="mt-2">{meta.team}</dd>
            </div>
          )}
          {meta.links?.map((link) => (
            <div key={link.href}>
              <dt className={label}>Live</dt>
              <dd className="mt-2">
                <a href={link.href} target="_blank" rel="noreferrer" className="underline decoration-accent underline-offset-4 hover:text-accent-ink">
                  {link.label} ↗
                </a>
              </dd>
            </div>
          ))}
        </dl>

        <div data-intro="pop" className="mt-10 overflow-hidden rounded-3xl bg-[var(--cs-bg)] px-6 py-12 text-[var(--cs-fg)] sm:px-14 sm:py-16">
          <div className="mx-auto max-w-4xl">
            <CaseCover cover={meta.cover} priority />
          </div>
        </div>
      </Intro>
    </header>
  );
}
