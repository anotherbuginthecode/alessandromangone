import { highlights } from "@/lib/site";
import { SectionHeading } from "../section-heading";

export function Highlights() {
  return (
    <section id="highlights" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeading eyebrow="highlights" title="[Proof, in one line each.]" />
      <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
        {highlights.map((item) => (
          <li key={item.title} className="bg-card p-5">
            <p className="font-semibold">{item.title}</p>
            <p className="mt-1 text-sm text-ink-2">{item.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
