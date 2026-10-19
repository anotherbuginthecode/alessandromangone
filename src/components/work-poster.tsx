import Link from "next/link";
import { CaseCover } from "@/components/case-study/case-cover";
import { themeStyle } from "@/components/case-study/case-hero";
import { PosterReveal } from "@/components/motion/poster-reveal";
import type { CaseStudyMeta, Entry } from "@/lib/content";
import { brandFonts } from "@/lib/fonts";

// A case study as a full-width poster in the project's own colors.
export function WorkPoster({ slug, meta }: Entry<CaseStudyMeta>) {
  const font = meta.theme.font ? brandFonts[meta.theme.font] : "";

  return (
    <PosterReveal>
      <Link
        href={`/work/${slug}`}
        style={themeStyle(meta.theme)}
        className="group block overflow-hidden rounded-3xl bg-[var(--cs-bg)] text-[var(--cs-fg)] outline-none focus-visible:ring-4 focus-visible:ring-[var(--cs-accent)]"
      >
        <div className="grid gap-12 p-7 sm:p-12 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
          <div>
            <p className="font-mono text-xs text-[var(--cs-accent)] uppercase">
              {meta.year} · {meta.role}
            </p>
            <h3 className={`${font} mt-3 text-5xl leading-[0.95] font-extrabold tracking-tight sm:text-6xl`}>{meta.title}</h3>
            <p className="mt-5 max-w-md text-lg opacity-80">{meta.summary}</p>
            <p className="mt-5 flex flex-wrap gap-x-3 font-mono text-xs opacity-60">
              {meta.tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </p>
            <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--cs-accent)] px-5 py-2.5 text-sm font-semibold text-black transition-transform group-hover:translate-x-1">
              Read the case study <span aria-hidden>→</span>
            </span>
          </div>
          <div data-poster-media className="pb-8 transition-transform duration-500 group-hover:scale-[1.02]">
            <CaseCover cover={meta.cover} />
          </div>
        </div>
      </Link>
    </PosterReveal>
  );
}
