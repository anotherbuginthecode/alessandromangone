import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import { notFound } from "next/navigation";
import { StatsPanel } from "@/components/case-study/blocks";
import { CaseHeader } from "@/components/case-study/case-header";
import { ReadingProgress } from "@/components/motion/reading-progress";
import { Reveal } from "@/components/motion/reveal";
import { getCaseStudies, getCaseStudy, listCaseStudySlugs } from "@/lib/content";
import { themeStyle } from "@/lib/theme";

export function generateStaticParams() {
  return listCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const study = await getCaseStudy((await params).slug);
  if (!study) return {};
  return { title: study.meta.title, description: study.meta.summary };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();

  const { meta, Content } = study;
  const all = await getCaseStudies();
  const next = all[(all.findIndex((s) => s.slug === slug) + 1) % all.length];

  return (
    <article data-app="Preview" data-app-file={`~/work/${slug}`} style={themeStyle(meta.theme)}>
      <ReadingProgress />
      <CaseHeader slug={slug} meta={meta} />

      <Reveal className="mx-auto max-w-6xl px-4 pt-4 pb-24">
        <Content />
        {meta.stats && (
          <div className="mt-20">
            <StatsPanel stats={meta.stats} />
          </div>
        )}
      </Reveal>

      {next && next.slug !== slug && (
        <ViewTransition name={`cover-${next.slug}`} share="morph" default="none">
          <Link
            href={`/work/${next.slug}`}
            prefetch
            style={themeStyle(next.meta.theme)}
            className="group block bg-[var(--cs-bg)] text-[var(--cs-fg)]"
          >
            <div className="mx-auto flex max-w-6xl items-end justify-between gap-6 px-4 py-16 sm:py-20">
              <div>
                <p className="font-mono text-xs uppercase opacity-60">Next case study</p>
                <p className="mt-2 text-5xl font-semibold tracking-tighter sm:text-7xl">{next.meta.title}</p>
              </div>
              <span className="text-5xl text-[var(--cs-accent)] transition-transform group-hover:translate-x-2" aria-hidden>
                →
              </span>
            </div>
          </Link>
        </ViewTransition>
      )}
    </article>
  );
}
