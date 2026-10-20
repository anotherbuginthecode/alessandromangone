import { getCaseStudies } from "@/lib/content";
import { SectionHeading } from "../section-heading";
import { WorkPoster } from "../work-poster";

export async function SelectedWork() {
  const studies = await getCaseStudies();

  return (
    <section id="work" data-app="Finder" data-app-file="~/work" className="mx-auto max-w-6xl px-4 py-24">
      <SectionHeading
        eyebrow="selected work"
        title="Built, not just managed."
        description="A dating app that turns matches into real dates, a quiz game shipped in seven days, a training program for more than 600 people. Each one is a decision about what to build, what to defer and who, or what, writes the code."
      />
      <div className="space-y-8">
        {studies.map((study) => (
          <WorkPoster key={study.slug} {...study} />
        ))}
      </div>
    </section>
  );
}
