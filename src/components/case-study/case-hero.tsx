import Link from "next/link";
import type { CSSProperties } from "react";
import { Counter } from "@/components/motion/counter";
import { Intro } from "@/components/motion/intro";
import type { CaseStudyMeta, CaseStudyTheme } from "@/lib/content";
import { brandFonts } from "@/lib/fonts";
import { CaseCover } from "./case-cover";

// CSS variables for a project's colors. --accent and --accent-ink override the
// site tokens, so links, bullets and the progress bar take the project color.
export function themeStyle(theme: CaseStudyTheme) {
  return {
    "--cs-bg": theme.bg,
    "--cs-fg": theme.fg,
    "--cs-accent": theme.accent,
    "--accent": theme.accent,
    "--accent-ink": theme.accentInk,
  } as CSSProperties;
}

export function CaseHero({ meta }: { meta: CaseStudyMeta }) {
  const font = meta.theme.font ? brandFonts[meta.theme.font] : "";

  return (
    <section className="relative overflow-hidden bg-[var(--cs-bg)] text-[var(--cs-fg)]">
      <Intro className="mx-auto grid max-w-6xl gap-14 px-4 pt-10 pb-20 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:pt-14 lg:pb-24">
        <div>
          <Link data-intro="up" href="/work" className="inline-block font-mono text-sm opacity-60 hover:opacity-100">
            ← Selected work
          </Link>
          <p data-intro="up" className="mt-10 flex flex-wrap gap-x-3 font-mono text-xs text-[var(--cs-accent)]">
            {meta.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </p>
          <h1 data-intro="up" className={`${font} mt-3 text-6xl leading-[0.95] font-extrabold tracking-tight text-balance sm:text-7xl`}>
            {meta.title}
          </h1>
          <p data-intro="up" className="mt-6 max-w-xl text-xl text-balance opacity-80">
            {meta.summary}
          </p>
          <dl data-intro="up" className="mt-10 grid grid-cols-2 gap-6 font-mono text-sm sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase opacity-50">Role</dt>
              <dd className="mt-1">{meta.role}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase opacity-50">Year</dt>
              <dd className="mt-1">{meta.year}</dd>
            </div>
            {meta.team && (
              <div>
                <dt className="text-xs uppercase opacity-50">Team</dt>
                <dd className="mt-1">{meta.team}</dd>
              </div>
            )}
            {meta.links?.map((link) => (
              <div key={link.href}>
                <dt className="text-xs uppercase opacity-50">Live</dt>
                <dd className="mt-1">
                  <a href={link.href} target="_blank" rel="noreferrer" className="underline decoration-[var(--cs-accent)] underline-offset-4 hover:text-[var(--cs-accent)]">
                    {link.label} ↗
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div data-intro="pop">
          <CaseCover cover={meta.cover} priority />
        </div>
      </Intro>

      {meta.stats && (
        <div className="border-t border-white/10">
          <dl className="mx-auto grid max-w-6xl grid-cols-2 px-4 sm:grid-cols-3 lg:grid-cols-5">
            {meta.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse py-6 pr-4 sm:py-8">
                <dt className="mt-1 text-sm opacity-70">{stat.label}</dt>
                <dd className="font-mono text-3xl font-semibold text-[var(--cs-accent)] sm:text-4xl">
                  <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}
