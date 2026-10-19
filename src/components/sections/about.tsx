import { about, skills } from "@/lib/site";
import { Window } from "../desktop/window";
import { SectionHeading } from "../section-heading";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeading eyebrow="about" title="The short version." />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Window title="about-me.md" bodyClassName="space-y-6 p-6">
          <div>
            <p className="font-mono text-xs text-muted uppercase">## Then</p>
            <p className="mt-1 text-ink-2">{about.then}</p>
          </div>
          <div>
            <p className="font-mono text-xs text-muted uppercase">## Now</p>
            <p className="mt-1 text-ink-2">{about.now}</p>
          </div>
        </Window>

        <Window title="stack.json" bodyClassName="space-y-5 p-6">
          {skills.map((group) => (
            <div key={group.group}>
              <p className="font-mono text-xs text-muted uppercase">{group.group}</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="rounded-full border border-line bg-paper px-3 py-1 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Window>
      </div>
    </section>
  );
}
