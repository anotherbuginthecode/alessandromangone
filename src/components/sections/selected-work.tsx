import Link from "next/link";
import { getCaseStudies } from "@/lib/content";
import { CaseStudyCard } from "../case-study-card";
import { SectionHeading } from "../section-heading";

export async function SelectedWork() {
  const studies = await getCaseStudies();

  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeading eyebrow="selected work" title="[Products I helped build, and the teams behind them.]" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {studies.map((study) => (
          <CaseStudyCard key={study.slug} {...study} />
        ))}
      </div>
      <Link href="/work" className="mt-8 inline-block font-mono text-sm text-accent-ink hover:underline">
        All case studies →
      </Link>
    </section>
  );
}
