import { getCaseStudies } from "@/lib/content";
import { SectionHeading } from "../section-heading";
import { WorkPoster } from "../work-poster";

export async function SelectedWork() {
  const studies = await getCaseStudies();

  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-24">
      <SectionHeading
        eyebrow="selected work"
        title="Products I built, and how they got built."
        description="Each one is a story about a decision: what to build, what to defer, and who, or what, writes the code."
      />
      <div className="space-y-8">
        {studies.map((study) => (
          <WorkPoster key={study.slug} {...study} />
        ))}
      </div>
    </section>
  );
}
