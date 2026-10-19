import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudies, getCaseStudy, listCaseStudySlugs } from "@/lib/content";

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
    <article className="mx-auto max-w-3xl px-4 py-16">
      <Link href="/work" className="font-mono text-sm text-muted hover:text-accent-ink">
        ← Selected work
      </Link>

      <header className="mt-8 border-b border-line pb-10">
        <p className="flex flex-wrap gap-x-3 font-mono text-xs text-muted">
          {meta.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight">{meta.title}</h1>
        <p className="mt-4 text-xl text-ink-2">{meta.summary}</p>
        <dl className="mt-8 grid grid-cols-2 gap-6 font-mono text-sm sm:grid-cols-4">
          <div>
            <dt className="text-xs text-muted uppercase">Role</dt>
            <dd className="mt-1">{meta.role}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted uppercase">Year</dt>
            <dd className="mt-1">{meta.year}</dd>
          </div>
          {meta.team && (
            <div>
              <dt className="text-xs text-muted uppercase">Team</dt>
              <dd className="mt-1">{meta.team}</dd>
            </div>
          )}
          {meta.links && (
            <div>
              <dt className="text-xs text-muted uppercase">Links</dt>
              {meta.links.map((link) => (
                <dd key={link.href} className="mt-1">
                  <a href={link.href} target="_blank" rel="noreferrer" className="underline hover:text-accent-ink">
                    {link.label} ↗
                  </a>
                </dd>
              ))}
            </div>
          )}
        </dl>
      </header>

      <Content />

      {next && next.slug !== slug && (
        <Link href={`/work/${next.slug}`} className="group mt-20 block rounded-xl border border-line bg-card p-6">
          <p className="font-mono text-xs text-muted uppercase">Next case study</p>
          <p className="mt-1 text-2xl font-semibold group-hover:text-accent-ink">{next.meta.title} →</p>
        </Link>
      )}
    </article>
  );
}
