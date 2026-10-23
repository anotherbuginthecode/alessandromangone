import { getCaseStudies } from "@/lib/content";
import { Finder } from "../desktop/finder";
import { SectionHeading } from "../section-heading";

export async function SelectedWork() {
  const studies = await getCaseStudies();

  return (
    <section id="work" data-app="Finder" data-app-file="~/work" className="mx-auto max-w-6xl px-4 py-24">
      <SectionHeading
        eyebrow="selected work"
        title="Show, don't prompt."
        description="A dating app mostly written by coding agents, a quiz game the agents audited months later, and a training program that put generative AI in the hands of 600+ people. Three answers to the same question: what can run without you, and what should a human still own?"
      />
      <Finder studies={studies} />
    </section>
  );
}
