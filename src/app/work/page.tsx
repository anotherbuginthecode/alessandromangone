import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { WorkPoster } from "@/components/work-poster";
import { getCaseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies: the products Alessandro Mangone built, the decisions behind them and how they got delivered.",
};

export default async function WorkPage() {
  const studies = await getCaseStudies();

  return (
    <div data-app="Finder" data-app-file="~/work" className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading
        eyebrow="selected work"
        title="Show, don't prompt."
        description="Three projects, three ways to split the work between people and AI. Each one follows the same arc: the insight, the challenge, the decisions, the delivery and what came out of it."
      />
      <div className="space-y-8">
        {studies.map((study) => (
          <WorkPoster key={study.slug} {...study} />
        ))}
      </div>
    </div>
  );
}
