import type { Metadata } from "next";
import { CaseStudyCard } from "@/components/case-study-card";
import { SectionHeading } from "@/components/section-heading";
import { getCaseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "[Case studies: the products, the teams and the decisions behind them.]",
};

export default async function WorkPage() {
  const studies = await getCaseStudies();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading
        eyebrow="selected work"
        title="[Products I helped build, and the teams behind them.]"
        description="[Each case study follows the same arc: the insight, the challenge, my role as a leader, the process, the results.]"
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {studies.map((study) => (
          <CaseStudyCard key={study.slug} {...study} />
        ))}
      </div>
    </div>
  );
}
